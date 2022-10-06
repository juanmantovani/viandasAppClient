import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AddMenuRequest } from '../dto/menu/AddMenuRequest';
import { AddMenuResponse } from '../dto/menu/AddMenuResponse';
import { EditMenuRequest } from '../dto/menu/EditMenuRequest';
import { EditMenuResponse } from '../dto/menu/EditMenuResponse';
import { GetMenuResponse } from '../dto/menu/getMenuResponse';
import { GetDayRequest } from '../dto/menu/GetDaysRequest';
import { GetDayResponse } from '../dto/menu/GetDaysResponse';
import  * as ROUTES  from '../routes/index.routes'
import { ValidateDateMenuRequest } from '../dto/menu/ValidateDateMenuRequest';
import { ValidateDateMenuResponse } from '../dto/menu/ValidateDateMenuResponse';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }
  OPTION = {headers: {'Content-Type': 'application/json'}};


  getMenu(): Observable<GetMenuResponse> {
    return this.http.get<GetMenuResponse>(ROUTES.API_ROUTES.MENU.GETMENU).pipe(
    map((res: any) => {
     return new GetMenuResponse(res);
   })
 )
}

  addMenu(request: AddMenuRequest) : Observable<AddMenuResponse> {    
    return this.http.post<AddMenuResponse>(ROUTES.API_ROUTES.MENU.UPLOADMENU, JSON.stringify(request), this.OPTION ).pipe(
    tap (res => new AddMenuResponse(res)))
  }

  editMenu(request: EditMenuRequest) : Observable<EditMenuResponse>{
    return this.http.put<EditMenuResponse>(ROUTES.API_ROUTES.MENU.EDITMENU, JSON.stringify(request), this.OPTION ).pipe(
      tap (res => new EditMenuResponse(res)))
  }

  getDayMenu(request : GetDayRequest) : Observable<GetDayResponse>{
    return this.http.post<GetDayResponse>(ROUTES.API_ROUTES.MENU.GETDAYMENU, JSON.stringify(request), this.OPTION).pipe(
   map((res: any) => {
     return new GetDayResponse(res);
   })
  )
  }
  validateDateMenu(request : ValidateDateMenuRequest) : Observable<ValidateDateMenuResponse>{
    return this.http.post<ValidateDateMenuResponse>(ROUTES.API_ROUTES.MENU.VALIDATEDATEMENU, JSON.stringify(request), this.OPTION).pipe(
      map((res: any) => {
        return new ValidateDateMenuResponse(res);
      })
     )
  }



}
