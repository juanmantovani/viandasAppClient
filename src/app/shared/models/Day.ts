export class Day {
    foodId: number[] = [];
    date: Date;

 
    constructor(data:any) {
        if (data) {
          this.foodId.push(data?.foodId);
          this.date = new Date(data?.date);
        }
      }
}