import { Food } from "../../models/Food";
import { BaseResponse } from "../BaseResponse";

export class GetFoodResponse extends BaseResponse {
    food: Food[];

    constructor(data: any) {
        super(data);
        if (data)
            this.food = data.map((f: any) => new Food(f));

    }
}