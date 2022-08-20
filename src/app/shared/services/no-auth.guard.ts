import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private urlService: UrlService,
  ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean {
     if(this.authService.isAuthenticated()){
      console.log("NOauth "+this.urlService.urlInicio);
      this.router.navigateByUrl(this.urlService.urlInicio);
      return false;
     }
     return true;
  }
  
}
