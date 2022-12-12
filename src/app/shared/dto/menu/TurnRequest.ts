import { DayFoodRequest } from "./DayFoodRequest";

export class TurnRequest {
    id: number;
    dateEnd: Date;
    dateStart: Date;
    days: DayFoodRequest[];
}