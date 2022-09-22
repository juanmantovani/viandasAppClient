import { TurnViewer } from "./TurnViewer";

export class MenuViewer{
    id: number;
    turnsViewer : TurnViewer[]

    constructor(data : any){
        if(data){
            this.id = data.id
            this.turnsViewer = data.turnsViewer.map((t:any) => new TurnViewer(t));
        }
    }
}