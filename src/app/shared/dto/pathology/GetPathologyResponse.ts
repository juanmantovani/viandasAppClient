import { Pathology } from "../../models/Pathology";
import { BaseResponse } from "../BaseResponse";

export class GetPathologyResponse extends BaseResponse{
    pathologies : Pathology[];

    constructor(data : any) {
        super(data);
        if(data)
            this.pathologies = data.map((p:any) => new Pathology(p));

      }
}