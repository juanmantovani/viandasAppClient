import { Pathology } from "../../models/Pathology";
import { BaseResponse } from "../BaseResponse";

export class GetPathologyResponse extends BaseResponse{
    pathology : Pathology[];

    constructor(data : any) {
        super(data);
        if(data)
            this.pathology = data.map((p:any) => new Pathology(p));

      }
}