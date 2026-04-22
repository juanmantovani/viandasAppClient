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
import { ProductService, ProductOrderRow, ProductOrderStatus } from 'src/app/shared/services/product.service';
import { ProductCategoryService } from 'src/app/shared/services/product-category.service';
import { Utils } from 'src/app/utils';
import { ProductFormComponent } from '../product-form/product-form.component';

export type ProductView = 'orders' | 'products' | 'categories';

export interface StatusOption {
  value: ProductOrderStatus | null;
  label: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  currentView: ProductView = 'orders';

  // ── Pedidos ────────────────────────────────────────────────────────────────
  date: Date | null = null;
  orderRows: ProductOrderRow[] = [];
  displayedOrderColumns: string[] = ['id', 'date', 'client', 'category', 'product', 'cant', 'status'];
  ordersDataSource: MatTableDataSource<ProductOrderRow>;
  showOrders: boolean = false;

  selectedStatus: ProductOrderStatus | null = 'pendiente';
  clientSearch: string = '';

  statusOptions: StatusOption[] = [
    { value: null,          label: 'Todos' },
    { value: 'pendiente',   label: 'Pendiente' },
    { value: 'preparacion', label: 'En preparación' },
    { value: 'terminado',   label: 'Terminado' },
    { value: 'en_envio',    label: 'En envío' },
    { value: 'entregado',   label: 'Entregado' },
  ];

  statusLabels: Record<ProductOrderStatus, string> = {
    pendiente:   'Pendiente',
    preparacion: 'En preparación',
    terminado:   'Terminado',
    en_envio:    'En envío',
    entregado:   'Entregado',
  };

  // ── ABM Productos ──────────────────────────────────────────────────────────
  displayedProductColumns: string[] = ['id', 'title', 'description', 'category', 'price', 'available', 'actions'];
  actionForm: string;
  productDataSource: any;
  productCategories: ProductCategory[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    public dialog: MatDialog,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
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
    const obs = this.date
      ? this.productService.getProductOrdersByDate(this.date)
      : this.productService.getAllProductOrders();

    obs.subscribe((rows: ProductOrderRow[]) => {
      this.orderRows = rows;
      this.applyFilters();
    });
  }

  onDateChange(event: any) {
    this.date = event.value ?? null;
    this.loadProductOrders();
  }

  clearDate() {
    this.date = null;
    this.loadProductOrders();
  }

  onStatusFilterChange() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = this.orderRows;
    if (this.selectedStatus !== null) {
      filtered = filtered.filter(r => r.status === this.selectedStatus);
    }
    if (this.clientSearch.trim()) {
      const q = this.clientSearch.trim().toLowerCase();
      filtered = filtered.filter(r =>
        `${r.clientName} ${r.clientLastName}`.toLowerCase().includes(q)
      );
    }
    this.ordersDataSource = new MatTableDataSource(filtered);
    this.showOrders = this.orderRows.length > 0;
  }

  onClientSearchChange() {
    this.applyFilters();
  }

  onOrderStatusChange(row: ProductOrderRow, newStatus: ProductOrderStatus) {
    this.productService.updateOrderStatus(row.id, newStatus).subscribe(() => {
      row.status = newStatus;
      this.applyFilters();
    });
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
      if (this.paginator) {
        this.paginator._intl.itemsPerPageLabel = 'Ítems por página';
        this.productDataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.productDataSource.sort = this.sort;
      }
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
