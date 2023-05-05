import { Address } from "../../models/Address";
import { BaseResponse } from "../BaseResponse";

export class GetAddressTakeAwayResponse extends BaseResponse {
    address: Address

    constructor(data: any) {
        super(data);
        if (data)
            this.address = new Address(data);
    }
}