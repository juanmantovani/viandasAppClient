import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AddTandaRequest } from '../dto/tanda/AddTandaRequest';
import { AddTandaResponse } from '../dto/tanda/AddTandaResponse';
import { AssignAddressToTandaRequest } from '../dto/tanda/AssignAddressToTandaRequest';
import { AssignAddressToTandaResponse } from '../dto/tanda/AssignAddressToTandaResponse';
import { DeleteTandaRequest } from '../dto/tanda/DeleteTandaRequest';
import { DeleteTandaResponse } from '../dto/tanda/DeleteTandaResponse';
import { EditTandaRequest } from '../dto/tanda/EditTandaRequest';
import { EditTandaResponse } from '../dto/tanda/EditTandaResponse';
import { GetTandaResponse } from '../dto/tanda/GetTandaResponse';
import * as ROUTES from '../routes/index.routes'

@Injectable({
  providedIn: 'root'
})
export class TandaService {

  constructor(private http: HttpClient) { }
  OPTION = { headers: { 'Content-Type': 'application/json' } };


  getTanda(): Observable<GetTandaResponse> {
    return this.http.get<GetTandaResponse>(ROUTES.API_ROUTES.TANDA.GETTANDA).pipe(
      map((res: any) => {
        return new GetTandaResponse(res);
      })
    )
  }

  addTanda(request: AddTandaRequest): Observable<AddTandaResponse> {
    return this.http.post<AddTandaResponse>(ROUTES.API_ROUTES.TANDA.ADDTANDA, JSON.stringify(request), this.OPTION).pipe(
      tap(res => new AddTandaResponse(res)))
  }

  editTanda(request: EditTandaRequest): Observable<EditTandaResponse> {
    return this.http.put<EditTandaResponse>(ROUTES.API_ROUTES.TANDA.EDITTANDA, JSON.stringify(request), this.OPTION).pipe(
      tap(res => new EditTandaResponse(res)))
  }

  deleteTanda(request: DeleteTandaRequest): Observable<DeleteTandaResponse> {
    let params = new HttpParams();
    params = params.set('idTanda', request.idTanda?.toString());

    return this.http.delete<DeleteTandaResponse>(ROUTES.API_ROUTES.TANDA.DELETETANDA, { params }).pipe(
      tap(res => new DeleteTandaResponse(res))
    );
  }


  assignAddressToTanda(request: AssignAddressToTandaRequest): Observable<AssignAddressToTandaResponse> {
    return this.http.post<AssignAddressToTandaResponse>(ROUTES.API_ROUTES.TANDA.ASSIGNADDRESSTOTANDA, JSON.stringify(request), this.OPTION).pipe(
      tap(res => new AssignAddressToTandaResponse(res)))
  }
}
