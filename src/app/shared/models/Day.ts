import { Food } from "./Food";

export class Day {
    food: Food;
    date: Date;

 
    constructor(data:any) {
        if (data) {
          this.food = new Food(data.food);
          this.date = new Date(data?.date);
        }
      }
}