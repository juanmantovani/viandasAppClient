import { DayOrderRequest } from "./DayOrderRequest";
import { ProductOrderRequest } from "../product/ProductOrderRequest";

export class AddOrderRequest {
    idClient : number;
    daysOrderRequest : DayOrderRequest[];
    observation : string;
    total : number;
    date: Date;
    products: ProductOrderRequest[];
}
