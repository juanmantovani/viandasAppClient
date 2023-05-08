import { Client } from "./Client";
import { DayOrder } from "./DayOrder";
import { StatusOrder } from "./StatusOrder";

export class Order {
    id: number;
    client: Client;
    date: Date;
    daysOrder: DayOrder[];
    observation: string;
    total: number;
    status: StatusOrder;
    paid : boolean;

    discount?: number;
    delivery?: number;
    subTotal?: number;

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.client = new Client(data.client);
            this.date = new Date(data.date);
            this.daysOrder = data.daysOrder.map((d: any) => new DayOrder(d));
            this.observation = data.observation;
            this.total = data.total;
            this.status = new StatusOrder(data.status);
            this.paid = data.paid;
        }
    }
}