import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { UrlService } from './url.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService, 
    protected router: Router, 
    private urlService : UrlService
    ) { }

   canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean {
     if (this.authService.isAuthenticated()){
       return true;
     }
     
     this.router.navigate([this.urlService.urlLogin], {queryParams: {returnUrl: state.url}});
     return false;
   }
  
}
