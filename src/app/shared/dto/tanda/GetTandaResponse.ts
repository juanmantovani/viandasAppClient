import { Tanda } from "../../models/Tanda";
import { BaseResponse } from "../BaseResponse";

export class GetTandaResponse extends BaseResponse{
    tanda: Tanda[];

    constructor(data : any) {
        super(data);
        if(data.tanda)
            this.tanda = data.tanda.map((t:any) => new Tanda(t));

      }
}
