import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/Product';
import { AddProductRequest } from '../dto/product/AddProductRequest';
import { AddProductResponse } from '../dto/product/AddProductResponse';
import { DeleteProductRequest } from '../dto/product/DeleteProductRequest';
import { DeleteProductResponse } from '../dto/product/DeleteProductResponse';
import { EditProductRequest } from '../dto/product/EditProductRequest';
import { EditProductResponse } from '../dto/product/EditProductResponse';
import { GetProductResponse } from '../dto/product/GetProductResponse';

const STORAGE_KEY = 'mock_products';
const ORDERS_KEY = 'mock_product_orders';

const DEFAULT_PRODUCTS = [
  { id: 1, title: 'Flan casero', description: 'Flan con dulce de leche', price: 350, available: true, productCategoryId: 1 },
  { id: 2, title: 'Ensalada César', description: 'Con croutons y parmesano', price: 480, available: true, productCategoryId: 2 },
  { id: 3, title: 'Agua mineral', description: '500ml', price: 120, available: true, productCategoryId: 3 },
  { id: 4, title: 'Tiramisú', description: 'Postre italiano clásico', price: 420, available: true, productCategoryId: 1 },
];

// ── Estados de pedido ──────────────────────────────────────────────────────────
export type ProductOrderStatus = 'pendiente' | 'preparacion' | 'terminado' | 'en_envio' | 'entregado';

export interface ProductOrderRow {
  id: number;
  clientName: string;
  clientLastName: string;
  productCategoryTitle: string;
  productTitle: string;
  cant: number;
  date: string; // ISO string para serialización en localStorage
  status: ProductOrderStatus;
}

function todayPlus(days: number): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

const DEFAULT_ORDERS: ProductOrderRow[] = [
  { id: 1, clientName: 'Juan',   clientLastName: 'Pérez',    productCategoryTitle: 'Postres',   productTitle: 'Flan casero',    cant: 2, date: todayPlus(0),  status: 'pendiente' },
  { id: 2, clientName: 'María',  clientLastName: 'González', productCategoryTitle: 'Ensaladas', productTitle: 'Ensalada César', cant: 1, date: todayPlus(0),  status: 'pendiente' },
  { id: 3, clientName: 'Carlos', clientLastName: 'López',    productCategoryTitle: 'Postres',   productTitle: 'Flan casero',    cant: 3, date: todayPlus(0),  status: 'preparacion' },
  { id: 4, clientName: 'Laura',  clientLastName: 'Martínez', productCategoryTitle: 'Postres',   productTitle: 'Tiramisú',       cant: 1, date: todayPlus(0),  status: 'terminado' },
  { id: 5, clientName: 'Ana',    clientLastName: 'Rodríguez',productCategoryTitle: 'Bebidas',   productTitle: 'Agua mineral',   cant: 4, date: todayPlus(1),  status: 'pendiente' },
  { id: 6, clientName: 'Juan',   clientLastName: 'Pérez',    productCategoryTitle: 'Postres',   productTitle: 'Tiramisú',       cant: 2, date: todayPlus(1),  status: 'en_envio' },
  { id: 7, clientName: 'Pedro',  clientLastName: 'Suárez',   productCategoryTitle: 'Ensaladas', productTitle: 'Ensalada César', cant: 2, date: todayPlus(1),  status: 'entregado' },
  { id: 8, clientName: 'María',  clientLastName: 'González', productCategoryTitle: 'Postres',   productTitle: 'Flan casero',    cant: 1, date: todayPlus(-1), status: 'entregado' },
];

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // ── Productos ──────────────────────────────────────────────────────────────

  private loadFromStorage(): Product[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored).map((p: any) => new Product(p));
    }
    const defaults = DEFAULT_PRODUCTS.map(p => new Product(p));
    this.saveToStorage(defaults);
    return defaults;
  }

  private saveToStorage(items: Product[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  private nextId(items: Product[]): number {
    return items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
  }

  getProducts(): Observable<GetProductResponse> {
    const products = this.loadFromStorage();
    return of(new GetProductResponse(products));
  }

  addProduct(request: AddProductRequest): Observable<AddProductResponse> {
    const items = this.loadFromStorage();
    const newItem = new Product({ ...request.product, id: this.nextId(items) });
    items.push(newItem);
    this.saveToStorage(items);
    return of(new AddProductResponse(newItem));
  }

  editProduct(request: EditProductRequest): Observable<EditProductResponse> {
    const items = this.loadFromStorage();
    const index = items.findIndex(i => i.id === request.product.id);
    if (index !== -1) items[index] = new Product(request.product);
    this.saveToStorage(items);
    return of(new EditProductResponse(request.product));
  }

  deleteProduct(request: DeleteProductRequest): Observable<DeleteProductResponse> {
    const items = this.loadFromStorage().filter(i => i.id !== request.idProduct);
    this.saveToStorage(items);
    return of(new DeleteProductResponse({}));
  }

  // ── Pedidos ────────────────────────────────────────────────────────────────

  private loadOrders(): ProductOrderRow[] {
    const stored = localStorage.getItem(ORDERS_KEY);
    if (stored) {
      return JSON.parse(stored) as ProductOrderRow[];
    }
    localStorage.setItem(ORDERS_KEY, JSON.stringify(DEFAULT_ORDERS));
    return DEFAULT_ORDERS;
  }

  private saveOrders(orders: ProductOrderRow[]): void {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }

  getAllProductOrders(): Observable<ProductOrderRow[]> {
    return of(this.loadOrders());
  }

  getProductOrdersByDate(date: Date): Observable<ProductOrderRow[]> {
    const target = new Date(date);
    target.setHours(0, 0, 0, 0);
    const filtered = this.loadOrders().filter(o => {
      const d = new Date(o.date);
      d.setHours(0, 0, 0, 0);
      return d.toDateString() === target.toDateString();
    });
    return of(filtered);
  }

  updateOrderStatus(id: number, status: ProductOrderStatus): Observable<void> {
    const orders = this.loadOrders();
    const order = orders.find(o => o.id === id);
    if (order) {
      order.status = status;
      this.saveOrders(orders);
    }
    return of(undefined);
  }

  addProductOrders(rows: Omit<ProductOrderRow, 'id'>[]): Observable<ProductOrderRow[]> {
    const orders = this.loadOrders();
    const nextId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
    const newRows = rows.map((r, i) => ({ ...r, id: nextId + i }));
    this.saveOrders([...orders, ...newRows]);
    return of(newRows);
  }
}
