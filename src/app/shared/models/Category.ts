export class Category {
    id: number;
    title : string;
    description: string;
    price: number
    constructor(data:any) {
        if (data) {
          this.id = data.id;
          this.title = data.title
          this.description = data.description;
          this.price = data.price;
        }
      }
}