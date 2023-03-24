import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddZoneRequest } from '../dto/setting/AddZoneRequest';
import { map, Observable, tap } from 'rxjs';
import { EditZoneRequest } from '../dto/setting/EditZoneRequest';
import  * as ROUTES  from '../routes/index.routes'
import { AddZoneResponse } from '../dto/setting/AddZoneResponse';
import { EditZoneResponse } from '../dto/setting/EditZoneResponse';
import { GetZoneResponse } from '../dto/setting/GetZoneResponse';
import { DeleteZoneRequest } from '../dto/setting/DeleteZoneRequest';
import { DeleteZoneResponse } from '../dto/setting/DeleteZoneResponse';
import { GetDiscountResponse } from '../dto/setting/GetDiscountResponse';
import { AddDiscountResponse } from '../dto/setting/AddDiscountResponse';
import { AddDiscountRequest } from '../dto/setting/AddDiscountRequest';
import { EditDiscountResponse } from '../dto/setting/EditDiscountResponse';
import { EditDiscountRequest } from '../dto/setting/EditDiscountRequest';
import { DeleteDiscountResponse } from '../dto/setting/DeleteDiscountResponse';
import { DeleteDiscountRequest } from '../dto/setting/DeleteDiscountRequest';


@Injectable({
  providedIn: 'root'
})
export class SettingService {

  OPTIONS = {headers: {'Content-Type': 'application/json'}};

  constructor(private http: HttpClient) { }

  getZone(): Observable<GetZoneResponse>{
    return this.http.get<GetZoneResponse>(ROUTES.API_ROUTES.SETTING.GETZONE).pipe(
      map((res:any) => {
        return new GetZoneResponse(res.zone);
      })
    )
  }

  addZone(request : AddZoneRequest):Observable<AddZoneResponse>{
    return this.http.post<AddZoneResponse>(ROUTES.API_ROUTES.SETTING.ADDZONE,JSON.stringify(request), this.OPTIONS).pipe(
      map((res:any) => {
        return new AddZoneResponse(res);
      })
    )
  }

  editZone(request : EditZoneRequest):Observable<EditZoneResponse>{
    return this.http.put<EditZoneResponse>(ROUTES.API_ROUTES.SETTING.EDITZONE,JSON.stringify(request), this.OPTIONS).pipe(
      map((res:any) => {
        return new EditZoneResponse(res);
      })
    )
  }

  deleteZone(request: DeleteZoneRequest): Observable<DeleteZoneResponse> {
    let params = new HttpParams();
    params = params.set('idZone', request.idZone?.toString());
  
    return this.http.delete<DeleteZoneResponse>(ROUTES.API_ROUTES.SETTING.DELETEZONE, {params}).pipe(
    tap (res => new DeleteZoneResponse(res))
    );
  }

  getDiscount(): Observable<GetDiscountResponse>{
    return this.http.get<GetDiscountResponse>(ROUTES.API_ROUTES.SETTING.GETDISCOUNT).pipe(
      map((res:any) => {
        return new GetDiscountResponse(res.discount);
      })
    )
  }

  addDiscount(request : AddDiscountRequest):Observable<AddDiscountResponse>{
    return this.http.post<AddDiscountResponse>(ROUTES.API_ROUTES.SETTING.ADDDISCOUNT,JSON.stringify(request), this.OPTIONS).pipe(
      map((res:any) => {
        return new AddDiscountResponse(res);
      })
    )
  }

  editDiscount(request : EditDiscountRequest):Observable<EditDiscountResponse>{
    return this.http.put<EditDiscountResponse>(ROUTES.API_ROUTES.SETTING.EDITDISCOUNT,JSON.stringify(request), this.OPTIONS).pipe(
      map((res:any) => {
        return new EditDiscountResponse(res);
      })
    )
  }

  deleteDiscount(request: DeleteDiscountRequest): Observable<DeleteDiscountResponse> {
    let params = new HttpParams();
    params = params.set('idDiscount', request.idDiscount?.toString());
  
    return this.http.delete<DeleteDiscountResponse>(ROUTES.API_ROUTES.SETTING.DELETEDISCOUNT, {params}).pipe(
    tap (res => new DeleteDiscountResponse(res))
    );
  }

}
