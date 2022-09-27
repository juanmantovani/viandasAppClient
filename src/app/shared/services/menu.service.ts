import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map } from 'rxjs';
import { AddMenuRequest } from '../dto/menu/AddMenuRequest';
import { AddMenuResponse } from '../dto/menu/AddMenuResponse';
import { EditMenuRequest } from '../dto/menu/EditMenuRequest';
import { EditMenuResponse } from '../dto/menu/EditMenuResponse';
import { GetMenuResponse } from '../dto/menu/getMenuResponse';
import  * as ROUTES  from '../routes/index.routes'


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getMenu(): Observable<GetMenuResponse> {
    return this.http.get<GetMenuResponse>(ROUTES.API_ROUTES.MENU.GETMENU).pipe(
    map((res: any) => {
     return new GetMenuResponse(res);
   })
 )
}

  addMenu(request: AddMenuRequest) : Observable<AddMenuResponse> {    
    const options = {headers: {'Content-Type': 'application/json'}};
    return this.http.post<AddMenuResponse>(ROUTES.API_ROUTES.MENU.UPLOADMENU, JSON.stringify(request), options ).pipe(
    tap (res => new AddMenuResponse(res)))
  }

  editMenu(request: EditMenuRequest) : Observable<EditMenuResponse>{
    const options = {headers: {'Content-Type': 'application/json'}};
    return this.http.post<EditMenuResponse>(ROUTES.API_ROUTES.MENU.EDITMENU, JSON.stringify(request), options ).pipe(
      tap (res => new EditMenuResponse(res)))
  }
}
