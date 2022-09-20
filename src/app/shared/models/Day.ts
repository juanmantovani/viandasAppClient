import { Food } from "./Food";

export class Day {
    food: Food[];
    date: Date;

 
    constructor(data:any) {
        if (data) {
          console.log(data)
          this.food = data.food.map((f:any) => new Food(f));
          this.date = new Date(data?.date);
        }
      }
}