import { BaseResponse } from "../BaseResponse";
import { Discount } from "../../models/Discount";


export class GetDiscountResponse extends BaseResponse {
    discounts: Discount[]

    constructor(data: any) {
        super(data);
        if (data)
            this.discounts = data.map((d: any) => new Discount(d));

    }
}