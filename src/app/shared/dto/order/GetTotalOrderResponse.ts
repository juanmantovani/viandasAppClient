import { BaseResponse } from "../BaseResponse";

export class GetTotalOrderResponse extends BaseResponse {
    total: number;
    discount: number;
    delivery: number;
    subTotal: number;
    constructor(data: any) {
        super(data);
        if (data) {
            this.total = data.total;
            this.discount = data.discount;
            this.delivery = data.delivery;
            this.subTotal = data.subTotal;
        }
    }
}