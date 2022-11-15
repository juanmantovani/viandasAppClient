import { Direction } from "./Direction";
import { Pathology } from "./Pathology";

export class Client {
    id : number;
    name : string;
    lastName : string;
    phonePrimay : string;
    phoneSeconday : string;
    bornDate : Date;
    direction : Direction;
    email : string;
    observation : string;
    pathologies : Pathology[];

    constructor(data:any) {
        if (data) {
          this.id = data.id;
          this.name = data.name;
          this.lastName = data.lastName;
          this.phonePrimay = data.phonePrimay;
          this.phoneSeconday = data.phoneSeconday;
          this.bornDate = new Date(data?.born_date);
          this.direction = new Direction(data.bornDate);
          this.observation = data.observation;
          this.pathologies = data.pathologies.map((p : any) => new Pathology(p))
        }
      }
}