import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import  * as ROUTES  from '../routes/index.routes'

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean {
     if(this.authService.isAuthenticated()){
      this.router.navigateByUrl(ROUTES.INTERNAL_ROUTES.INICIO);
      return false;
     }
     return true;
  }
  
}
