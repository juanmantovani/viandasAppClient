import { FoodViewer } from "./FoodViewer";

export class DayViewer {
    foodViewer: FoodViewer;
    date: Date;

 
    constructor(data:any) {
        if (data) {
          this.foodViewer = new FoodViewer(data.food);
          this.date = new Date(data?.date);
        }
      }
}