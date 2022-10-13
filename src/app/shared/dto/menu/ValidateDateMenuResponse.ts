import { BaseResponse } from "../BaseResponse";

export class ValidateDateMenuResponse extends BaseResponse{
    validDateMenu  : Boolean

    constructor(data : any) {
        super(data);
        if(data)
            this.validDateMenu  = data.validDateMenu;
      }
}