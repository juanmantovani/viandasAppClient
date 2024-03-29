import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { catchError, Observable, of, shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../dto/Login/LoginRequest';
import { LoginResponse } from '../dto/Login/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.url;

  constructor(private http: HttpClient) { }

  public loginByEmail(form: LoginRequest): Observable<LoginResponse>{
    let direction = this.url + 'login';
    return this.http.post<LoginResponse>(direction, form).pipe(
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
