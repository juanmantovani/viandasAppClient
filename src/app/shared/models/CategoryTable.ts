import { Category } from "./Category";

export class CategoryTable {
    category: Category;
    cant: number;

    constructor(data: any) {
        if (data) {
            this.category = new Category(data.category);
            this.cant = data.cant
        }
    }
}