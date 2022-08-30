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

export const maxRetries = 2;
export const delayMs = 2000;

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

  constructor(private notifier: MatNotificationComponent) {}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(

      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.status === 201) {
          this.notifier.showSuccess();
        }
      }),

      retryWhen((error) => {
        return error.pipe(
          mergeMap((error, index) => {
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
