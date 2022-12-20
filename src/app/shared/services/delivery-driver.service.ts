import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import * as ROUTES from '../routes/index.routes'
import { GetDeliveryDriverResponse } from '../dto/deliveryDriver/GetDeliveryDriverResponse';
import { AddDeliveryDriverRequest } from '../dto/deliveryDriver/AddDeliveryDriverRequest';
import { AddDeliveryDriverResponse } from '../dto/deliveryDriver/AddDeliveryDriverResponse';
import { EditDeliveryDriverRequest } from '../dto/deliveryDriver/EditDeliveryDriverRequest';
import { EditDeliveryDriverResponse } from '../dto/deliveryDriver/EditDeliveryDriverResponse';
import { DeleteDeliveryDriverRequest } from '../dto/deliveryDriver/DeleteDeliveryDriverRequest';
import { DeleteDeliveryDriverResponse } from '../dto/deliveryDriver/DeleteDeliveryDriverResponse';

@Injectable({
  providedIn: 'root'
})
export class DeliveryDriverService {

  constructor(private http: HttpClient) { }
  OPTION = { headers: { 'Content-Type': 'application/json' } };


  getDeliveryDriver(): Observable<GetDeliveryDriverResponse> {
    return this.http.get<GetDeliveryDriverResponse>(ROUTES.API_ROUTES.DELIVERYDRIVER.GETDELIVERYDRIVER).pipe(
      map((res: any) => {
        return new GetDeliveryDriverResponse(res);
      })
    )
  }

  addDeliveryDriver(request: AddDeliveryDriverRequest) : Observable<AddDeliveryDriverResponse> {    
    return this.http.post<AddDeliveryDriverResponse>(ROUTES.API_ROUTES.DELIVERYDRIVER.ADDDELIVERYDRIVER, JSON.stringify(request), this.OPTION ).pipe(
    tap (res => new AddDeliveryDriverResponse(res)))
  }
  
  editDeliveryDriver(request: EditDeliveryDriverRequest) : Observable<EditDeliveryDriverResponse>{
    return this.http.put<EditDeliveryDriverResponse>(ROUTES.API_ROUTES.DELIVERYDRIVER.EDITDELIVERYDRIVER, JSON.stringify(request), this.OPTION ).pipe(
      tap (res => new EditDeliveryDriverResponse(res)))
  }
  
  deleteDeliveryDriver(request: DeleteDeliveryDriverRequest): Observable<DeleteDeliveryDriverResponse> {
    let params = new HttpParams();
    params = params.set('idDeliveryDriver', request.idDeliveryDriver?.toString());
  
    return this.http.delete<DeleteDeliveryDriverResponse>(ROUTES.API_ROUTES.DELIVERYDRIVER.DELETEDELIVERYDRIVER, {params}).pipe(
    tap (res => new DeleteDeliveryDriverResponse(res))
    );
  }

}
