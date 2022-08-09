export class Banner {
    id: number;
    titulo: string;
    fechaDesde: Date;
    fechaHasta: Date;
    imagen?: File | null;;
 

    constructor(data:any) {
        if (data) {
          this.id = data.id;
          this.titulo = data.titulo;
          this.fechaDesde = new Date(data.fechaDesde);
          this.fechaHasta = new Date(data.fechaHasta);
          this.imagen = data.imagen;
        }
      }
}