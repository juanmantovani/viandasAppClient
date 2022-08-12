import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { catchError, Observable, of, shareReplay, tap } from 'rxjs';
import { LoginRequest } from '../dto/Login/LoginRequest';
import { LoginResponse } from '../dto/Login/LoginResponse';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router:Router, private urlService:UrlService) { }

  public loginByEmail(request: LoginRequest): Observable<LoginResponse>{
    const endpoint = this.urlService.urlLogin;
    return this.http.post<LoginResponse>(endpoint, request).pipe(
      tap (res => this.setSession(res)),
      shareReplay(),
    );
  }

  private setSession(authResult: LoginResponse) {
    //const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('token', authResult.token);
    //localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
    this.router.navigate(['login']);

  }

  // public isLoggedIn() {
  //   return moment().isBefore(this.getExpiration());
  // }

  // isLoggedOut() {
  //   return !this.isLoggedIn();
  // }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.stringify(expiration);
    return moment(expiresAt);
  }    

  isAutenticated(){
    const token = localStorage.getItem("token");
    if (token){
      return true;
    } else {
        return false;
    }
  }


}
