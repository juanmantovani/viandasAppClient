import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddAddressRequest } from '../dto/address/AddAddressRequest';
import { AddAddressResponse } from '../dto/address/AddAddressResponse';
import  * as ROUTES  from '../routes/index.routes'
import { map, Observable, tap } from 'rxjs';
import { EditAddressRequest } from '../dto/address/EditAddressRequest';
import { EditAddressResponse } from '../dto/address/EditAddressResponse';



@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(private http: HttpClient) { }

  OPTION = {headers: {'Content-Type': 'application/json'}};

  addAddress(request: AddAddressRequest) : Observable<AddAddressResponse> { 
    console.log(JSON.stringify(request))   
    return this.http.post<AddAddressResponse>(ROUTES.API_ROUTES.ADDRESS.ADDADDRESS, JSON.stringify(request), this.OPTION ).pipe(
      map (res => new AddAddressResponse(res)))
  }
  
  editAddress(request: EditAddressRequest) : Observable<EditAddressResponse>{
    return this.http.put<EditAddressResponse>(ROUTES.API_ROUTES.ADDRESS.EDITADDRESS, JSON.stringify(request), this.OPTION ).pipe(
      map (res => new EditAddressResponse(res)))
  }
}


