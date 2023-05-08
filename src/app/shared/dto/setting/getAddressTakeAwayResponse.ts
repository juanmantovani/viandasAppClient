import { BaseResponse } from "../BaseResponse";
import { Address } from "../../models/Address";


export class getAddressTakeAwayResponse extends BaseResponse {
    address: Address

    constructor(data: any) {
        super(data);
        if (data)
            this.address = new Address(data);

    }
}