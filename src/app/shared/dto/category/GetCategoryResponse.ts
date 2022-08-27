import { Category } from "../../models/Category";
import { BaseResponse } from "../BaseResponse";

export class GetCategoryResponse extends BaseResponse{
    listCategories : Category[];

    constructor(data : any) {
        super(data);
        if(data)
            this.listCategories = data.map((c:any) => new Category(c));

      }
}