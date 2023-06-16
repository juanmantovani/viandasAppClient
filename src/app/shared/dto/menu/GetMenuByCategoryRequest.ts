import { Category } from "../../models/Category";

export class GetMenuByCategoriesRequest {
    idCategory : Category[]
    dateStart : Date | null;
    dateEnd : Date | null;

    constructor(data : any) {
        if(data){
            this.idCategory = data.idCategory.map((c:any) => c.id);
            this.dateStart = new Date(data.dateStart);
            this.dateEnd = new Date(data.dateEnd);
        }
    }
}



