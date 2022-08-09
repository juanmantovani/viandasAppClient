import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, delay, retryWhen, catchError } from 'rxjs/operators';

export const maxRetries = 2;
export const delayMs = 2000;

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retryWhen((error) => {
        return error.pipe(
          mergeMap((error, index) => {
            if (index < maxRetries && error.status == 500) {
              return of(error).pipe(delay(delayMs));
            }
            
            throw error;
          })
        )
      }
      )
    )
      //retry(2),
      // catchError((error: HttpErrorResponse) => {
      //   if (error.status === 401) {
      //     // refresh token
      //   } else {
      //   }
      // })
  }
}
