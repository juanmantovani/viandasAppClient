export class Direction{
    street : string;
    number : number;
    floor : number;
    departament : string;

    constructor(data:any) {
        if (data) {
          this.street = data.street;
          this.number = data.number;
          this.floor = data.floor;
          this.departament = data.departament
        }
      }
}