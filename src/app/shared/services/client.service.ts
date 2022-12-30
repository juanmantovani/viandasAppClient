import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { GetCityResponse } from '../dto/city/GetCityResponse';
import { GetClientByIdTandaRequest } from '../dto/client/GetClientByIdTandaRequest';
import { GetClientByIdUserResponse } from '../dto/client/GetClientByIdUserResponse';
import { GetClientResponse } from '../dto/client/GetClientResponse';
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

  getClient():Observable<GetClientResponse>{
    return this.http.get<GetClientResponse>(ROUTES.API_ROUTES.CLIENT.GETCLIENT).pipe(
      map((res:any) => {
        return new GetClientResponse(res);
      })
    )
  }
  
  registerClient(request: RegisterClientRequest) : Observable<RegisterClientResponse> {
    return this.http.post<RegisterClientResponse>(ROUTES.API_ROUTES.CLIENT.REGISTERCLIENT, JSON.stringify(request), this.OPTIONS).pipe(
      tap (res => 
        new RegisterClientResponse(res))
    );
  }

  updateClient(request: UpdateClientRequest) : Observable <UpdateClientResponse>{
    return this.http.post<UpdateClientResponse>(ROUTES.API_ROUTES.CLIENT.EDITCLIENT, JSON.stringify(request), this.OPTIONS).pipe(
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

    return this.http.get<GetClientByIdUserResponse>(ROUTES.API_ROUTES.CLIENT.GETCLIENTBYIDUSER, {params}).pipe(
      map((res:any) => {
        return new GetClientByIdUserResponse(res);
      })
    )
  }


  getClientByIdTanda(request : GetClientByIdTandaRequest):Observable<GetClientResponse>{
    
    return this.http.post<GetClientResponse>(ROUTES.API_ROUTES.CLIENT.GETCLIENTBYTANDA, JSON.stringify(request), this.OPTIONS).pipe(
      map((res:any) => {
        console.log("lo que manda el raulo",res)
        return new GetClientResponse(res);
      })
    )
  }

  

}
