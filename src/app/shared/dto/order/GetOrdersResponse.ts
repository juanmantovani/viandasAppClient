import { CategoryTable } from "../../models/CategoryTable";
import { TandaTable } from "../../models/TandaTable";
import { BaseResponse } from "../BaseResponse";

export class GetOrdersResponse extends BaseResponse {
    tandaTable: TandaTable[];
    categoryTable: CategoryTable[];

    constructor(data: any) {
        super(data);
        if (data) {
            if(data.tandaTable)
            this.tandaTable = data.tandaTable.map((t: TandaTable) => new TandaTable(t));
            if(data.categoryTable)
            this.categoryTable = data.categoryTable.map((c: CategoryTable) => new CategoryTable(c));
        }
    }
}
