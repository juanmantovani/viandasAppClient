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

  addBanner(request: AddMenuRequest) : Observable<AddMenuResponse> {

    return this.http.post<AddMenuResponse>(ROUTES.API_ROUTES.MENU.UPLOADMENU, request).pipe(
      tap (res => {
        new AddMenuResponse(res),
        console.log(res)
      })
    );
  }
}
