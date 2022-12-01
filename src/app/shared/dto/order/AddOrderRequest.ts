import { DayOrderRequest } from "./DayOrderRequest";

export class AddOrderRequest {
    idClient : number;
    daysOrderRequest : DayOrderRequest[];
    observation : string;
    total : number;
    date: Date;


}
