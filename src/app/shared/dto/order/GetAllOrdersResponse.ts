import { OrderTable } from "../../models/OrderTable";
import { BaseResponse } from "../BaseResponse";

export class GetAllOrdersResponse extends BaseResponse {
    order: OrderTable[];

    constructor(data: any) {
        super(data);
        if (data)
            this.order = data.map((o: any) => new OrderTable(o));
    }
}