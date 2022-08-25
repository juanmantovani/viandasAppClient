import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import  * as ROUTES  from '../routes/index.routes'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    public router: Router, 
    private authService: AuthService,
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem("token");

    if(token) {
        const cloned = request.clone({
          headers: request.headers.set("Authorization", "Bearer" + token)
      });
      return next.handle(cloned)
    } else {
      this.router.navigateByUrl(ROUTES.INTERNAL_ROUTES.LOGIN);

    }
    return next.handle(request);
  }
}
