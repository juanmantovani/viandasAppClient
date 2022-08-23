import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { catchError, Observable, of, shareReplay, tap } from 'rxjs';
import { LoginRequest } from '../dto/Login/LoginRequest';
import { LoginResponse } from '../dto/Login/LoginResponse';
import  * as ROUTES  from '../routes/index.routes'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router:Router) { }

  public loginByEmail(request: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(ROUTES.API_ROUTES.LOGIN, request).pipe(
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


  // Esta funcion deberia consumir una API que devuelva true o false si el token es valido
  isAuthenticated() : any {
    const token = localStorage.getItem("token");

    if (!token)
    return false;
        return this.http.get<any>(ROUTES.API_ROUTES.ISAUTHORIZATED).subscribe(resp => {
      return resp.resp;
    });
  }


}
