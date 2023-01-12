import { CategoryTable } from "./CategoryTable";
import { Order } from "./Order";
import { Tanda } from "./Tanda";

export class TandaTable{
    tanda : Tanda;
    categoryTable : CategoryTable;
    order : Order[];

    constructor(data:any) {
        if (data) {
            this.tanda = new Tanda(data.tanda);
            this.categoryTable = new CategoryTable(data.categoryTable);
            this.order = data.order.map((o:any) => new Order(o));
        }
    }
}