import { City } from "../../models/City";
import { BaseResponse } from "../BaseResponse";

export class GetCityResponse extends BaseResponse{
    cities : City[];

    constructor(data : any) {
        super(data);
        if(data)
            this.cities = data.map((c:any) => new City(c));

      }

}