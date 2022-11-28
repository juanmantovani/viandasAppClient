import { Address } from "./Address";
import { Pathology } from "./Pathology";

export class Client {
    id : number;
    name : string;
    lastName : string;
    phonePrimary : string;
    phoneSeconday : string;
    bornDate : Date;
    addresses  : Address[];
    email : string;
    observation : string;
    pathologies : Pathology[];

    constructor(data:any) {
        if (data) {
          this.id = data.id;
          this.name = data.name;
          this.lastName = data.lastName;
          this.phonePrimary = data.phonePrimary;
          this.phoneSeconday = data.phoneSecondary;
          this.bornDate = new Date(data.bornDate);
          this.addresses  = data.addresses.map((a : any) => new Address(a))
          this.observation = data.observation;
          this.pathologies = data.pathologies.map((p : any) => new Pathology(p))
        }
      }
}