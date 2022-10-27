import { TurnViewer } from "./TurnViewer";

export class MenuViewer{
    dateStart: Date;
    dateEnd: Date;
    id: number;
    turnsViewer : TurnViewer[]

    constructor(data : any){
        if(data){
            this.dateStart = new Date(data.dateStart);
            this.dateEnd = new Date(data.dateEnd);
            this.id = data.id
            this.turnsViewer = data.turnsViewer.map((t:any) => new TurnViewer(t));
        }
    }
}