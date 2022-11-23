import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddCategoryRequest } from 'src/app/shared/dto/category/AddCategoryRequest';
import { AddCategoryResponse } from 'src/app/shared/dto/category/AddCategoryResponse';
import { DataFormCategory } from 'src/app/shared/dto/category/DataFormCategory';
import { DeleteCategoryRequest } from 'src/app/shared/dto/category/DeleteCategoryRequest';
import { EditCategoryRequest } from 'src/app/shared/dto/category/EditCategoryRequest';
import { EditCategoryResponse } from 'src/app/shared/dto/category/EditCategoryResponse';
import { GetCategoryResponse } from 'src/app/shared/dto/category/GetCategoryResponse';
import { Category } from 'src/app/shared/models/Category';
import { CategoryService } from 'src/app/shared/services/category.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { Utils } from 'src/app/utils';
import { CategoryFormComponent } from '../category-form/category-form.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['id','title','description', 'price','color', 'actions'];
  dataSource!: MatTableDataSource<Category>;
  actionForm: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private dialogService: DialogService
  ) {
    this.dataSource = new MatTableDataSource<Category>();
  }

  ngOnInit(): void {
    this.getCategories();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Ítems por página';
  }
  async getCategories() {
    await this.categoryService.getCategories().subscribe((res: GetCategoryResponse) => {
      this.dataSource = new MatTableDataSource(res.categories);
    })
  }
  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onClickAdd() {
    this.actionForm = 'Crear';
    const dataForm: DataFormCategory = {
      actionForm: "Crear",
      category: new Category(null),
    };
    this.gestionateForm(dataForm);
  }

  onClickEdit(category: any) {
    this.actionForm = 'Editar';
    const dataForm: DataFormCategory = {
      actionForm: "Editar",
      category: category,

    };
    this.gestionateForm(dataForm);
  }

  async onClickDelete(category: any) {
    if (await this.generateConfirm("Está a punto de eliminar un registro. ¿Está seguro de realizar esta operación?") === true) {
      await this.deleteCategory(category);
    }
  }

  async deleteCategory(category: Category) {
    const request: DeleteCategoryRequest = {
      idCategory: category.id
    }
    await this.categoryService.deleteCategory(request).subscribe(() => {
      this.getCategories();
    });
  }

  async generateConfirm(msg: string) {
    return await this.dialogService.openConfirmDialog(msg);
  }

  async gestionateForm(dataForm: DataFormCategory) {
    const dialogConfig = Utils.matDialogConfigDefault();
    dialogConfig.data = dataForm;
    const dialogRef = this.dialog.open(CategoryFormComponent, dialogConfig);
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
        await this.getCategories();
        return true;
      }
    })
  }

  async onSubmit(category: Category){ 
    const resultOperation = this.actionForm == "Crear" ? await this.addCategory(category) : await this.editCategory(category);
  
    return resultOperation;
  }

  async addCategory(category: Category) {
    const addCategoryRequest: AddCategoryRequest = {
      category: category
    }

    await this.categoryService.addCategory(addCategoryRequest).subscribe((res: AddCategoryResponse) => {
      this.getCategories()
      return res;
    }
    );
  }

  async editCategory(category: Category) {
    const editCategoryRequest: EditCategoryRequest = {
      category: category
    }
    await this.categoryService.editCategory(editCategoryRequest).subscribe((res: EditCategoryResponse) => {
      this.getCategories()
      return res;
    })
  }


}
