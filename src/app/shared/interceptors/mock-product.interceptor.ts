import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProductOrderStatus } from '../services/product.service';

const PRODUCTS_KEY = 'mock_products';
const CATEGORIES_KEY = 'mock_product_categories';
const ORDERS_KEY = 'mock_product_orders';

function todayPlus(days: number): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

function nextId(items: any[]): number {
  return items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
}

const DEFAULT_PRODUCTS = [
  { id: 1, title: 'Flan casero', description: 'Flan con dulce de leche', price: 350, available: true, productCategoryId: 1 },
  { id: 2, title: 'Ensalada César', description: 'Con croutons y parmesano', price: 480, available: true, productCategoryId: 2 },
  { id: 3, title: 'Agua mineral', description: '500ml', price: 120, available: true, productCategoryId: 3 },
  { id: 4, title: 'Tiramisú', description: 'Postre italiano clásico', price: 420, available: true, productCategoryId: 1 },
];

const DEFAULT_CATEGORIES = [
  { id: 1, title: 'Postres', description: 'Postres y dulces' },
  { id: 2, title: 'Ensaladas', description: 'Ensaladas frescas' },
  { id: 3, title: 'Bebidas', description: 'Bebidas frías y calientes' },
];

const DEFAULT_ORDERS = [
  { id: 1, clientName: 'Juan', clientLastName: 'Pérez', productCategoryTitle: 'Postres', productTitle: 'Flan casero', cant: 2, date: todayPlus(0), status: 'pendiente' },
  { id: 2, clientName: 'María', clientLastName: 'González', productCategoryTitle: 'Ensaladas', productTitle: 'Ensalada César', cant: 1, date: todayPlus(0), status: 'pendiente' },
  { id: 3, clientName: 'Carlos', clientLastName: 'López', productCategoryTitle: 'Postres', productTitle: 'Flan casero', cant: 3, date: todayPlus(0), status: 'pendiente' },
  { id: 4, clientName: 'Laura', clientLastName: 'Martínez', productCategoryTitle: 'Postres', productTitle: 'Tiramisú', cant: 1, date: todayPlus(0), status: 'pendiente' },
  { id: 5, clientName: 'Ana', clientLastName: 'Rodríguez', productCategoryTitle: 'Bebidas', productTitle: 'Agua mineral', cant: 4, date: todayPlus(1), status: 'pendiente' },
  { id: 6, clientName: 'Juan', clientLastName: 'Pérez', productCategoryTitle: 'Postres', productTitle: 'Tiramisú', cant: 2, date: todayPlus(1), status: 'pendiente' },
  { id: 7, clientName: 'Pedro', clientLastName: 'Suárez', productCategoryTitle: 'Ensaladas', productTitle: 'Ensalada César', cant: 2, date: todayPlus(1), status: 'pendiente' },
  { id: 8, clientName: 'María', clientLastName: 'González', productCategoryTitle: 'Postres', productTitle: 'Flan casero', cant: 1, date: todayPlus(-1), status: 'pendiente' },
];

@Injectable()
export class MockProductInterceptor implements HttpInterceptor {

  private respond(body: any): Observable<HttpEvent<any>> {
    return of(new HttpResponse({ status: 200, body }));
  }

  private parseBody(req: HttpRequest<any>): any {
    if (typeof req.body === 'string') return JSON.parse(req.body);
    return req.body;
  }

  // ── Productos ────────────────────────────────────────────────────────────────

  private loadProducts(): any[] {
    const stored = localStorage.getItem(PRODUCTS_KEY);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  }

  private saveProducts(items: any[]): void {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(items));
  }

  private handleProduct(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (req.url.includes('getProducts')) {
      return this.respond(this.loadProducts());
    }
    if (req.url.includes('uploadProduct')) {
      const items = this.loadProducts();
      const p = { ...this.parseBody(req).product, id: nextId(items) };
      items.push(p);
      this.saveProducts(items);
      return this.respond(p);
    }
    if (req.url.includes('editProduct')) {
      const items = this.loadProducts();
      const product = this.parseBody(req).product;
      const idx = items.findIndex((i: any) => i.id === product.id);
      if (idx !== -1) items[idx] = product;
      this.saveProducts(items);
      return this.respond(product);
    }
    if (req.url.includes('deleteProduct')) {
      const idProduct = Number(req.params.get('idProduct'));
      this.saveProducts(this.loadProducts().filter((i: any) => i.id !== idProduct));
      return this.respond({});
    }
    return this.respond({});
  }

  // ── Categorías ───────────────────────────────────────────────────────────────

  private loadCategories(): any[] {
    const stored = localStorage.getItem(CATEGORIES_KEY);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(DEFAULT_CATEGORIES));
    return DEFAULT_CATEGORIES;
  }

  private saveCategories(items: any[]): void {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(items));
  }

  private handleCategory(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (req.url.includes('getProductCategories')) {
      return this.respond({ productCategories: this.loadCategories() });
    }
    if (req.url.includes('uploadProductCategory')) {
      const items = this.loadCategories();
      const c = { ...this.parseBody(req).productCategory, id: nextId(items) };
      items.push(c);
      this.saveCategories(items);
      return this.respond({ productCategory: c });
    }
    if (req.url.includes('editProductCategory')) {
      const items = this.loadCategories();
      const cat = this.parseBody(req).productCategory;
      const idx = items.findIndex((i: any) => i.id === cat.id);
      if (idx !== -1) items[idx] = cat;
      this.saveCategories(items);
      return this.respond({ productCategory: cat });
    }
    if (req.url.includes('deleteProductCategory')) {
      const id = Number(req.params.get('idProductCategory'));
      this.saveCategories(this.loadCategories().filter((i: any) => i.id !== id));
      return this.respond({});
    }
    return this.respond({});
  }

  // ── Pedidos ──────────────────────────────────────────────────────────────────

  private loadOrders(): any[] {
    const stored = localStorage.getItem(ORDERS_KEY);
    if (stored) {
      return (JSON.parse(stored) as any[]).map(o =>
        ['pendiente', 'entregado'].includes(o.status) ? o : { ...o, status: 'pendiente' }
      );
    }
    localStorage.setItem(ORDERS_KEY, JSON.stringify(DEFAULT_ORDERS));
    return DEFAULT_ORDERS;
  }

  private saveOrders(orders: any[]): void {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }

  private handleOrder(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (req.url.includes('getAllProductOrders')) {
      return this.respond({ productOrders: this.loadOrders() });
    }
    if (req.url.includes('getProductOrdersByDate')) {
      const dateParam = req.params.get('date');
      const target = new Date(dateParam!);
      target.setHours(0, 0, 0, 0);
      const filtered = this.loadOrders().filter((o: any) => {
        const d = new Date(o.date);
        d.setHours(0, 0, 0, 0);
        return d.toDateString() === target.toDateString();
      });
      return this.respond({ productOrders: filtered });
    }
    if (req.url.includes('addProductOrders')) {
      const orders = this.loadOrders();
      const id = nextId(orders);
      const rows = this.parseBody(req) as any[];
      const newRows = rows.map((r: any, i: number) => ({ ...r, id: id + i }));
      this.saveOrders([...orders, ...newRows]);
      return this.respond({ productOrders: newRows });
    }
    if (req.url.includes('updateOrderStatus')) {
      const idProductOrder = Number(req.params.get('idProductOrder'));
      const status = req.params.get('status') as ProductOrderStatus;
      const orders = this.loadOrders();
      const order = orders.find((o: any) => o.id === idProductOrder);
      if (order) {
        order.status = status;
        this.saveOrders(orders);
      }
      return this.respond({});
    }
    return this.respond({});
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/productCategory/')) return this.handleCategory(req);
    if (req.url.includes('/productOrder/')) return this.handleOrder(req);
    if (req.url.includes('/product/')) return this.handleProduct(req);
    return next.handle(req);
  }
}
