export class Discount {
    id: number;
    description: string;
    cant: number;
    percentage: number;

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.description = data.description;
            this.cant = data.cant;
            this.percentage = data.percentage;

        }
    }
}