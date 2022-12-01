import { Menu } from "../../models/Menu";
import { BaseResponse } from "../BaseResponse";

export class getMenuByCategoriesResponse extends BaseResponse{
menu : Menu;

constructor(data : any) {
    super(data);
    if(data)
        this.menu = new Menu(data);

  }
}