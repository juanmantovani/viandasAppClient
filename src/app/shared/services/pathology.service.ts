import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AddPathologyRequest } from '../dto/pathology/AddPathologyRequest';
import { AddPathologyResponse } from '../dto/pathology/AddPathologyResponse';
import { DeletePathologyRequest } from '../dto/pathology/DeletePathologyRequest';
import { DeletePathologyResponse } from '../dto/pathology/DeletePathologyResponse';
import { EditPathologyRequest } from '../dto/pathology/EditPathologyRequest';
import { EditPathologyResponse } from '../dto/pathology/EditPathologyResponse';
import { GetPathologyResponse } from '../dto/pathology/GetPathologyResponse';
import  * as ROUTES  from '../routes/index.routes'


@Injectable({
  providedIn: 'root'
})
export class PathologyService {

  constructor(private http: HttpClient) { }
  OPTION = {headers: {'Content-Type': 'application/json'}};


  getPathology(): Observable<GetPathologyResponse> {
    return this.http.get<GetPathologyResponse>(ROUTES.API_ROUTES.PATHOLOGY.GETPATHOLOGY).pipe(
   map((res: any) => {
    console.log(ROUTES.API_ROUTES.PATHOLOGY.GETPATHOLOGY)
    console.log(res)
     return new GetPathologyResponse(res);
   })
 )
}

addPathology(request: AddPathologyRequest) : Observable<AddPathologyResponse> {    
  return this.http.post<AddPathologyResponse>(ROUTES.API_ROUTES.MENU.UPLOADMENU, JSON.stringify(request), this.OPTION ).pipe(
  tap (res => new AddPathologyResponse(res)))
}

editPathology(request: EditPathologyRequest) : Observable<EditPathologyResponse>{
  return this.http.put<EditPathologyResponse>(ROUTES.API_ROUTES.MENU.EDITMENU, JSON.stringify(request), this.OPTION ).pipe(
    tap (res => new EditPathologyResponse(res)))
}

deletePathology(request: DeletePathologyRequest): Observable<DeletePathologyResponse> {
  let params = new HttpParams();
  params = params.set('idPathology', request.idPathology?.toString());

  return this.http.delete<DeletePathologyResponse>(ROUTES.API_ROUTES.CATEGORY.DELETECATEGORY, {params}).pipe(
  tap (res => new DeletePathologyResponse(res))
  );
}
}
