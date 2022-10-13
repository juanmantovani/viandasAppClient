export class Category {
    id: number;
    title : string;
    description: string;
    price: number;
    checked: boolean
    constructor(data:any) {
        if (data) {
          this.id = data.id;
          this.title = data.title
          this.description = data.description;
          this.price = data.price;
          this.checked = data.checked;
        }
      }
}