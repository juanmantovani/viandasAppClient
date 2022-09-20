import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { GetCategoryResponse } from '../dto/category/GetCategoryResponse';
import { AddFoodRequest } from '../dto/food/AddFoodRequest';
import { AddFoodResponse } from '../dto/food/AddFoodResponse';
import { DeleteFoodRequest } from '../dto/food/DeleteFoodRequest';
import { DeleteFoodResponse } from '../dto/food/DeleteFoodResponse';
import { EditFoodRequest } from '../dto/food/EditFoodRequest';
import { EditFoodResponse } from '../dto/food/EditFoodResponse';
import { GetFoodResponse } from '../dto/food/GetFoodResponse';
import { Category } from '../models/Category';
import  * as ROUTES  from '../routes/index.routes'

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) {}

  getFood(): Observable<GetFoodResponse> {
       return this.http.get<GetFoodResponse>(ROUTES.API_ROUTES.FOOD.GETFOOD).pipe(
      map((res: any) => {
        return new GetFoodResponse(res);
      })
    )
  }

  getCategories(): Observable<GetCategoryResponse> {
    return this.http.get<GetCategoryResponse>(ROUTES.API_ROUTES.CATEGORY.GETCATEGORY).pipe(
   map((res: any) => {
     
     return new GetCategoryResponse(res);
   })
 )
}

  addFood(request: AddFoodRequest) : Observable<AddFoodResponse> {
    var formData = new FormData();
    formData.append('image', request.food.image);
    formData.append('title', request.food.title);
    formData.append('description', request.food.description);
    formData.append('category', request.food.category.id.toString());

    return this.http.post<AddFoodResponse>(ROUTES.API_ROUTES.FOOD.UPLOADFOOD, formData).pipe(
      tap (res => 
        new AddFoodResponse(res))
    );
  }

  editFood(request: EditFoodRequest) : Observable<EditFoodResponse> {
    var formData = new FormData();
    formData.append('image', request.food.image);
    formData.append('title', request.food.title);
    formData.append('description', request.food.description);
    formData.append('category', request.food.category.id.toString());
    formData.append('id', request.food.id.toString());

    return this.http.put<EditFoodResponse>(ROUTES.API_ROUTES.FOOD.EDITFOOD, formData).pipe(
      tap (res => new EditFoodResponse(res))
    );
  }

  deleteFood(request: DeleteFoodRequest): Observable<DeleteFoodResponse> {
    let params = new HttpParams();
    params = params.set('idFood', request.idFood?.toString());

    return this.http.delete<DeleteFoodResponse>(ROUTES.API_ROUTES.FOOD.DELETEFOOD, {params}).pipe(
    tap (res => new DeleteFoodResponse(res))
    );
  }

}