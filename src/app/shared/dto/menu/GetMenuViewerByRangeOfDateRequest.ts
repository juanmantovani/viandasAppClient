export class GetMenuViewerByRangeOfDateRequest {
    dateStart : Date;
    dateEnd : Date;

    constructor(data : any) {
        if(data)
            this.dateStart = new Date(data.dateStart);
            this.dateEnd = new Date(data.dateEnd);

    }
}



