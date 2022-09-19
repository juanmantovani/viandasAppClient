import { Day } from "./Day";

export class Menu {
    turnId: number;
    days: Day[] = [];

 

    constructor(data:any) {
        if (data) {
          this.turnId = data.turnId;
          data.days.forEach ((day: Day) => this.days.push(day));

        }
      }
}