export class DeliveryDriver {
    id: number;
    dni: number;
    name: string;
    lastName: string;
    phone: string;

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.dni = data.dni;
            this.name = data.name;
            this.lastName = data.lastName;
            this.phone = data.phone;
        }
    }
}