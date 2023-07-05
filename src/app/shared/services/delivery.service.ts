import { Injectable } from '@angular/core';
import { GetDeliveryRequest } from '../dto/delivery/GetDeliveryRequest';
import { HttpClient } from '@angular/common/http';
import * as ROUTES from '../routes/index.routes'
import { map, Observable, tap } from 'rxjs';
import { GetDeliveryResponse } from '../dto/delivery/GetDeliveryResponse';
import { GetReportByDeliveryResponse } from '../dto/delivery/GetReportByDeliveryResponse';



@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient) { }
  OPTION = { headers: { 'Content-Type': 'application/json' } };


  getDelivery(request: GetDeliveryRequest) : Observable<GetDeliveryResponse> {
    return this.http.post<any>(ROUTES.API_ROUTES.DELIVERY.GETDELIVERY, JSON.stringify(request), this.OPTION).pipe(
      map(res => {
        return new GetDeliveryResponse(res.deliveryResponse);
      })
    )
  }

  getReportByDelivery(request: GetDeliveryRequest) : Observable<GetReportByDeliveryResponse> {
    return this.http.post<any>(ROUTES.API_ROUTES.DELIVERY.GETREPORTBYDELIVERY, JSON.stringify(request), this.OPTION).pipe(
      map(res => {
        var response = new GetReportByDeliveryResponse(res);
        if (!response.path){
          response.message = "No fue posible descargar el reporte"
        }
        return new GetReportByDeliveryResponse(res);
      })
    )
  }
}
