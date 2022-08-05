import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Utils } from 'src/app/utils';
import { AgregarBannerRequest } from '../dto/Carrousel/AgregarBannerRequest';
import { AgregarBannerResponse } from '../dto/Carrousel/AgregarBannerResponse';
import { BorrarBannerRequest } from '../dto/Carrousel/BorrarBannerRequest';
import { BorrarBannerResponse } from '../dto/Carrousel/BorrarBannerResponse';
import { EditarBannerRequest } from '../dto/Carrousel/EditarBannerRequest';
import { EditarBannerResponse } from '../dto/Carrousel/EditarBannerResponse';
import { Banner } from '../models/Banner';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root',
})
export class CarrouselService {
  imagen:any;
  constructor(
    private urlService: UrlService,
    //private http: HttpClient
  ) {}

  obtenerBanners() {
    var fecha = new Date();

    var aux: Array<Banner> = [
      { id: 1, titulo: 'promo 1', fechaDesde: fecha, fechaHasta: fecha, imagen : this.imagen },
      { id: 2, titulo: 'promo 2', fechaDesde: fecha, fechaHasta: fecha, imagen : this.imagen },
      { id: 3, titulo: 'promo 3', fechaDesde: fecha, fechaHasta: fecha, imagen : this.imagen },
      { id: 4, titulo: 'promo 4', fechaDesde: fecha, fechaHasta: fecha, imagen : this.imagen },
    ];

    return aux;
  }

  agregarBanner(request: AgregarBannerRequest){
    let agregarBannerResponse : AgregarBannerResponse = {
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

editarBanner(request: EditarBannerRequest){
 let editarBannerResponse : EditarBannerResponse = {
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

  borrar(request:BorrarBannerRequest){
    console.log(request)
    let borrarBannerResponse : BorrarBannerResponse = {
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
