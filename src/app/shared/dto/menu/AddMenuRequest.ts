import { DayRequest } from "./DayRequest";

export class AddMenuRequest {
    turnId: number;
    dateEnd: Date;
    dateStart: Date;
    days: DayRequest[];
}