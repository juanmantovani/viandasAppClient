import { Address } from "./Address";
import { Category } from "./Category";
import { DayFood } from "./DayFood";
import { Food } from "./Food";

export class DayOrder {
    id: number;
    dayFood: DayFood;
    cant: number;
    observation: string;
    address: Address;


 
    constructor(data:any) {
        if (data) {
          this.id = data.id;
          this.dayFood = new DayFood(data.dayFood);
          this.cant = data.cant;
          this.observation = data.observation;
          this.address = new Address(data.address);
        }
      }
}