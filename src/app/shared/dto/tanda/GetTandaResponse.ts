import { Tanda } from "../../models/Tanda";
import { BaseResponse } from "../BaseResponse";

export class GetTandaResponse extends BaseResponse{
    tanda: Tanda[];

    constructor(data : any) {
        super(data);
        if(data)
            this.tanda = data.map((t:any) => new Tanda(t));

      }
}
