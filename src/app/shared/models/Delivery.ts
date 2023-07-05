import { Address } from "./Address";
import { Client } from "./Client";

export class Delivery {
    id: number;
    date: Date;
    idOrder: number;
    price: number
    client: Client
    address: Address;

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.date = new Date(data.date);
            this.idOrder = data.idOrder;
            this.price = data.price;
            this.client = new Client(data.client);
            this.address = new Address(data.address);
        }
    }
}