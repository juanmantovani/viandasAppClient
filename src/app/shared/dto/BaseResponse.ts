export class BaseResponse {
    public valido: boolean;
    public mensaje: string;
    public accion: string;
  
    constructor(data:any) {
      if (data) {
        this.valido = data.valido;
        this.mensaje = data.mensaje;
        this.accion = data.accion;
      }
    }
  }