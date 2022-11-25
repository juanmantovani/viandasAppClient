import { Category } from "./Category";

export class Food {
    id: number;
    title: string;
    description: string;
    categories : Category[];
    image: Blob;
    urlImage: string;
 

    constructor(data:any) {
        if (data) {
          this.id = data.id;
          this.title = data.title;
          this.description = data.description;
          if (data.categories)
          this.categories = data.categories.map((c:any) => new Category(c));
          this.urlImage= data.urlImage;
        }
      }
}