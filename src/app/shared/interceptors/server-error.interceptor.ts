import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, delay, retryWhen, catchError, tap, } from 'rxjs/operators';
import { MatNotificationComponent } from '../components/mat-notification/mat-notification.component';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
export const maxRetries = 2;
export const delayMs = 2000;

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

  route: ActivatedRouteSnapshot;
  state: RouterStateSnapshot;

  constructor(private notifier: MatNotificationComponent, private router : Router ) {}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(

      tap(async (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.status === 201) {
          this.notifier.showSuccess();
        }
      }),


      retryWhen((error) => {
        return error.pipe(
          mergeMap((error, index) => {
            if ((error.status == 400 && (error.error.search("token contains an invalid number of segments") != -1)) || (error.status == 403)){
              this.router.navigate(['/inicio'])
            }
            if (index < maxRetries && error.status == 500) {
              return of(error).pipe(delay(delayMs));
            }      
            throw error;
          })
        )
      })
    );
  }

}
