import { DeliveryDriver } from "../../models/DeliveryDriver";
import { Tanda } from "../../models/Tanda";

export class DataFormTanda {

    tanda: Tanda = new Tanda(null);
    actionForm: string;
    listDeliveryDriver : DeliveryDriver[];
  
  }