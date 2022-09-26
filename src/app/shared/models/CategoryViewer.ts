import { Category } from "./Category";
import { Day } from "./Day";
import { DayViewer } from "./DayViewer";

export class CategoryViewer{
    categoty : Category;
    daysViewer : DayViewer[]

    constructor(data:any) {
        if (data) {
          this.categoty = new Category(data.categoty)
          this.daysViewer = data.daysViewer.map((d:any) => new DayViewer(d));
        }
    }
}