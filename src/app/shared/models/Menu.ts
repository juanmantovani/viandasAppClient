import { Turn } from "./Turn";

export class Menu {
    id : number;
    turns: Turn[];
 
    constructor(data:any) {
        if (data) {
          this.id = data.id;
          this.turns = data.days.map((t:any) => new Turn(t));
        }
      }
}