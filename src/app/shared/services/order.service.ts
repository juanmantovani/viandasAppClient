import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddOrderRequest } from '../dto/order/AddOrderRequest';
import { AddOrderResponse } from '../dto/order/AddOrderResponse';
import  * as ROUTES  from '../routes/index.routes'
import { map, Observable, tap } from 'rxjs';
import { GetOrderViewerResponse } from '../dto/order/GetOrderViewerResponse';



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  OPTION = {headers: {'Content-Type': 'application/json'}};


  addOrder(request: AddOrderRequest) : Observable<AddOrderResponse> {
    return this.http.post<AddOrderResponse>(ROUTES.API_ROUTES.ORDER.ADDORDER, JSON.stringify(request), this.OPTION ).pipe(
      tap (res => {
        new AddOrderResponse(res);
      }))  
  }

  getOrderViewer(): Observable<GetOrderViewerResponse> {
    return this.http.get<GetOrderViewerResponse>(ROUTES.API_ROUTES.ORDER.GETORDERVIEWER).pipe(
    map((res: any) => {
      return new GetOrderViewerResponse(res);
   })
 )
}


}
