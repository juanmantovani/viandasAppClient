import { BaseResponse } from "../BaseResponse";

export class GetReportByDeliveryResponse extends BaseResponse {
    path: string;

    constructor(data: any) {
        super(data);
        if (data)
            this.path = data.path;
    }
}