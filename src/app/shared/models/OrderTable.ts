import { Address } from "./Address";
import { CategoryTable } from "./CategoryTable";
import { Client } from "./Client";
import { DayOrder } from "./DayOrder";

export class OrderTable {
    id: number;
    client: Client;
    observation: string;
    total: number;
    address: Address;
    categoryTable: CategoryTable[];

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.client = new Client(data.client);
            this.observation = data.observation;
            this.total = data.total;
            this.address = new Address(data.address);
            if (data.categoryTable)
                this.categoryTable = data.categoryTable.map((d: any) => new CategoryTable(d));
        }
    }
}