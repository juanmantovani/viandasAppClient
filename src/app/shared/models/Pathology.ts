export class Pathology{
    id: number;
    description: string;
    checked : boolean;

    constructor(data:any) {
        if (data) {
          this.id = data.id;
          this.description = data.description;
          this.checked = data.checked;
        }
      }
}