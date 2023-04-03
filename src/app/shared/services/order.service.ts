import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddOrderRequest } from '../dto/order/AddOrderRequest';
import { AddOrderResponse } from '../dto/order/AddOrderResponse';
import * as ROUTES from '../routes/index.routes'
import { map, Observable, tap } from 'rxjs';
import { GetOrderViewerResponse } from '../dto/order/GetOrderViewerResponse';
import { GetOrderByIdResponse } from '../dto/order/GetOrderByIdResponse';
import { Order } from '../models/Order';
import { Client } from '../models/Client';
import { DayOrder } from '../models/DayOrder';
import { DayFood } from '../models/DayFood';
import { Food } from '../models/Food';
import { EditDayOrderAddressRequest } from '../dto/order/EditDayOrderAddressRequest';
import { EditDayOrderAddressResponse } from '../dto/order/EditDayOrderAddressResponse';
import { GetOrdersRequest } from '../dto/order/GetOrdersRequest';
import { GetOrdersResponse } from '../dto/order/GetOrdersResponse';
import { GetMenuResponse } from '../dto/menu/getMenuResponse';
import { GetAllOrdersResponse } from '../dto/order/GetAllOrdersResponse';
import { GetAllOrdersRequest } from '../dto/order/GetAllOrdersRequest';
import { DeleteOrderRequest } from '../dto/order/DeleteOrderRequest';
import { PaidOrderRequest } from '../dto/order/PaidOrderRequest';
import { DeleteOrderResponse } from '../dto/order/DeleteOrderResponse';
import { PaidOrderResponse } from '../dto/order/PaidOrderResponse';



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  OPTION = { headers: { 'Content-Type': 'application/json' } };


  addOrder(request: AddOrderRequest): Observable<AddOrderResponse> {
    return this.http.post<AddOrderResponse>(ROUTES.API_ROUTES.ORDER.ADDORDER, JSON.stringify(request), this.OPTION).pipe(
      tap(res => {
        new AddOrderResponse(res);
      }))
  }

  getOrderViewer(): Observable<GetOrderViewerResponse> {
    return this.http.get<GetOrderViewerResponse>(ROUTES.API_ROUTES.ORDER.GETORDERVIEWER).pipe(
      map((res: any) => {
        return new GetOrderViewerResponse(res);
      })
    )
  }

  getOrderViewerByClient(idClient: number): Observable<GetOrderViewerResponse> {
    let params = new HttpParams();
    params = params.set('idClient', idClient?.toString());
    return this.http.get<GetOrderViewerResponse>(ROUTES.API_ROUTES.ORDER.GETORDERSBYCLIENT, { params }).pipe(
      map((res: any) => {
        return new GetOrderViewerResponse(res);
      })
    )
  }

  getOrders(request: GetOrdersRequest): Observable<GetOrdersResponse> {
    return this.http.post<GetOrdersResponse>(ROUTES.API_ROUTES.ORDER.GETORDERS, JSON.stringify(request), this.OPTION).pipe(
      map((res: any) => {
        return new GetOrdersResponse(res.getOrdersResponse);
      })
    )
  }

  getAllOrders(request : GetAllOrdersRequest): Observable<GetAllOrdersResponse> {
    console.log(request)
    return this.http.post<GetAllOrdersResponse>(ROUTES.API_ROUTES.ORDER.GETALLORDERS, JSON.stringify(request),this.OPTION).pipe(
      map((res: any) => {
        return new GetAllOrdersResponse(res);
      })
    )
  }

  getOrderById(idOrder: number): Observable<GetOrderByIdResponse> {
    let params = new HttpParams();
    params = params.set('idOrder', idOrder?.toString());
    return this.http.get<GetOrderByIdResponse>(ROUTES.API_ROUTES.ORDER.GETORDERBYID, { params }).pipe(
      map((res: any) => {
        var daysOrderArray: DayOrder[] = [];
        res.daysOrder.forEach((dayOrder: any) => {
          var dayFood = {
            category: dayOrder.category,
            date: dayOrder.date,
            food: new Food(dayOrder.food),
          }
          var daysOrder = {
            id: dayOrder.id,
            observation: dayOrder.observation,
            address: dayOrder.address,
            cant: dayOrder.cant,
            dayFood: new DayFood(dayFood)
          }
          daysOrderArray.push(new DayOrder(daysOrder))
        });
        var order: Order = {
          client: new Client(res.client),
          date: res.date,
          id: res.id,
          observation: res.observation,
          total: res.total,
          daysOrder: daysOrderArray
        };
        return new GetOrderByIdResponse(order);
      })
    )
  }

  editDayOrderAddress(request: EditDayOrderAddressRequest): Observable<EditDayOrderAddressResponse> {
    let params = new HttpParams();
    params = params.set('idAddress', request.idAddress.toString());
    params = params.set('idDayOrder', request.idDayOrder.toString());
    return this.http.get<EditDayOrderAddressResponse>(ROUTES.API_ROUTES.ORDER.EDITDAYORDERADDRESS, { params }).pipe(
      tap(res => new EditDayOrderAddressResponse(res))
    );
  }

  deleteOrder(request : DeleteOrderRequest): Observable<DeleteOrderResponse>{
    let params = new HttpParams();
    params = params.set('idOrder', request.idOrder.toString());
    return this.http.get<PaidOrderResponse>(ROUTES.API_ROUTES.ORDER.PAIDORDER, { params }).pipe(
      tap(res => new PaidOrderResponse(res))
    );
  }

  paidOrder(request : PaidOrderRequest): Observable<PaidOrderResponse>{
    let params = new HttpParams();
    params = params.set('idOrder', request.idOrder.toString());
    return this.http.get<PaidOrderResponse>(ROUTES.API_ROUTES.ORDER.CANCELORDER, { params }).pipe(
      tap(res => new PaidOrderResponse(res))
    );
  }


}
