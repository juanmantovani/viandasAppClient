import { Category } from "./Category";
import { Food } from "./Food";

export class Day {
    id : number;
    food: Food;
    date: Date;
    category:Category;

 
    constructor(data:any) {
        if (data) {
          this.id = data.id
          this.food = new Food(data?.food);
          this.date = new Date(data?.date);
          this.category = new Category(data?.category);
        }
      }
}