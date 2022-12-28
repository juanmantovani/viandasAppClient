import { Client } from "../../models/Client";
import { BaseResponse } from "../BaseResponse";

export class GetClientResponse extends BaseResponse {
    client: Client[]

    constructor(data: any) {
        super(data);
        if (data)
            this.client = data.map((c: any) => new Client(c.client));

    }
}