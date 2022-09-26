import { DayRequest } from "./DayRequest";

export class TurnRequest {
    id: number;
    dateEnd: Date;
    dateStart: Date;
    days: DayRequest[];
}