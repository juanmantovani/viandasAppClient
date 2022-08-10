import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable, delay } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private readonly spinnerService:SpinnerService) {}

  requestCounter = 0;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    this.beginRequest();

    return next.handle(request).pipe(
      finalize(() => this.endRequest()));
  }

  //La primera vez muestra el spinner
  beginRequest() {
    this.requestCounter = Math.max(this.requestCounter, 0) + 1;

    if (this.requestCounter === 1){
      this.spinnerService.show();
    }
  }

  //Cuando no hay más request pendientes, oculta el spinner
  endRequest(){
    this.requestCounter = Math.max(this.requestCounter, 1) - 1;

    if (this.requestCounter === 0){
      this.spinnerService.hide()
    }
  }
}
