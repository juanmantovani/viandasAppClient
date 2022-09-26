
export class FoodViewer {
    id: number;
    title: string;
    description: string;
    urlImage: string;
 

    constructor(data:any) {
        if (data) {
          this.id = data.id;
          this.title = data.title;
          this.description = data.description;
          this.urlImage= data.urlImage;
        }
      }
}