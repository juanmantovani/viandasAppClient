import { BaseResponse } from "../BaseResponse";

export class GetTotalOrderResponse extends BaseResponse {
    total: number;
    constructor(data:any) {
        super(data);
        if(data){
            this.total = data.total;
        }
    }
}