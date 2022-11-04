import { City } from "./City";

export class Direction{
    street : string;
    number : number;
    floor : number;
    departament : string;
    city : City;


    constructor(data:any) {
        if (data) {
          this.street = data.street;
          this.number = data.number;
          this.floor = data.floor;
          this.departament = data.departamentç
          this.city = new City (data.city)
        }
      }
}