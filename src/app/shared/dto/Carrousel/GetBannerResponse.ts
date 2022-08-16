import { Banner } from "../../models/Banner";
import { BaseResponse } from "../BaseResponse";

export class GetBannerResponse extends BaseResponse{
    banners: Banner[];

    constructor(data : any) {
        super(data);
        if(data?.listBanner)
              this.banners = data.banners.map((b:any) => new Banner(b));

      }
}