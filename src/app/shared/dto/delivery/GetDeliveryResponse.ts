import { DeliveryDriver } from "../../models/DeliveryDriver";
import { BaseResponse } from "../BaseResponse";

export class GetDeliveryResponse extends BaseResponse {
    deliveryDriver: DeliveryDriver[];

    constructor(data: any) {
        super(data);
        if (data)
            this.deliveryDriver = data.map((d: any) => new DeliveryDriver(d.deliveryDriver));
    }
}