import { BaseResponse } from "../BaseResponse";
import { Address } from "../../models/Address";


export class GetAddressTakeAwayResponse extends BaseResponse {
    address: Address

    constructor(data: any) {
        super(data);
        if (data)
            this.address = new Address(data);

    }
}