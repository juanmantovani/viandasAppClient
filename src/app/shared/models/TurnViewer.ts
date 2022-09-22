import { CategoryViewer } from "./CategoryViewer";

export class TurnViewer {
    id : number;
    description : string
    categoryViewer: CategoryViewer[]

    constructor(data:any) {
        if (data) {
          this.id = data.id;
          this.description = data.description
          this.categoryViewer = data.categoryViewer.map((c:any) => new CategoryViewer(c));
        }
    }   
}