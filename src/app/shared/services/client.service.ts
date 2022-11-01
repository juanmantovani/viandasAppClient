import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { RegisterClientRequest } from '../dto/clients/RegisterClientRequest';
import { RegisterClientResponse } from '../dto/clients/RegisterClientResponse';
import { UpdateClientRequest } from '../dto/clients/UpdateClientRequest';
import { UpdateClientResponse } from '../dto/clients/UpdateClientResponse';
import  * as ROUTES  from '../routes/index.routes'


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) { }
  OPTIONS = {headers: {'Content-Type': 'application/json'}};


  
  registerClient(request: RegisterClientRequest) : Observable<RegisterClientResponse> {
    console.log(request)
    return this.http.post<RegisterClientResponse>(ROUTES.API_ROUTES.CLIENT.REGISTERCLIENT, JSON.stringify(request), this.OPTIONS).pipe(
      tap (res => 
        new RegisterClientResponse(res))
    );
  }

  updateClient(request: UpdateClientRequest) : Observable <UpdateClientResponse>{
    return this.http.post<UpdateClientResponse>(ROUTES.API_ROUTES.CLIENT.UPDATEcLIENT, JSON.stringify(request), this.OPTIONS).pipe(
      tap (res => 
        new UpdateClientResponse(res))
    );
    
  }


}
