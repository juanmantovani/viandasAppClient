export class Banner {
    id: number;
    tittle: string;
    dateStart: Date;
    dateEnd: Date;
    image: Blob;
 

    constructor(data:any) {
        if (data) {
          this.id = data.id;
          this.tittle = data.titulo;
          this.dateStart = new Date(data.fechaDesde);
          this.dateEnd = new Date(data.fechaHasta);
          this.image = data.imagen;
        }
      }
}