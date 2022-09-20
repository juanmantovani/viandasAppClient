import { Day } from "./Day";

export class Menu {
    turnId: number;
    days: Day[];
 

    constructor(data:any) {
        if (data) {
          this.turnId = data.turnId;
          this.days = data.days.map((f:any) => new Day(f));
        }
      }
}