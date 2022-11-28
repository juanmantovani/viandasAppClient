import { Client } from "../../models/Client";
import { BaseResponse } from "../BaseResponse";

export class GetClientByIdUserResponse extends BaseResponse{
    client : Client;

    constructor(data : any) {
        super(data);
        if(data)
            this.client = new Client(data.client);

      }
}