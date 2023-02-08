import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AddMenuRequest } from '../dto/menu/AddMenuRequest';
import { AddMenuResponse } from '../dto/menu/AddMenuResponse';
import { EditMenuRequest } from '../dto/menu/EditMenuRequest';
import { EditMenuResponse } from '../dto/menu/EditMenuResponse';
import { GetMenuResponse } from '../dto/menu/GetMenuResponse';
import { GetDayRequest } from '../dto/menu/GetDaysRequest';
import { GetDayResponse } from '../dto/menu/GetDaysResponse';
import  * as ROUTES  from '../routes/index.routes'
import { ValidateDateMenuRequest } from '../dto/menu/ValidateDateMenuRequest';
import { ValidateDateMenuResponse } from '../dto/menu/ValidateDateMenuResponse';

import { DeleteMenuResponse } from '../dto/menu/DeleteMenuResponse';
import { DeleteMenuRequest } from '../dto/menu/DeleteMenuRequest';
import { GetAllMenuResponse } from '../dto/menu/GetAllMenuResponse';
import { GetMenuByCategoriesRequest } from '../dto/menu/GetMenuByCategoryRequest';
import { getMenuByCategoriesResponse } from '../dto/menu/getMenuByCategoriesResponse';
import { Menu } from '../models/Menu';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }
  OPTION = {headers: {'Content-Type': 'application/json'}};


  getMenuViewer(): Observable<GetMenuResponse> {
    return this.http.get<GetMenuResponse>(ROUTES.API_ROUTES.MENU.GETMENUVIEWER).pipe(
    map((res: any) => {
     return new GetMenuResponse(res);
   })
 )
}

  addMenu(request: AddMenuRequest) : Observable<AddMenuResponse> {    
    return this.http.post<AddMenuResponse>(ROUTES.API_ROUTES.MENU.ADDMENU, JSON.stringify(request), this.OPTION ).pipe(
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

  getAllMenus(): Observable<GetAllMenuResponse>{
    return this.http.get<GetAllMenuResponse>(ROUTES.API_ROUTES.MENU.GETALLMENU).pipe(
      map((res: any) => {
        return new GetAllMenuResponse(res);
      })
     )
  }

  getMenuViewerByCategory(idCategory: number): Observable<GetMenuResponse>{
    let params = new HttpParams();
    params = params.set('idCategory', idCategory?.toString());
   return this.http.get<GetMenuResponse>(ROUTES.API_ROUTES.MENU.GETMENUBYCATEGORY, {params}).pipe(
      map((res: any) => {
        return new GetMenuResponse(res);
      })
     )
  }

  getMenuByID(idMenu: number): Observable<GetMenuResponse>{
    let params = new HttpParams();
    params = params.set('idMenu', idMenu?.toString());
    return this.http.get<GetMenuResponse>(ROUTES.API_ROUTES.MENU.GETMENUBYID, {params}).pipe(
      map((res: any) => {
        return new GetMenuResponse(res);
      })
     )
  }

  deleteMenu(request: DeleteMenuRequest): Observable<DeleteMenuResponse>{
    let params = new HttpParams();
    params = params.set('idMenu', request.idMenu?.toString());
    params = params.set('idTurn', request.idTurn?.toString());
    return this.http.delete<DeleteMenuResponse>(ROUTES.API_ROUTES.MENU.DELETEMENU, {params}).pipe(
      map((res: any) => new DeleteMenuResponse(res))
     )
  }

  getMenuByCategories(request : GetMenuByCategoriesRequest) : Observable<getMenuByCategoriesResponse>{
    return this.http.post<getMenuByCategoriesResponse>(ROUTES.API_ROUTES.MENU.GETMENUBYCATEGORIES, JSON.stringify(request), this.OPTION ).pipe(
      tap (res => {
        new getMenuByCategoriesResponse(res)
      }))
  }

}
