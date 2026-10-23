import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AddProductRequest } from '../dto/product/AddProductRequest';
import { AddProductResponse } from '../dto/product/AddProductResponse';
import { DeleteProductRequest } from '../dto/product/DeleteProductRequest';
import { DeleteProductResponse } from '../dto/product/DeleteProductResponse';
import { EditProductRequest } from '../dto/product/EditProductRequest';
import { EditProductResponse } from '../dto/product/EditProductResponse';
import { GetProductResponse } from '../dto/product/GetProductResponse';
import * as ROUTES from '../routes/index.routes';

export type ProductOrderStatus = 'pending' | 'entregado';

export interface ProductOrderItem {
  id?: number;
  productTitle: string;
  productCategoryTitle: string;
  cant: number;
  status: ProductOrderStatus;
}

export interface ProductOrder {
  id: number;
  clientName: string;
  clientLastName: string;
  date: string;
  products: ProductOrderItem[];
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

  getProductsAdmin(): Observable<GetProductResponse> {
    return this.http.get<any>(ROUTES.API_ROUTES.PRODUCT.GETPRODUCTSADMIN).pipe(
      map(res => new GetProductResponse(res))
    );
  }

  addProduct(request: AddProductRequest): Observable<AddProductResponse> {
    const formData = new FormData();
    if (request.product.image)
      formData.append('image', request.product.image);
    formData.append('title', request.product.title);
    if (request.product.description != null)
      formData.append('description', request.product.description);
    formData.append('price', request.product.price.toString());
    formData.append('available', request.product.available.toString());
    formData.append('productCategoryId', request.product.productCategoryId.toString());

    return this.http.post<any>(ROUTES.API_ROUTES.PRODUCT.ADDPRODUCT, formData).pipe(
      map(res => new AddProductResponse(res))
    );
  }

  editProduct(request: EditProductRequest): Observable<EditProductResponse> {
    const formData = new FormData();
    formData.append('id', request.product.id.toString());
    if (request.product.image)
      formData.append('image', request.product.image);
    formData.append('title', request.product.title);
    if (request.product.description != null)
      formData.append('description', request.product.description);
    formData.append('price', request.product.price.toString());
    formData.append('available', request.product.available.toString());
    formData.append('productCategoryId', request.product.productCategoryId.toString());

    return this.http.put<any>(ROUTES.API_ROUTES.PRODUCT.EDITPRODUCT, formData).pipe(
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

  getAllProductOrders(): Observable<ProductOrder[]> {
    return this.http.get<any>(ROUTES.API_ROUTES.PRODUCT_ORDER.GETALLPRODUCTORDERS).pipe(
      map(res => res.productOrders as ProductOrder[])
    );
  }

  getProductOrdersByDate(date: Date): Observable<ProductOrder[]> {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const params = new HttpParams().set('date', d.toISOString());
    return this.http.get<any>(ROUTES.API_ROUTES.PRODUCT_ORDER.GETPRODUCTORDERSBYDATE, { params }).pipe(
      map(res => res.productOrders as ProductOrder[]),
      catchError(err => err.status === 404 ? of([]) : throwError(() => err))
    );
  }

  updateOrderItemStatus(idItem: number, status: ProductOrderStatus): Observable<void> {
    const params = new HttpParams()
      .set('idProductOrderItem', idItem.toString())
      .set('status', status);
    return this.http.get<any>(ROUTES.API_ROUTES.PRODUCT_ORDER.UPDATEPRODUCTORDERITEMSTATUS, { params }).pipe(
      map(() => undefined)
    );
  }

  addProductOrder(order: Omit<ProductOrder, 'id'>): Observable<ProductOrder> {
    return this.http.post<any>(ROUTES.API_ROUTES.PRODUCT_ORDER.ADDPRODUCTORDER, JSON.stringify(order), this.OPTION).pipe(
      map(res => res.productOrder as ProductOrder)
    );
  }

  deleteProductOrder(id: number): Observable<void> {
    const params = new HttpParams().set('idProductOrder', id.toString());
    return this.http.delete<any>(ROUTES.API_ROUTES.PRODUCT_ORDER.DELETEPRODUCTORDER, { params }).pipe(
      map(() => undefined)
    );
  }
}
