import { Order } from "../../models/Order";
import { BaseResponse } from "../BaseResponse";

export class GetOrderByIdResponse extends BaseResponse{
order : Order;

constructor(data : any) {
    super(data);
    if(data)
        this.order = new Order(data);

  }
}