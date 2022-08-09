import { Banner } from "../../models/Banner";
import { BaseResponse } from "../BaseResponse";

export class AgregarBannerResponse extends BaseResponse{
    banner: Banner;
    constructor(data:any) {
      super(data);
      if (data?.Banner)
        this.banner = new Banner(data.Banner);
    }
}