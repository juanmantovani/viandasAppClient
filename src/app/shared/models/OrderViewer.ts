import { StatusOrder } from "./StatusOrder";

export class OrderViewer{
    id: number;
    date: Date;
    observation: string;
    total: number;
    status : StatusOrder
    dateStart: Date;
    dateEnd: Date;
    paid: boolean;


    constructor(data : any){
        if(data){
            this.id = data.id
            this.date = new Date(data.date);
            this.observation = data.observation;
            this.total = data.total;
            this.status = new StatusOrder(data.status);
            this.dateStart = new Date(data.dateStart);
            this.dateEnd = new Date(data.dateEnd);
            this.paid = data.paid;
        }

    }
}