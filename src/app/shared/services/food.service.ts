import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AddFoodRequest } from '../dto/food/AddFoodRequest';
import { AddFoodResponse } from '../dto/food/AddFoodResponse';
import { DeleteFoodRequest } from '../dto/food/DeleteFoodRequest';
import { DeleteFoodResponse } from '../dto/food/DeleteFoodResponse';
import { EditFoodRequest } from '../dto/food/EditFoodRequest';
import { EditFoodResponse } from '../dto/food/EditFoodResponse';
import { GetFoodByCategoryRequest } from '../dto/food/GetFoodByCategoryRequest';
import { GetFoodResponse } from '../dto/food/GetFoodResponse';
import { GetImageByCategoryRequest } from '../dto/food/GetImageByCategoryRequest';
import { GetImageByCategoryResponse } from '../dto/food/GetImageByCategoryResponse';
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

  getFoodByCategory(request : GetFoodByCategoryRequest) : Observable<GetFoodResponse> {
    let params = new HttpParams();
    params = params.set('idCategory', request.idCategory?.toString());

    return this.http.get<GetFoodResponse>(ROUTES.API_ROUTES.FOOD.GETFOODBYCATEGORY, { params }).pipe(
   map((res: any) => {
     return new GetFoodResponse(res);
   })
 )
} 

formatStringCategories(categories : Category[]){
  var stringFormat = "";

  categories.forEach(c => {
    if(c.checked){
      if(stringFormat == "")
      stringFormat = c.id.toString();
      else
      stringFormat += ", " + c.id.toString();
  }
  })

  return stringFormat
}

  addFood(request: AddFoodRequest) : Observable<AddFoodResponse> {
    var formData = new FormData();
    formData.append('image', request.food.image);
    formData.append('title', request.food.title);
    if(request.food.description != null)
      formData.append('description', request.food.description);
    formData.append('categories',  this.formatStringCategories(request.food.categories));
    
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
    formData.append('categories',  this.formatStringCategories(request.food.categories));
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

  getImageByCategory(request : GetImageByCategoryRequest) : Observable<GetImageByCategoryResponse> {
    let params = new HttpParams();
    params = params.set('idCategory', request.idCategory?.toString());

    return this.http.get<GetImageByCategoryResponse>(ROUTES.API_ROUTES.FOOD.GETIMAGEBYCATEGORY, { params }).pipe(
   map((res: any) => {
     return new GetImageByCategoryResponse(res);
   })
 )
} 

}
