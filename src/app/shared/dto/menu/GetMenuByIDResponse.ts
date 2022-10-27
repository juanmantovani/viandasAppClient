import { MenuViewer } from "../../models/MenuViewer";
import { BaseResponse } from "../BaseResponse";

export class GetMenuByIDResponse extends BaseResponse{
    menuViewer: MenuViewer;

    constructor(data : any) {
        super(data);
        if(data)
            this.menuViewer = new MenuViewer(data);
            
    }
}