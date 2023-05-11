import { CategoryTable } from "../../models/CategoryTable";
import { BaseResponse } from "../BaseResponse";

export class AddOrderResponse extends BaseResponse {
    idOrder: number;
    cantDelivery: number;
    categories: CategoryTable[];
    total: number;
    constructor(data:any) {
        super(data);
        if(data){
            this.idOrder = data.idOrder;
            this.cantDelivery = data.cantDelivery;
            this.categories = data.categories.map((c : any) => new CategoryTable(c));
            this.total = data.total;

        }
    }
}