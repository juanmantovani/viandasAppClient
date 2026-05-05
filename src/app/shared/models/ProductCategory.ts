export class ProductCategory {
  id: number;
  title: string;
  description: string;

  constructor(data: any) {
    if (data) {
      this.id = data.id;
      this.title = data.title;
      this.description = data.description;
    }
  }
}
