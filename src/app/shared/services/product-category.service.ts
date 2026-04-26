import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddProductCategoryRequest } from '../dto/productCategory/AddProductCategoryRequest';
import { AddProductCategoryResponse } from '../dto/productCategory/AddProductCategoryResponse';
import { DeleteProductCategoryRequest } from '../dto/productCategory/DeleteProductCategoryRequest';
import { DeleteProductCategoryResponse } from '../dto/productCategory/DeleteProductCategoryResponse';
import { EditProductCategoryRequest } from '../dto/productCategory/EditProductCategoryRequest';
import { EditProductCategoryResponse } from '../dto/productCategory/EditProductCategoryResponse';
import { GetProductCategoryResponse } from '../dto/productCategory/GetProductCategoryResponse';
import * as ROUTES from '../routes/index.routes';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private http: HttpClient) {}
  OPTION = { headers: { 'Content-Type': 'application/json' } };

  getProductCategories(): Observable<GetProductCategoryResponse> {
    return this.http.get<any>(ROUTES.API_ROUTES.PRODUCT_CATEGORY.GETPRODUCTCATEGORIES).pipe(
      map(res => new GetProductCategoryResponse(res))
    );
  }

  addProductCategory(request: AddProductCategoryRequest): Observable<AddProductCategoryResponse> {
    return this.http.post<any>(ROUTES.API_ROUTES.PRODUCT_CATEGORY.ADDPRODUCTCATEGORY, JSON.stringify(request), this.OPTION).pipe(
      map(res => new AddProductCategoryResponse(res))
    );
  }

  editProductCategory(request: EditProductCategoryRequest): Observable<EditProductCategoryResponse> {
    return this.http.put<any>(ROUTES.API_ROUTES.PRODUCT_CATEGORY.EDITPRODUCTCATEGORY, JSON.stringify(request), this.OPTION).pipe(
      map(res => new EditProductCategoryResponse(res))
    );
  }

  deleteProductCategory(request: DeleteProductCategoryRequest): Observable<DeleteProductCategoryResponse> {
    const params = new HttpParams().set('idProductCategory', request.idProductCategory.toString());
    return this.http.delete<any>(ROUTES.API_ROUTES.PRODUCT_CATEGORY.DELETEPRODUCTCATEGORY, { params }).pipe(
      map(res => new DeleteProductCategoryResponse(res))
    );
  }
}
