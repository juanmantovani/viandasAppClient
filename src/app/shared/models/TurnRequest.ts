import { DayRequest } from "../dto/menu/DayRequest";

export class TurnRequest {
    id: number;
    dateEnd: Date;
    dateStart: Date;
    days: DayRequest[];
}