import { Injectable } from '@angular/core';
import { Banner } from '../models/Banner';

@Injectable({
  providedIn: 'root'
})
export class CarrouselService {

  constructor() { }



  obtenerBanners(){

    var fecha = new Date()

    var aux: Array<Banner> = [
      { id : 1, titulo : "promo 1", fechaDesde : fecha , fechaHasta : fecha},
      { id : 2, titulo : "promo 2", fechaDesde : fecha , fechaHasta : fecha},
      { id : 3, titulo : "promo 3", fechaDesde : fecha , fechaHasta : fecha},
      { id : 4, titulo : "promo 4", fechaDesde : fecha , fechaHasta : fecha}
    ];
    
    return aux;    
  }
}
