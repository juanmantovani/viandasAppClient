import { BaseResponse } from "../BaseResponse";

export class AddOrderResponse extends BaseResponse {
    idOrder: number;
    constructor(data:any) {
        super(data);
        if(data){
            this.idOrder = data.idOrder;
        }
    }
}