import { Address } from "./Address";
import { Vehicle } from "./Vehicle";

export class DeliveryDriver {
    id: number;
    dni: number;
    name: string;
    lastName: string;
    phone: string;
    address: Address;
    vehicle : Vehicle;
    bornDate : Date

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.dni = data.dni;
            this.name = data.name;
            this.lastName = data.lastName;
            this.phone = data.phone;
            this.address = new Address(data.address);
            this.vehicle = new Vehicle(data.vehicle);
            this.bornDate = new Date(data.bornDate)
        }
    }
}