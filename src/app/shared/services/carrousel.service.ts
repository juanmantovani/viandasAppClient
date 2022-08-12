import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Utils } from 'src/app/utils';
import { AddBannerRequest } from '../dto/Carrousel/AddBannerRequest';
import { AddBannerResponse } from '../dto/Carrousel/AddBannerResponse';
import { DeleteBannerRequest } from '../dto/Carrousel/DeleteBannerRequest';
import { DeleteBannerResponse } from '../dto/Carrousel/DeleteBannerResponse';
import { EditBannerRequest } from '../dto/Carrousel/EditBannerRequest';
import { EditBannerResponse } from '../dto/Carrousel/EditBannerResponse';
import { Banner } from '../models/Banner';
import { UrlService } from './url.service';
import { environment } from 'src/environments/environment';
//import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root',
})
export class CarrouselService {
  image: any;
  constructor(private urlService: UrlService, private http: HttpClient) {}

  obtenerBanners() {
    var fecha = new Date();

    var aux: Array<Banner> = [
      {
        id: 1,
        tittle: 'promo 1',
        dateStart: fecha,
        dateEnd: fecha,
        image: this.image,
      },
      {
        id: 2,
        tittle: 'promo 2',
        dateStart: fecha,
        dateEnd: fecha,
        image: this.image,
      },
      {
        id: 3,
        tittle: 'promo 3',
        dateStart: fecha,
        dateEnd: fecha,
        image: this.image,
      },
      {
        id: 4,
        tittle: 'promo 4',
        dateStart: fecha,
        dateEnd: fecha,
        image: this.image,
      },
    ];

    return aux;
  }

  addBanner(request: AddBannerRequest) {
    const endpoint = this.urlService.urlUploadBanner;

    var formData = new FormData();
    formData.append('banner', request.banner.image);
    formData.append('fechaDesde', request.banner.dateStart.toDateString());
    formData.append('fechaHasta', request.banner.dateEnd.toDateString());
    formData.append('titulo', request.banner.tittle);

    return this.http.post<AddBannerResponse>(endpoint, formData).subscribe((res) => {
      console.log(res);
      const response = new AddBannerResponse(res);
      return response
    });
  }

  editBanner(request: EditBannerRequest) {
    const endpoint = this.urlService.urlEditBanner;

    var formData = new FormData();
    formData.append('banner', request.banner.image);
    formData.append('fechaDesde', request.banner.dateStart.toDateString());
    formData.append('fechaHasta', request.banner.dateEnd.toDateString());
    formData.append('titulo', request.banner.tittle);

    return this.http.post<EditBannerResponse>(endpoint, formData).subscribe((res) => {
      console.log(res);
      const response = new EditBannerResponse(res);
      return response
    });
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
