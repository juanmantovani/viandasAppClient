export class OrderViewer{
    id: number;
    date: Date;
    observation: string;
    total: number;
    status : string
    dateStart: Date;
    dateEnd: Date;


    constructor(data : any){
        if(data){
            this.id = data.id
            this.date = new Date(data.date);
            this.observation = data.observation;
            this.total = data.total;
            this.status = data.status;
            this.dateStart = new Date(data.dateStart);
            this.dateEnd = new Date(data.dateEnd);
        }

    }
}