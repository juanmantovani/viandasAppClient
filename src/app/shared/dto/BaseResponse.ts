export class BaseResponse {
    public message: string;
  
    constructor(data:any) {
      if (data) {
        this.message = data.mensaje;
      }
    }
  }