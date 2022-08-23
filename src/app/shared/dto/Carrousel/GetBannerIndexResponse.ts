import { BaseResponse } from "../BaseResponse";

export class GetBannerIndexResponse extends BaseResponse{
    urlImage: string[];

    constructor(data : any) {
        super(data);
        if(data)
            this.urlImage = data;

      }
}