import { Category } from "./Category";
import { Day } from "./Day";
import { DayViewer } from "./DayViewer";

export class CategoryViewer{
    category : Category;
    daysViewer : DayViewer[]

    constructor(data:any) {
        if (data) {
          this.category = new Category(data.category)
          this.daysViewer = data.daysViewer?.map((d:any) => new DayViewer(d));
        }
    }
}