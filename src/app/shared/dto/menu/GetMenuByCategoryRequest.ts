export class GetMenuByCategoriesRequest {
    idCategory : number[]

    constructor(data : any) {
        if(data)
            this.idCategory = data.map((c:any) => c.id);
    }
}



