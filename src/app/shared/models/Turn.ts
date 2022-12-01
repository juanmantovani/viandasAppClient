import { DayFood } from "./DayFood";

export class Turn{
    id: number;
    days: DayFood[];
    description: string;

    constructor(data:any) {
        if (data) {
          this.id = data.id;
          this.description = data.description;
        if (data.days){
          this.days = data.days.map((d:any) => new DayFood(d));
        }
        }
        
      }
}