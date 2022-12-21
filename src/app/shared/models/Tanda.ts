import { Address } from "./Address";
import { DeliveryDriver } from "./DeliveryDriver";

export class Tanda {
    id: number;
    hourStart: number;
    hourEnd: number;
    description: string;
    deliveryDriver: DeliveryDriver;
    addresses: Address[];

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.hourStart = data.hourStart;
            this.hourEnd = data.hourEnd;
            this.description = data.description;
            this.deliveryDriver = new DeliveryDriver(data.deliveryDriver)
            this.addresses = data.addresses?.map((a: any) => new Address(a));
        }
    }
}