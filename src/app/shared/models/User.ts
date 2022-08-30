export class User {
    id: number;
    name: string;
    lastName: string;
    password: string;
    email: string;
 

    constructor(data:any) {
        if (data) {
          this.id = data.id;
          this.name = data.nombre;
          this.lastName = data.apellidos;
          this.password = data.password;
          this.email= data.email;
        }
      }
}