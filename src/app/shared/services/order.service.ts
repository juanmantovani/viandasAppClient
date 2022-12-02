import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddOrderRequest } from '../dto/order/AddOrderRequest';
import { AddOrderResponse } from '../dto/order/AddOrderResponse';
import  * as ROUTES  from '../routes/index.routes'
import { map, Observable, tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  OPTION = {headers: {'Content-Type': 'application/json'}};


  addOrder(request: AddOrderRequest) : Observable<AddOrderResponse> {
    return this.http.post<AddOrderResponse>(ROUTES.API_ROUTES.ORDER.UPLOADORDER, JSON.stringify(request), this.OPTION ).pipe(
      tap (res => {
        new AddOrderResponse(res);
      }))  
  }

}
