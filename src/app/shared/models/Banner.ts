export class Banner {
    id: number;
    title: string;
    dateStart: Date;
    dateEnd: Date;
    image: Blob;
    urlImage: string;
 

    constructor(data:any) {
        if (data) {
          this.id = data.id;
          this.title = data.titulo;
          this.dateStart = new Date(data.fechaDesde);
          this.dateEnd = new Date(data.fechaHasta);
          this.urlImage= data.urlImage;
        }
      }
}