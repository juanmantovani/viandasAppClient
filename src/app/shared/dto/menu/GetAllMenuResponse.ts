import { MenuList } from "../../models/MenuList";
import { BaseResponse } from "../BaseResponse";

export class GetAllMenuResponse extends BaseResponse{
    menuList: MenuList[];

    constructor(data : any) {
        super(data);
        if(data)
            this.menuList = data.map((m: any) => new MenuList(m));
            
    }
}