import { DayFood } from "../../models/DayFood";
import { BaseResponse } from "../BaseResponse";

export class GetDayResponse extends BaseResponse{
days : DayFood[];

constructor(data : any) {
    super(data);
    if(data)
        this.days = data.map((d:any) => new DayFood(d));

  }
}