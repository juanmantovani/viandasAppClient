import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as ROUTES from '../../shared/routes/index.routes'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private readonly url: string = environment.urlApi;

  //Autorizacion
  readonly urlLogin: string = this.url + "/login"
  readonly urlIsAuth: string = this.url + "/isAuthorizated"


   //Carrousel
   readonly urlGetBanner: string = this.url + "/getBanners";
   readonly urlUploadBanner: string = this.url + "/uploadBanner";
   readonly urlEditBanner: string = this.url + "/editBanner";
   readonly urlDeleteBanner: string = this.url + "/deleteBanner";


   //Inicio
   readonly urlInicio: string = this.url + "/inicio";

   ADMINISTRATION = ROUTES.INTERNAL_ROUTES.ADMINISTRATION + '/' + ROUTES.INTERNAL_ROUTES.CLIENT;



  constructor(private router: Router) { }

  goToAdminPanel(){
    this.router.navigateByUrl(this.ADMINISTRATION);
  }
}
