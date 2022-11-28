import { Menu } from "../../models/Menu";
import { BaseResponse } from "../BaseResponse";

export class GetAllMenuResponse extends BaseResponse{
    menu: Menu[];

    constructor(data : any) {
        super(data);
        if(data)
            this.menu = data.map((m: any) => new Menu(m));
            
    }
}