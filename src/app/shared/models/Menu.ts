import { Turn } from "./Turn";

export class Menu {
    id : number;
    turns: Turn[];
    dateStart: Date;
    dateEnd: Date;
    isCurrent: boolean;
 
    constructor(data:any) {
        if (data) {
          this.id = data.id;
          this.turns = [];
          this.turns.push(new Turn(data.turn));
          //this.turns = data.turns.map((t:any) => new Turn(t));
          this.dateStart = new Date (data.dateStart);
          this.dateEnd = new Date (data.dateEnd);
          this.isCurrent = data.isCurrent;
        }
      }
}