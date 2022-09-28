import { Food } from "./Food";

export class Day {
    id : number;
    food: Food;
    date: Date;

 
    constructor(data:any) {
        if (data) {
          this.id = data.id
          this.food = new Food(data.food);
          this.date = new Date(data?.date);
        }
      }
}