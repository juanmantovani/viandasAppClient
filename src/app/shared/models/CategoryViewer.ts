import { Category } from "./Category";
import { Day } from "./Day";

export class CategoryViewer{
    categoty : Category;
    days : Day[]

    constructor(data:any) {
        if (data) {
          this.categoty = new Category(data.categoty)
          this.days = data.days.map((d:any) => new Day(d));
        }
    }
}