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
  image:any;
  constructor(
    private urlService: UrlService,
    private http: HttpClient
  ) {}

  obtenerBanners() {
    var fecha = new Date();

    var aux: Array<Banner> = [
      { id: 1, tittle: 'promo 1', dateStart: fecha, dateEnd: fecha, image : this.image },
      { id: 2, tittle: 'promo 2', dateStart: fecha, dateEnd: fecha, image : this.image },
      { id: 3, tittle: 'promo 3', dateStart: fecha, dateEnd: fecha, image : this.image },
      { id: 4, tittle: 'promo 4', dateStart: fecha, dateEnd: fecha, image : this.image },
    ];

    return aux;
  }

  url = environment.url;

  addBanner(request: AddBannerRequest){

    const endpoint = this.url + 'uploadBanner';
    console.log("request" + request);
    this.http.post<AddBannerResponse>(endpoint, request).subscribe(
      (res) => {console.log(res)}
    );


    let agregarBannerResponse : AddBannerResponse = {
      banner : new Banner(null),
      valido : true,
      mensaje: "todo bien",
      accion: "Editar"
     }
     return agregarBannerResponse;
  }
  /*
  agregarBanner(request: AgregarBannerRequest): Promise<AgregarBannerResponse> {
    const endpoint = "" // this.urlService.urlAgregarBanner;
    return this.http.post<AgregarBannerResponse>(endpoint, request).pipe(
      map((res: any) => {
        return new AgregarBannerResponse(res);
      })
    ).toPromise<AgregarBannerResponse>().catch(Utils.handleError);
  }
*/

editarBanner(request: EditBannerRequest){

  const endpoint = this.url + 'uploadBanner';

  var formData = new FormData();
  formData.append("banner", request.banner.image);
  formData.append("fechaDesde", request.banner.dateStart.toDateString());
  formData.append("fechaHasta", request.banner.dateEnd.toDateString());
  formData.append("titulo", request.banner.tittle);

    
  this.http.post<AddBannerResponse>(endpoint, formData).subscribe(
    (res) => {console.log(res)}
  );


 let editarBannerResponse : EditBannerResponse = {
  banner : new Banner(null),
  valido : true,
  mensaje: "todo bien",
  accion: "Editar"
 }
 return editarBannerResponse;
}
/*
  editarBanner(request: EditarBannerRequest): Promise<EditarBannerResponse> {
    const endpoint = "" //this.urlService.urlEditarBanner;
    return this.http.put<EditarBannerResponse>(endpoint, request).pipe(
      map((res: any) => {
        const response = new EditarBannerResponse(res);
        return response
      })
    ).toPromise<EditarBannerResponse>().catch(Utils.handleError);
  }
  */

  borrar(request:DeleteBannerRequest){
    console.log(request)
    let borrarBannerResponse : DeleteBannerResponse = {
      valido : true,
      mensaje: "todo bien",
      accion: "Borrar"
    }
    return borrarBannerResponse;
  }

  /*
 eliminar(request: EliminarParametroCreditoRequest): any {
    const endpoint = this.urlService.urlEliminarParametroCredito;
    return this.authHttpService.post<EliminarParametroCreditoResponse>(endpoint, request).pipe(
      map((res: any) => {
        return new EliminarParametroCreditoResponse(res);
      })
    ).toPromise<EliminarParametroCreditoResponse>().catch(Utils.handleError);
  }
  */
}
