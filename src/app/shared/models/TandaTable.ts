import { CategoryTable } from "./CategoryTable";
import { OrderTable } from "./OrderTable";
import { Tanda } from "./Tanda";

export class TandaTable{
    tanda : Tanda;
    categoryTable : CategoryTable[];
    order : OrderTable[];

    constructor(data:any) {
        if (data) {
            this.tanda = new Tanda(data.tanda);
            if(data.categoryTable)
                this.categoryTable = data.categoryTable.map((c:any) => new CategoryTable(c));
            if(data.order)
                this.order = data.order.map((o:any) => new OrderTable(o));
        }
    }
}