import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FoodService } from 'src/app/shared/services/food.service';
import { MatDialog } from '@angular/material/dialog';
import { FoodFormComponent } from '../food-form/food-form.component';
import { DataFormFood } from '../../../shared/dto/food/DataFormFood';
import { Utils } from '../../../utils';
import { AddFoodRequest } from 'src/app/shared/dto/food/AddFoodRequest';
import { AddFoodResponse } from 'src/app/shared/dto/food/AddFoodResponse';
import { EditFoodRequest } from 'src/app/shared/dto/food/EditFoodRequest';
import { EditFoodResponse } from 'src/app/shared/dto/food/EditFoodResponse';
import { DeleteFoodRequest } from 'src/app/shared/dto/food/DeleteFoodRequest';
import { GetFoodResponse } from 'src/app/shared/dto/food/GetFoodResponse';
import { Food } from 'src/app/shared/models/Food';
import { Category } from 'src/app/shared/models/Category';
import { GetCategoryResponse } from 'src/app/shared/dto/category/GetCategoryResponse';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'category', 'actions'];
  dataSource!: MatTableDataSource<Food>;
  actionForm:string;
  listCategories: Category[];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private foodService: FoodService,
    public dialog: MatDialog,
    private dialogService: DialogService
  ) {
    this.dataSource = new MatTableDataSource<Food>();
  }

   ngOnInit() {
    this.getFood();
    this.getCategories();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Ítems por página';
  }

  async getFood() {
    await this.foodService.getFood().subscribe((res: GetFoodResponse) => {
      this.dataSource = new MatTableDataSource(res.food);
    })
  }
  async getCategories() {
    await this.foodService.getCategories().subscribe((res: GetCategoryResponse) => {
      this.listCategories = res.listCategories;
    })
  }

  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onClickAdd() {
    this.actionForm = 'Crear';
    const dataForm: DataFormFood = {
      actionForm: "Crear",
      food: new Food(null),
      listCategories: this.listCategories
    };
    this.gestionateForm(dataForm);
    };

    onClickEdit(food: any) {
      this.actionForm = 'Editar';
      const dataForm: DataFormFood = {
        actionForm: "Editar",
        food: food,
        listCategories: this.listCategories

      };
      this.gestionateForm(dataForm);
    }

    async onClickDelete(food : any){
      if (await this.generateConfirm("Está a punto de eliminar un registro. ¿Está seguro de realizar esta operación?") === true) {
        await this.deleteFood(food);
        await this.getFood();
      }
  }

  async deleteFood(food: Food) {
    const request: DeleteFoodRequest = {
      idFood: food.id
    }
    await this.foodService.deleteFood(request);
  }

  async generateConfirm(msg: string) {
    return await this.dialogService.openConfirmDialog(msg);
  }

  async gestionateForm(dataForm: DataFormFood) {
    const dialogConfig = Utils.matDialogConfigDefault();
    dialogConfig.data = dataForm;
    const dialogRef = this.dialog.open(FoodFormComponent, dialogConfig);
    const componentInstance = dialogRef.componentInstance;

    componentInstance.onSubmit.subscribe(async (data) => {
      if (!data) {
        dialogRef.close();
        return false;
      }

      var result : any  = await this.onSubmit(data);
      if (result) {
        return false;
      }
      else {
        dialogRef.close();
        await this.getFood();
        return true;
      }
    })
  }

  async onSubmit(food: Food){ 
    const resultOperation = this.actionForm == "Crear" ? await this.addFood(food) : await this.editFood(food);
  
    return resultOperation;
  }

  async addFood(food: Food) {
    const addFoodRequest: AddFoodRequest = {
      food: food
    }
    await this.foodService.addFood(addFoodRequest).subscribe((res: AddFoodResponse) => {
      return res
    }
    );
  }

  async editFood(food: Food) {
    const editFoodRequest: EditFoodRequest = {
      food: food
    }
    await this.foodService.editFood(editFoodRequest).subscribe((res: EditFoodResponse) => {
      return res
    })
  }

}
