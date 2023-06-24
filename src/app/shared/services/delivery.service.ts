import { Injectable } from '@angular/core';
import { GetDeliveryRequest } from '../dto/delivery/GetDeliveryRequest';
import { HttpClient } from '@angular/common/http';
import * as ROUTES from '../routes/index.routes'
import { map, Observable, tap } from 'rxjs';
import { GetDeliveryResponse } from '../dto/delivery/GetDeliveryResponse';



@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient) { }
  OPTION = { headers: { 'Content-Type': 'application/json' } };


  getDelivery(request: GetDeliveryRequest) : Observable<GetDeliveryResponse> {
    return this.http.post<any>(ROUTES.API_ROUTES.DELIVERY.GETDELIVERY,JSON.stringify(request), this.OPTION).pipe(
      map((res: GetDeliveryResponse) => {
        console.log(res)
        return new GetDeliveryResponse(res);
      })
    )
  }
}
