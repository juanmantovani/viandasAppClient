import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AddBannerRequest } from '../dto/Carrousel/AddBannerRequest';
import { AddBannerResponse } from '../dto/Carrousel/AddBannerResponse';
import { DeleteBannerRequest } from '../dto/Carrousel/DeleteBannerRequest';
import { DeleteBannerResponse } from '../dto/Carrousel/DeleteBannerResponse';
import { EditBannerRequest } from '../dto/Carrousel/EditBannerRequest';
import { EditBannerResponse } from '../dto/Carrousel/EditBannerResponse';
import { GetBannerIndexResponse } from '../dto/Carrousel/GetBannerIndexResponse';
import { GetBanneRequest } from '../dto/Carrousel/GetBannerRequest';
import { GetBannerResponse } from '../dto/Carrousel/GetBannerResponse';
import  * as ROUTES  from '../routes/index.routes'

@Injectable({
  providedIn: 'root',
})
export class CarrouselService {
  image: any;
  
  constructor(private http: HttpClient) {}

  getBanners(): Observable<GetBannerResponse> {
       return this.http.get<GetBannerResponse>(ROUTES.API_ROUTES.CARROUSEL.GETBANNERS).pipe(
      map((res: any) => {
        
        return new GetBannerResponse(res);
      })
    )
  }

  getBannersIndex():Observable<GetBannerIndexResponse>{
    return this.http.get<GetBannerIndexResponse>(ROUTES.API_ROUTES.CARROUSEL.GETBANNERSINDEX).pipe(
      map((res: any) => {
        
        return new GetBannerIndexResponse(res);
      })
    )
  }

  addBanner(request: AddBannerRequest) : Observable<AddBannerResponse> {

    var formData = new FormData();
    formData.append('banner', request.banner.image);
    formData.append('dateStart', request.banner.dateStart.toUTCString());
    formData.append('dateEnd', request.banner.dateEnd.toUTCString());
    formData.append('title', request.banner.title);

    return this.http.post<AddBannerResponse>(ROUTES.API_ROUTES.CARROUSEL.UPLOADBANNER, formData).pipe(
      tap (res => 
        new AddBannerResponse(res))
    );
  }

  editBanner(request: EditBannerRequest) : Observable<EditBannerResponse> {

    var formData = new FormData();
    formData.append('banner', request.banner.image);
    formData.append('dateStart', request.banner.dateStart.toUTCString());
    formData.append('dateEnd', request.banner.dateEnd.toUTCString());
    formData.append('title', request.banner.title);

    return this.http.post<EditBannerResponse>(ROUTES.API_ROUTES.CARROUSEL.EDITBANNER, formData).pipe(
      tap (res => new EditBannerResponse(res))
    );
  }

  deleteBanner(request: DeleteBannerRequest) {

    this.http.put<DeleteBannerResponse>(ROUTES.API_ROUTES.CARROUSEL.DELETEBANNER, request).subscribe((res) => {
      console.log(res);
      const response = new DeleteBannerResponse(res);
      return response
    });
  }
}
