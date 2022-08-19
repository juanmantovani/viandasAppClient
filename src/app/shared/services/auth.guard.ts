import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, protected router: Router) { }
   canActivate(): boolean {
     if (this.authService.isAuthenticated()){
       return true;
     }
     this.router.navigate(['login']);
     return false;
   }
  
}
