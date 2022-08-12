import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private readonly url: string = environment.urlApi;

  //Autorizacion
  readonly urlLogin: string = this.url + "/Login"

   //Carrousel
   readonly urlUploadBanner: string = this.url + "/uploadBanner";
   readonly urlEditBanner: string = this.url + "/editBanner";
   readonly urlDeleteBanner: string = this.url + "/deleteBanner";


  constructor() { }
}
