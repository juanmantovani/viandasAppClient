export class City{
    id: number;
    description: string;
    cp : string;

    constructor(data:any) {
        if (data) {
          this.id = data.id;
          this.description = data.description;
          this.cp = data.cp;
        }
      }
}