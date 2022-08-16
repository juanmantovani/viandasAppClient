import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AddBannerRequest } from '../dto/Carrousel/AddBannerRequest';
import { AddBannerResponse } from '../dto/Carrousel/AddBannerResponse';
import { DeleteBannerRequest } from '../dto/Carrousel/DeleteBannerRequest';
import { DeleteBannerResponse } from '../dto/Carrousel/DeleteBannerResponse';
import { EditBannerRequest } from '../dto/Carrousel/EditBannerRequest';
import { EditBannerResponse } from '../dto/Carrousel/EditBannerResponse';
import { UrlService } from './url.service';
import { GetBanneRequest } from '../dto/Carrousel/GetBannerRequest';
import { GetBannerResponse } from '../dto/Carrousel/GetBannerResponse';

@Injectable({
  providedIn: 'root',
})
export class CarrouselService {
  image: any;
  constructor(private urlService: UrlService, private http: HttpClient) {}

  getBanners(request: GetBanneRequest): Observable<GetBannerResponse> {
    const endpoint = this.urlService.urlGetBanner;

    let params = new HttpParams();
    
    params = params.set('onlyActive', request.onlyActive);

    return this.http.get<GetBannerResponse>(endpoint, {params}).pipe(
      map((res: any) => {
        return new GetBannerResponse(res);
      })
    )
  }

  addBanner(request: AddBannerRequest) : Observable<AddBannerResponse> {
    const endpoint = this.urlService.urlUploadBanner;

    var formData = new FormData();
    formData.append('banner', request.banner.image);
    formData.append('dateStart', request.banner.dateStart.toUTCString());
    formData.append('dateEnd', request.banner.dateEnd.toUTCString());
    formData.append('title', request.banner.title);

    return this.http.post<AddBannerResponse>(endpoint, formData).pipe(
      tap (res => 
        new AddBannerResponse(res))
    );
  }

  editBanner(request: EditBannerRequest) : Observable<EditBannerResponse> {
    const endpoint = this.urlService.urlEditBanner;

    var formData = new FormData();
    formData.append('banner', request.banner.image);
    formData.append('dateStart', request.banner.dateStart.toUTCString());
    formData.append('dateEnd', request.banner.dateEnd.toUTCString());
    formData.append('title', request.banner.title);

    return this.http.post<EditBannerResponse>(endpoint, formData).pipe(
      tap (res => new EditBannerResponse(res))
    );
  }

  deleteBanner(request: DeleteBannerRequest) {
    const endpoint = this.urlService.urlDeleteBanner;

    this.http.put<DeleteBannerResponse>(endpoint, request).subscribe((res) => {
      console.log(res);
      const response = new DeleteBannerResponse(res);
      return response
    });
  }
}
