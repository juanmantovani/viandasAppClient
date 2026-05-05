import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductCategory } from 'src/app/shared/models/ProductCategory';
import { ProductCategoryService } from 'src/app/shared/services/product-category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Utils } from 'src/app/utils';
import { DataFormProductCategory } from 'src/app/shared/dto/productCategory/DataFormProductCategory';
import { ProductCategoryFormComponent } from '../product-category-form/product-category-form.component';
import { AddProductCategoryRequest } from 'src/app/shared/dto/productCategory/AddProductCategoryRequest';
import { EditProductCategoryRequest } from 'src/app/shared/dto/productCategory/EditProductCategoryRequest';
import { DeleteProductCategoryRequest } from 'src/app/shared/dto/productCategory/DeleteProductCategoryRequest';
import { GetProductCategoryResponse } from 'src/app/shared/dto/productCategory/GetProductCategoryResponse';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'description', 'actions'];
  actionForm: string;
  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
    public dialog: MatDialog,
    private dialogService: DialogService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getProductCategories();
    this.paginator._intl.itemsPerPageLabel = 'Ítems por página';
  }

  async getProductCategories() {
    await this.productCategoryService.getProductCategories().subscribe((res: GetProductCategoryResponse) => {
      this.dataSource = new MatTableDataSource(res.productCategories);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onClickAdd() {
    this.actionForm = 'Add';
    const dataForm: DataFormProductCategory = {
      actionForm: 'Add',
      productCategory: new ProductCategory(null)
    };
    this.gestionateForm(dataForm);
  }

  onClickEdit(productCategory: ProductCategory) {
    this.actionForm = 'Edit';
    const dataForm: DataFormProductCategory = {
      actionForm: 'Edit',
      productCategory: productCategory
    };
    this.gestionateForm(dataForm);
  }

  async onClickDelete(productCategory: ProductCategory) {
    const res = await this.productService.getProducts().toPromise();
    const hasProducts = res?.products?.some(p => p.productCategoryId === productCategory.id) ?? false;
    if (hasProducts) {
      this.notificationService.show('No es posible eliminar la categoría ya que posee productos asociados.', { classname: 'bg-danger text-light', delay: 4000 });
      return;
    }
    if (await this.generateConfirm('Está a punto de eliminar un registro. ¿Está seguro de realizar esta operación?') === true) {
      await this.deleteProductCategory(productCategory);
    }
  }

  async deleteProductCategory(productCategory: ProductCategory) {
    const request: DeleteProductCategoryRequest = { idProductCategory: productCategory.id };
    await this.productCategoryService.deleteProductCategory(request).subscribe(() => {
      this.getProductCategories();
    });
  }

  async generateConfirm(msg: string) {
    return await this.dialogService.openConfirmDialog(msg);
  }

  async gestionateForm(dataForm: DataFormProductCategory) {
    const dialogConfig = Utils.matDialogConfigDefault();
    dialogConfig.data = dataForm;
    const dialogRef = this.dialog.open(ProductCategoryFormComponent, dialogConfig);
    const componentInstance = dialogRef.componentInstance;

    componentInstance.onSubmit.subscribe(async (data) => {
      if (!data) {
        dialogRef.close();
        return false;
      }
      var result: any = await this.onSubmit(data);
      if (result) {
        return false;
      } else {
        dialogRef.close();
        await this.getProductCategories();
        return true;
      }
    });
  }

  async onSubmit(productCategory: ProductCategory) {
    return this.actionForm === 'Add'
      ? await this.addProductCategory(productCategory)
      : await this.editProductCategory(productCategory);
  }

  async addProductCategory(productCategory: ProductCategory) {
    const request: AddProductCategoryRequest = { productCategory };
    await this.productCategoryService.addProductCategory(request).subscribe(() => {
      this.getProductCategories();
    });
  }

  async editProductCategory(productCategory: ProductCategory) {
    const request: EditProductCategoryRequest = { productCategory };
    await this.productCategoryService.editProductCategory(request).subscribe(() => {
      this.getProductCategories();
    });
  }
}
