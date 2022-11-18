import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { GetCityResponse } from '../dto/city/GetCityResponse';
import { GetClientByIdUserResponse } from '../dto/client/GetClientByIdUserResponse';
import { RegisterClientRequest } from '../dto/client/RegisterClientRequest';
import { RegisterClientResponse } from '../dto/client/RegisterClientResponse';
import { UpdateClientRequest } from '../dto/client/UpdateClientRequest';
import { UpdateClientResponse } from '../dto/client/UpdateClientResponse';
import  * as ROUTES  from '../routes/index.routes'


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) { }
  OPTIONS = {headers: {'Content-Type': 'application/json'}};


  
  registerClient(request: RegisterClientRequest) : Observable<RegisterClientResponse> {
    console.log(JSON.stringify(request))
    return this.http.post<RegisterClientResponse>(ROUTES.API_ROUTES.CLIENT.REGISTERCLIENT, JSON.stringify(request), this.OPTIONS).pipe(
      tap (res => 
        new RegisterClientResponse(res))
    );
  }

  updateClient(request: UpdateClientRequest) : Observable <UpdateClientResponse>{
    return this.http.post<UpdateClientResponse>(ROUTES.API_ROUTES.CLIENT.UPDATECLIENT, JSON.stringify(request), this.OPTIONS).pipe(
      tap (res => 
        new UpdateClientResponse(res))
    );
  }

  getCities(): Observable<GetCityResponse>{
    return this.http.get<GetCityResponse>(ROUTES.API_ROUTES.CITY.GETCITY).pipe(
      map((res: any) => {
        return new GetCityResponse(res);
      })
    )  
  }

  getClientByIdUser(idUser : string): Observable<GetClientByIdUserResponse>{
    let params = new HttpParams();
    params = params.set('idUser', idUser);

    return this.http.get<GetClientByIdUserResponse>(ROUTES.API_ROUTES.CATEGORY.GETCATEGORY, {params}).pipe(
      map((res:any) => {
        return new GetClientByIdUserResponse(null);
      })
    )
  }

}
