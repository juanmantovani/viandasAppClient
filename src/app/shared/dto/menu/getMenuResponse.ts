import { MenuViewer } from "../../models/MenuViewer";
import { TurnViewer } from "../../models/TurnViewer";
import { BaseResponse } from "../BaseResponse";

export class GetMenuResponse extends BaseResponse{
    menuViewer: MenuViewer;

    constructor(data : any) {
        super(data);
        if(data)
            this.menuViewer = new MenuViewer(data);
            //this.menuViewer.id = data.id;
            //this.menuViewer.turnsViewer = data.turnsViewer.map((t:any) => new TurnViewer(t));

      }
}