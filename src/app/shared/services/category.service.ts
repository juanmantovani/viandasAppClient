import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import  * as ROUTES  from '../routes/index.routes'
import { GetCategoryResponse } from '../dto/category/GetCategoryResponse';
import { AddCategoryRequest } from '../dto/category/AddCategoryRequest';
import { AddCategoryResponse } from '../dto/category/AddCategoryResponse';
import { EditCategoryRequest } from '../dto/category/EditCategoryRequest';
import { EditCategoryResponse } from '../dto/category/EditCategoryResponse';
import { DeleteCategoryRequest } from '../dto/category/DeleteCategoryRequest';
import { DeleteCategoryResponse } from '../dto/category/DeleteCategoryResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<GetCategoryResponse> {
    return this.http.get<GetCategoryResponse>(ROUTES.API_ROUTES.CATEGORY.GETCATEGORY).pipe(
   map((res: any) => {
     
     return new GetCategoryResponse(res);
   })
 )
}

addCategory(request: AddCategoryRequest) : Observable<AddCategoryResponse> {
  var formData = new FormData();
  formData.append('image', request.category.image);
  formData.append('title', request.category.title);
  formData.append('price', request.category.price.toString());
  formData.append('description', request.category.description);

  return this.http.post<AddCategoryResponse>(ROUTES.API_ROUTES.CATEGORY.UPLOADCATEGORY, formData).pipe(
    tap (res => 
      new AddCategoryResponse(res))
  );
}

editCategory(request: EditCategoryRequest) : Observable<EditCategoryResponse> {
  var formData = new FormData();
  formData.append('image', request.category.image);
  formData.append('title', request.category.title);
  formData.append('price', request.category.price.toString());
  formData.append('description', request.category.description);
  formData.append('id', request.category.id.toString());


  return this.http.put<EditCategoryResponse>(ROUTES.API_ROUTES.CATEGORY.EDITCATEGORY, formData).pipe(
    tap (res => new EditCategoryResponse(res))
  );
}

deleteCategory(request: DeleteCategoryRequest): Observable<DeleteCategoryResponse> {
  let params = new HttpParams();
  params = params.set('idCategory', request.idCategory?.toString());

  return this.http.delete<DeleteCategoryResponse>(ROUTES.API_ROUTES.CATEGORY.DELETECATEGORY, {params}).pipe(
  tap (res => new DeleteCategoryResponse(res))
  );
}

}
