import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddAddressRequest } from '../dto/address/AddAddressRequest';
import { AddAddressResponse } from '../dto/address/AddAddressResponse';
import  * as ROUTES  from '../routes/index.routes'
import { map, Observable, tap } from 'rxjs';
import { EditAddressRequest } from '../dto/address/EditAddressRequest';
import { EditAddressResponse } from '../dto/address/EditAddressResponse';
import { DeleteAddressRequest } from '../dto/address/DeleteAddressRequest';
import { DeleteAddressResponse } from '../dto/address/DeleteAddressResponse';
import { SetFavouriteAddressRequest } from '../dto/address/SetFavouriteAddressRequest';
import { SetFavouriteAddressResponse } from '../dto/address/SetFavouriteAddressResponse';
import { GetAddressTakeAwayResponse } from '../dto/setting/GetAddressTakeAwayResponse';



@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(private http: HttpClient) { }

  OPTION = {headers: {'Content-Type': 'application/json'}};

  addAddress(request: AddAddressRequest) : Observable<AddAddressResponse> { 
    return this.http.post<AddAddressResponse>(ROUTES.API_ROUTES.ADDRESS.ADDADDRESS, JSON.stringify(request), this.OPTION ).pipe(
      map (res => new AddAddressResponse(res)))
  }
  
  editAddress(request: EditAddressRequest) : Observable<EditAddressResponse>{
    return this.http.put<EditAddressResponse>(ROUTES.API_ROUTES.ADDRESS.EDITADDRESS, JSON.stringify(request), this.OPTION ).pipe(
      map (res => new EditAddressResponse(res)))
  }

  deleteAddress(request: DeleteAddressRequest): Observable<DeleteAddressResponse> {
    let params = new HttpParams();
    params = params.set('idAddress', request.idAddress?.toString());
  
    return this.http.delete<DeleteAddressResponse>(ROUTES.API_ROUTES.ADDRESS.DELETEADDRESS, {params}).pipe(
    tap (res => new DeleteAddressResponse(res))
    );
  }

  setFavouriteAddress(request: SetFavouriteAddressRequest): Observable<SetFavouriteAddressResponse>{
    return this.http.post<SetFavouriteAddressResponse>(ROUTES.API_ROUTES.ADDRESS.SETFAVOURITEADDRESS, JSON.stringify(request), this.OPTION ).pipe(
      map (res => new SetFavouriteAddressResponse(res)))
  }

  getAddressTakeAway():Observable<GetAddressTakeAwayResponse>{
    return this.http.get<GetAddressTakeAwayResponse>(ROUTES.API_ROUTES.SETTING.GETADDRESSTAKEAWAY).pipe(
      map((res:any) => {
        return new GetAddressTakeAwayResponse(res);
      })
    )
  }
}


