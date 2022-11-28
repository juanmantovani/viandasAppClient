import { Food } from "./Food";
import { FoodViewer } from "./FoodViewer";

export class DayViewer {
    foodViewer: FoodViewer;
    date: Date;

 
    constructor(data:any) {
        if (data) {
          if(data.foodViewer){
          this.foodViewer = new FoodViewer(data.foodViewer);
          }
          if(data.food){
            this.foodViewer = new Food(data.food);
            }
          this.date = new Date(data?.date);
        }
      }
}