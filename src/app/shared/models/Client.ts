import { Address } from "./Address";
import { Pathology } from "./Pathology";

export class Client {
    id : number;
    name : string;
    lastName : string;
    phonePrimary : string;
    phoneSecondary : string;
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
          this.phoneSecondary = data.phoneSecondary;
          this.bornDate = new Date(data.bornDate);
           if(data.addresses)
          this.addresses  = data.addresses.map((a : any) => new Address(a))
          this.observation = data.observation;
          if(data.pathologies)
            this.pathologies = data.pathologies.map((p : any) => new Pathology(p))
        }
      }
}