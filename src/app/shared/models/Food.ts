import { Category } from "./Category";

export class Food {
    id: number;
    title: string;
    description: string;
    category : Category;
    image: Blob;
    urlImage: string;
 

    constructor(data:any) {
        if (data) {
          this.id = data.id;
          this.title = data.title;
          this.description = data.description;
          this.category = new Category(data.category);
          this.urlImage= data.urlImage;
        }
      }
}