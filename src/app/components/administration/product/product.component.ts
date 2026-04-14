import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataFormProduct } from 'src/app/shared/dto/product/DataFormProduct';
import { DeleteProductRequest } from 'src/app/shared/dto/product/DeleteProductRequest';
import { EditProductRequest } from 'src/app/shared/dto/product/EditProductRequest';
import { AddProductRequest } from 'src/app/shared/dto/product/AddProductRequest';
import { GetProductResponse } from 'src/app/shared/dto/product/GetProductResponse';
import { GetProductCategoryResponse } from 'src/app/shared/dto/productCategory/GetProductCategoryResponse';
import { Product } from 'src/app/shared/models/Product';
import { ProductCategory } from 'src/app/shared/models/ProductCategory';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { ProductService, ProductOrderRow } from 'src/app/shared/services/product.service';
import { ProductCategoryService } from 'src/app/shared/services/product-category.service';
import { Utils } from 'src/app/utils';
import { ProductFormComponent } from '../product-form/product-form.component';

export type ProductView = 'orders' | 'products' | 'categories';

export interface ProductSummaryRow {
  productCategoryTitle: string;
  productTitle: string;
  totalCant: number;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  currentView: ProductView = 'orders';

  // ── Pedidos ────────────────────────────────────────────────────────────────
  date: Date = new Date();
  orderRows: ProductOrderRow[] = [];
  summaryRows: ProductSummaryRow[] = [];
  displayedOrderColumns: string[] = ['id', 'client', 'category', 'product', 'cant'];
  displayedSummaryColumns: string[] = ['category', 'product', 'totalCant'];
  ordersDataSource: MatTableDataSource<ProductOrderRow>;
  showOrders: boolean = false;

  // ── ABM Productos ──────────────────────────────────────────────────────────
  displayedProductColumns: string[] = ['id', 'title', 'description', 'category', 'price', 'available', 'actions'];
  actionForm: string;
  productDataSource: any;
  productCategories: ProductCategory[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    public dialog: MatDialog,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Ítems por página';
    this.loadProductCategories();
    this.loadProductOrders();
  }

  // ── Navegación ─────────────────────────────────────────────────────────────

  showView(view: ProductView) {
    this.currentView = view;
    if (view === 'products') this.loadProducts();
  }

  // ── Pedidos ────────────────────────────────────────────────────────────────

  loadProductOrders() {
    this.productService.getProductOrdersByDate(this.date).subscribe((rows: ProductOrderRow[]) => {
      this.orderRows = rows;
      this.ordersDataSource = new MatTableDataSource(rows);
      this.buildSummary(rows);
      this.showOrders = rows.length > 0;
    });
  }

  onClickOk() {
    this.loadProductOrders();
  }

  buildSummary(rows: ProductOrderRow[]) {
    const map = new Map<string, ProductSummaryRow>();
    rows.forEach(r => {
      const key = `${r.productCategoryTitle}|${r.productTitle}`;
      if (map.has(key)) {
        map.get(key)!.totalCant += r.cant;
      } else {
        map.set(key, {
          productCategoryTitle: r.productCategoryTitle,
          productTitle: r.productTitle,
          totalCant: r.cant
        });
      }
    });
    this.summaryRows = Array.from(map.values());
  }

  // ── ABM Categorías ─────────────────────────────────────────────────────────

  loadProductCategories() {
    this.productCategoryService.getProductCategories().subscribe((res: GetProductCategoryResponse) => {
      this.productCategories = res.productCategories;
    });
  }

  // ── ABM Productos ──────────────────────────────────────────────────────────

  loadProducts() {
    this.productService.getProducts().subscribe((res: GetProductResponse) => {
      this.productDataSource = new MatTableDataSource(res.products);
      this.productDataSource.paginator = this.paginator;
      this.productDataSource.sort = this.sort;
    });
  }

  getCategoryName(productCategoryId: number): string {
    const cat = this.productCategories.find(c => c.id === productCategoryId);
    return cat ? cat.title : '-';
  }

  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productDataSource.filter = filterValue.trim().toLowerCase();
  }

  onClickAdd() {
    this.actionForm = 'Add';
    const dataForm: DataFormProduct = { actionForm: 'Add', product: new Product(null) };
    this.gestionateForm(dataForm);
  }

  onClickEdit(product: Product) {
    this.actionForm = 'Edit';
    const dataForm: DataFormProduct = { actionForm: 'Edit', product };
    this.gestionateForm(dataForm);
  }

  async onClickDelete(product: Product) {
    if (await this.dialogService.openConfirmDialog('Está a punto de eliminar un registro. ¿Está seguro?') === true) {
      const request: DeleteProductRequest = { idProduct: product.id };
      await this.productService.deleteProduct(request).subscribe(() => this.loadProducts());
    }
  }

  async gestionateForm(dataForm: DataFormProduct) {
    const dialogConfig = Utils.matDialogConfigDefault();
    dialogConfig.data = { ...dataForm, productCategories: this.productCategories };
    const dialogRef = this.dialog.open(ProductFormComponent, dialogConfig);

    dialogRef.componentInstance.onSubmit.subscribe(async (data) => {
      if (!data) { dialogRef.close(); return false; }
      await this.onSubmit(data);
      dialogRef.close();
      this.loadProducts();
      return true;
    });
  }

  async onSubmit(product: Product) {
    if (this.actionForm === 'Add') {
      const request: AddProductRequest = { product };
      await this.productService.addProduct(request).subscribe();
    } else {
      const request: EditProductRequest = { product };
      await this.productService.editProduct(request).subscribe();
    }
  }
}
