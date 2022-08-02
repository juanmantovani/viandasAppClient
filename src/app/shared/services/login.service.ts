import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../dto/Login/LoginRequest';
import { LoginResponse } from '../dto/Login/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  loginByEmail(form: LoginRequest): Observable<LoginResponse> {
    let direccion = this.url + 'login';
    return this.http.post<LoginResponse>(direccion, form);
  }

}
