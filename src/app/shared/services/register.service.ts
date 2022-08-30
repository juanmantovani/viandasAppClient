import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { RegisterRequest } from '../dto/register/RegisterRequest';
import { RegisterResponse } from '../dto/register/RegisterResponse';
import  * as ROUTES  from '../routes/index.routes'


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient, private router:Router) { }

  public registerByEmail(request: RegisterRequest): Observable<RegisterResponse>{
    
    return this.http.post<RegisterResponse>(ROUTES.API_ROUTES.REGISTER, request.user).pipe(
      tap (res => {new RegisterResponse(res)})
    );
  }
}
