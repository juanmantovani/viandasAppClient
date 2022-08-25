import { Banner } from "../../models/Banner";
import { BaseResponse } from "../BaseResponse";

export class GetBannerResponse extends BaseResponse{
    banners: Banner[];

    constructor(data : any) {
        super(data);
        if(data)
            this.banners = data.map((b:any) => new Banner(b));

      }
}