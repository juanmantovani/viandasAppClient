import { City } from "./City";

export class Address{
    street : string;
    number : string;
    floor : number;
    departament : string;
    observation : string;
    city : City;


    constructor(data:any) {
        if (data) {
          this.street = data.street;
          this.number = data.number;
          this.floor = data.floor;
          this.departament = data.departament;
          this.city = new City (data.city)
        }
      }
}