import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { GetCityResponse } from '../dto/city/GetCityResponse';
import { GetClientByIdTandaRequest } from '../dto/client/GetClientByIdTandaRequest';
import { GetClientByIdUserResponse } from '../dto/client/GetClientByIdUserResponse';
import { GetClientResponse } from '../dto/client/GetClientResponse';
import { RegisterClientRequest } from '../dto/client/RegisterClientRequest';
import { UpdateClientRequest } from '../dto/client/UpdateClientRequest';
import { AddNoteRequest } from '../dto/note/AddNoteRequest';
import { AddNoteResponse } from '../dto/note/AddNoteResponse';
import { EditNoteRequest } from '../dto/note/EditNoteRequest';
import { EditNoteResponse } from '../dto/note/EditNoteResponse';
import * as ROUTES from '../routes/index.routes'
import { DeleteClientRequest } from '../dto/client/DeleteClientRequest';
import { Client } from '../models/Client';
import { AddClientRequest } from '../dto/client/AddClientRequest';
import { BaseResponse } from '../dto/BaseResponse';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clientPersonified: any;

  constructor(private http: HttpClient) { }
  OPTIONS = { headers: { 'Content-Type': 'application/json' } };

  getClient(): Observable<GetClientResponse> {
    return this.http.get<GetClientResponse>(ROUTES.API_ROUTES.CLIENT.GETCLIENT).pipe(
      map((res: any) => {
        return new GetClientResponse(res);
      })
    )
  }

  registerClient(request: RegisterClientRequest): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(ROUTES.API_ROUTES.CLIENT.REGISTERCLIENT, JSON.stringify(request), this.OPTIONS).pipe(
      tap(res =>
        new BaseResponse(res))
    );
  }

  addClient(request: AddClientRequest): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(ROUTES.API_ROUTES.CLIENT.ADDCLIENT, JSON.stringify(request), this.OPTIONS).pipe(
      tap(res =>
        new BaseResponse(res))
    );
  }

  updateClient(request: UpdateClientRequest): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(ROUTES.API_ROUTES.CLIENT.EDITCLIENT, JSON.stringify(request), this.OPTIONS).pipe(
      tap(res =>
        new BaseResponse(res))
    );
  }

  getCities(): Observable<GetCityResponse> {
    return this.http.get<GetCityResponse>(ROUTES.API_ROUTES.CITY.GETCITY).pipe(
      map((res: any) => {
        return new GetCityResponse(res);
      })
    )
  }

  getClientByIdUser(idUser: string): Observable<GetClientByIdUserResponse> {
    let params = new HttpParams();
    params = params.set('idUser', idUser);

    return this.http.get<GetClientByIdUserResponse>(ROUTES.API_ROUTES.CLIENT.GETCLIENTBYIDUSER, { params }).pipe(
      map((res: any) => {
        return new GetClientByIdUserResponse(res);
      })
    )
  }


  getClientByIdTanda(request: GetClientByIdTandaRequest): Observable<GetClientResponse> {

    return this.http.post<GetClientResponse>(ROUTES.API_ROUTES.CLIENT.GETCLIENTBYTANDA, JSON.stringify(request), this.OPTIONS).pipe(
      map((res: any) => {
        return new GetClientResponse(res);
      })
    )
  }

  addNote(request: AddNoteRequest): Observable<AddNoteResponse> {
    return this.http.post<AddNoteResponse>(ROUTES.API_ROUTES.NOTE.ADDNOTE, JSON.stringify(request), this.OPTIONS).pipe(
      map((res: any) => {
        return new AddNoteResponse(res);
      })
    )
  }

  editNote(request: EditNoteRequest): Observable<EditNoteResponse> {
    return this.http.post<EditNoteResponse>(ROUTES.API_ROUTES.NOTE.EDITNOTE, JSON.stringify(request), this.OPTIONS).pipe(
      map((res: any) => {
        return new EditNoteResponse(res);
      })
    )
  }

  deleteClient(request: DeleteClientRequest): Observable<BaseResponse> {
    let params = new HttpParams();
    params = params.set('idClient', request.idClient?.toString());

    return this.http.delete<BaseResponse>(ROUTES.API_ROUTES.CLIENT.DELETECLIENT, { params }).pipe(
      tap(res => new BaseResponse(res))
    );
  }

  getClientPersonified() {
    return this.clientPersonified
  }

  setClientPersonified(client: Client) {
    this.clientPersonified = new Client(client)
  }

  removeClientPersonified() {
    this.clientPersonified = undefined
  }

}
