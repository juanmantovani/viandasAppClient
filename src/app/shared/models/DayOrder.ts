import { Category } from "./Category";
import { Food } from "./Food";

export class DayOrder {
    id: number;
    food: Food;
    date: Date;
    category: Category;
    cant: number;
    observation: string;

 
    constructor(data:any) {
        if (data) {
          this.id = data.id
          this.food = new Food(data?.food);
          this.date = new Date(data?.date);
          this.category = new Category(data?.category);
          if(data.cant){
            this.cant = data.cant;
          }else { this.cant = 1}
          this.observation = data.observation;
        }
      }
}