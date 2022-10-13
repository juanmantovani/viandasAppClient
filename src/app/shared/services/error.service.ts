import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }
  
  getClientMessage(error: Error): string {
    if (!navigator.onLine) {
      return 'No hay conexión a internet';
    }
    return error?.message ? error?.message : error?.toString();
}

  getClientStack(error: Error): any {
    return error.stack;
  }

  getServerMessage(error: HttpErrorResponse): HttpErrorResponse {
    return error?.message ? error : error;
  }

  getServerStack(error: HttpErrorResponse): string {
    return 'stack';
  }


}
