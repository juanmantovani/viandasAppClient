import { Category } from "../../models/Category";
import { BaseResponse } from "../BaseResponse";

export class GetCategoryResponse extends BaseResponse{
    categories : Category[];

    constructor(data : any) {
        super(data);
        if(data)
            this.categories = data.map((c:any) => new Category(c));

      }
}