import { City } from "./City";

export class Address{
    id: number;
    street : string;
    number : string;
    floor : number;
    departament : string;
    observation : string;
    favourite : boolean;
    city : City;
    idZone: number;
    lat: string;
    lng: string;


    constructor(data:any) {
        if (data) {
          this.id = data.id;
          this.street = data.street;
          this.number = data.number;
          this.floor = data.floor;
          this.departament = data.departament;
          this.observation = data.observation;
          this.favourite = data.favourite;
          this.city = new City (data.city);
          this.idZone = data.idZone;
          this.lat = data.lat;
          this.lng = data.lng
        }
      }
}