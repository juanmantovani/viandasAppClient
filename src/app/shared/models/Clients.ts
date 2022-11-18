import { Address } from "./Address";
import { Pathology } from "./Pathology";

export class Client {
    id : number;
    name : string;
    lastName : string;
    phonePrimary : string;
    phoneSeconday : string;
    bornDate : Date;
    adresses  : Address[];
    email : string;
    observation : string;
    pathologies : Pathology[];

    constructor(data:any) {
        if (data) {
          this.id = data.id;
          this.name = data.name;
          this.lastName = data.lastName;
          this.phonePrimary = data.phonePrimay;
          this.phoneSeconday = data.phoneSeconday;
          this.bornDate = new Date(data.bornDate);
          this.adresses  = data.adresses.map((a : any) => new Address(a))
          this.observation = data.observation;
          this.pathologies = data.pathologies.map((p : any) => new Pathology(p))
        }
      }
}