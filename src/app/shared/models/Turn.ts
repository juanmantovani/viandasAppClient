import { Day } from "./Day";

export class Turn{
    id: number;
    days: Day[];

    constructor(data:any) {
        if (data) {
          this.id = data.id;
          this.days = data.days.map((d:any) => new Day(d));
        }
      }
}