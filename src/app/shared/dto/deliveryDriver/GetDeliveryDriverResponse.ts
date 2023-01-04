import { DeliveryDriver } from "../../models/DeliveryDriver";
import { BaseResponse } from "../BaseResponse";

export class GetDeliveryDriverResponse extends BaseResponse {
    deliveryDriver: DeliveryDriver[];

    constructor(data: any) {
        super(data);
        if (data.deliveryDriver)
            this.deliveryDriver = data.deliveryDriver.map((d: any) => new DeliveryDriver(d));

    }
}