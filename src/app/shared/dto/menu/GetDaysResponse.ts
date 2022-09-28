import { Day } from "../../models/Day";
import { BaseResponse } from "../BaseResponse";

export class GetDayResponse extends BaseResponse{
days : Day[];

constructor(data : any) {
    super(data);
    if(data)
        this.days = data.map((d:any) => new Day(d));

  }
}