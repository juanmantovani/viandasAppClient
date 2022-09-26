import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AddMenuRequest } from '../dto/menu/AddMenuRequest';
import { AddMenuResponse } from '../dto/menu/AddMenuResponse';
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
}
