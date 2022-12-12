export class OrderViewer{
    id: number;
    date: Date;
    observation: string;
    total: number;
    status : string

    constructor(data : any){
        if(data){
            this.id = data.id
            this.date = new Date(data.date);
            this.observation = data.observation;
            this.total = data.total;
            this.status = data.status;
        }
    }
}