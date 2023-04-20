import { Address } from "./Address";
import { CategoryTable } from "./CategoryTable";
import { Client } from "./Client";
import { StatusOrder } from "./StatusOrder";

export class OrderTable {
    id: number;
    client: Client;
    observation: string;
    total: number;
    address: Address;
    categoryTable: CategoryTable[];
    paid: boolean;
    status: StatusOrder;
    date: Date

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.client = new Client(data.client);
            this.observation = data.observation;
            this.total = data.total;
            this.paid = data.paid;
            this.status = new StatusOrder(data.status);
            this.date = new Date(data.date)
            this.address = new Address(data.address);
            if (data.categoryTable)
                this.categoryTable = data.categoryTable.map((d: any) => new CategoryTable(d));
        }
    }
}