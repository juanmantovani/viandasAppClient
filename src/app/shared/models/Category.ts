export class Category {
    id: number;
    description: string;
    constructor(data:any) {
        if (data) {
          this.id = data.id;
          this.description = data.description;
        }
      }
}