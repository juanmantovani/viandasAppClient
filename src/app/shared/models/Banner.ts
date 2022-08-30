export class Banner {
    id: number;
    title: string;
    dateStart: Date;
    dateEnd: Date;
    image: Blob;
    urlImage: string;
    active: boolean
 

    constructor(data:any) {
        if (data) {
          this.id = data.id;
          this.title = data.title;
          this.dateStart = new Date(data.dateStart);
          this.dateEnd = new Date(data.dateEnd);
          this.urlImage = data.urlImage;
          this.active = data.active;
        }
      }
}