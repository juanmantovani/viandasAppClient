import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public router: Router, private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem("token");

    if(this.authService.isAutenticated()) {
        const cloned = request.clone({
          headers: request.headers.set("Authorization", "Barer" + token)
      });
      return next.handle(cloned)
    } else {
      this.router.navigate(['login']);

    }
    return next.handle(request);
  }
}
