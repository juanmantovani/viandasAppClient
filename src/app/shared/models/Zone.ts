export class Zone {
    id: number;
    description: string;
    price: number;

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.description = data.description;
            this.price = data.price;

        }
    }
}