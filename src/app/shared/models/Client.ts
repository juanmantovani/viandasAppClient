import { Direction } from "./Direction";

export class Client {
    id : number;
    name : string;
    lastName : string;
    phone_primay : string;
    phone_seconday : string
    born_date : Date;
    direction : Direction;

    constructor(data:any) {
        if (data) {
          this.id = data.id;
          this.name = data.name;
          this.lastName = data.lastName;
          this.phone_primay = data.phone_primay;
          this.phone_seconday = data.phone_seconday;
          this.born_date = new Date(data?.born_date);
          this.direction = new Direction(data.direction);
        }
      }

}