export class Vehicle {
    id: number;
    brand: string;
    model: string;
    patent: string;
    year : number;

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.brand = data.brand;
            this.model = data.model;
            this.patent = data.patent
            this.year = data.year
        }
    }
}