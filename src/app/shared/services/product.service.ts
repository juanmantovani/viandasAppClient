import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddProductRequest } from '../dto/product/AddProductRequest';
import { AddProductResponse } from '../dto/product/AddProductResponse';
import { DeleteProductRequest } from '../dto/product/DeleteProductRequest';
import { DeleteProductResponse } from '../dto/product/DeleteProductResponse';
import { EditProductRequest } from '../dto/product/EditProductRequest';
import { EditProductResponse } from '../dto/product/EditProductResponse';
import { GetProductResponse } from '../dto/product/GetProductResponse';
import * as ROUTES from '../routes/index.routes';

export type ProductOrderStatus = 'pendiente' | 'entregado';

export interface ProductOrderRow {
  id: number;
  clientName: string;
  clientLastName: string;
  productCategoryTitle: string;
  productTitle: string;
  cant: number;
  date: string;
  status: ProductOrderStatus;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}
  OPTION = { headers: { 'Content-Type': 'application/json' } };

  // ── Productos ──────────────────────────────────────────────────────────────

  getProducts(): Observable<GetProductResponse> {
    return this.http.get<any>(ROUTES.API_ROUTES.PRODUCT.GETPRODUCTS).pipe(
      map(res => new GetProductResponse(res))
    );
  }

  addProduct(request: AddProductRequest): Observable<AddProductResponse> {
    return this.http.post<any>(ROUTES.API_ROUTES.PRODUCT.ADDPRODUCT, JSON.stringify(request), this.OPTION).pipe(
      map(res => new AddProductResponse(res))
    );
  }

  editProduct(request: EditProductRequest): Observable<EditProductResponse> {
    return this.http.put<any>(ROUTES.API_ROUTES.PRODUCT.EDITPRODUCT, JSON.stringify(request), this.OPTION).pipe(
      map(res => new EditProductResponse(res))
    );
  }

  deleteProduct(request: DeleteProductRequest): Observable<DeleteProductResponse> {
    const params = new HttpParams().set('idProduct', request.idProduct.toString());
    return this.http.delete<any>(ROUTES.API_ROUTES.PRODUCT.DELETEPRODUCT, { params }).pipe(
      map(res => new DeleteProductResponse(res))
    );
  }

  // ── Pedidos ────────────────────────────────────────────────────────────────

  getAllProductOrders(): Observable<ProductOrderRow[]> {
    return this.http.get<any>(ROUTES.API_ROUTES.PRODUCT_ORDER.GETALLPRODUCTORDERS).pipe(
      map(res => res.productOrders as ProductOrderRow[])
    );
  }

  getProductOrdersByDate(date: Date): Observable<ProductOrderRow[]> {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const params = new HttpParams().set('date', d.toISOString());
    return this.http.get<any>(ROUTES.API_ROUTES.PRODUCT_ORDER.GETPRODUCTORDERSBYDATE, { params }).pipe(
      map(res => res.productOrders as ProductOrderRow[])
    );
  }

  updateOrderStatus(id: number, status: ProductOrderStatus): Observable<void> {
    const params = new HttpParams()
      .set('idProductOrder', id.toString())
      .set('status', status);
    return this.http.get<any>(ROUTES.API_ROUTES.PRODUCT_ORDER.UPDATEPRODUCTORDERSTATUS, { params }).pipe(
      map(() => undefined)
    );
  }

  addProductOrders(rows: Omit<ProductOrderRow, 'id'>[]): Observable<ProductOrderRow[]> {
    return this.http.post<any>(ROUTES.API_ROUTES.PRODUCT_ORDER.ADDPRODUCTORDERS, JSON.stringify(rows), this.OPTION).pipe(
      map(res => res.productOrders as ProductOrderRow[])
    );
  }
}
