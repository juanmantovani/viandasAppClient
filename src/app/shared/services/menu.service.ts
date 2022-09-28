import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AddMenuRequest } from '../dto/menu/AddMenuRequest';
import { AddMenuResponse } from '../dto/menu/AddMenuResponse';
import { EditMenuRequest } from '../dto/menu/EditMenuRequest';
import { EditMenuResponse } from '../dto/menu/EditMenuResponse';
import { GetDayRequest } from '../dto/menu/GetDaysRequest';
import { GetDayResponse } from '../dto/menu/GetDaysResponse';
import  * as ROUTES  from '../routes/index.routes'


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  addMenu(request: AddMenuRequest) : Observable<AddMenuResponse> {    
    const options = {headers: {'Content-Type': 'application/json'}};
    return this.http.post<AddMenuResponse>(ROUTES.API_ROUTES.MENU.UPLOADMENU, JSON.stringify(request), options ).pipe(
    tap (res => new AddMenuResponse(res)))
  }

  editMenu(request: EditMenuRequest) : Observable<EditMenuResponse>{
    const options = {headers: {'Content-Type': 'application/json'}};
    return this.http.put<EditMenuResponse>(ROUTES.API_ROUTES.MENU.EDITMENU, JSON.stringify(request), options ).pipe(
      tap (res => new EditMenuResponse(res)))
  }

  getDayMenu(request : GetDayRequest) : Observable<GetDayResponse>{
    const options = {headers: {'Content-Type': 'application/json'}};

    return this.http.post<GetDayResponse>(ROUTES.API_ROUTES.MENU.GETDAYMENU, JSON.stringify(request)).pipe(
   map((res: any) => {
     return new GetDayResponse(res);
   })
 )
}
}
