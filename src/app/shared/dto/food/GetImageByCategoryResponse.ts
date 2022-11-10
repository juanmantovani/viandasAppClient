import { FoodViewer } from "../../models/FoodViewer";
import { BaseResponse } from "../BaseResponse";

export class GetImageByCategoryResponse extends BaseResponse{
    foodViewer: FoodViewer[];


    constructor(data : any) {
        super(data);
        if(data)
            this.foodViewer = data.map((f:any) => new FoodViewer(f));

      }  
}