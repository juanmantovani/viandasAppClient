import { Category } from "../../models/Category";

export class GetMenuByCategoriesRequest {
    idCategory : Category[]
    dateStart : Date;
    dateEnd : Date;

    constructor(data : any) {
        if(data){
            this.idCategory = data.idCategory.map((c:any) => c.id);
            this.dateStart = new Date(data.dateStart);
            this.dateEnd = new Date(data.dateEnd);
        }
    }
}



