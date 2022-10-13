import { Turn } from "./Turn";

export class MenuList {
    menuId : number;
    dateStart: Date;
    dateEnd: Date;
    turn: Turn;
    isCurrent: boolean;
 
    constructor(data:any) {
        if (data) {
          this.menuId = data.menuId;
          this.dateStart = new Date (data.dateStart);
          this.dateEnd = new Date (data.dateEnd);
          this.turn = new Turn(data.turn);
          this.isCurrent = data.isCurrent;
        }
      }
}