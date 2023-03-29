import { Order } from "../../models/Order";
import { BaseResponse } from "../BaseResponse";

export class GetAllOrdersResponse extends BaseResponse {
    order: Order[];

    constructor(data: any) {
        super(data);
        if (data)
            this.order = data.map((o: any) => new Order(o));
    }
}