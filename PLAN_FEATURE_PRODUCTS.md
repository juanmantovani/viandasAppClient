# Plan: Feature/Products

## Contexto

Los **productos** son ítems opcionales (postres, ensaladas, etc.) que no forman parte del menú semanal/mensual.
El cliente los puede agregar en un nuevo step del stepper al crear su pedido habitual.
Cada producto tiene un **stock** que se descuenta automáticamente al confirmar el pedido.
Solo se muestran al cliente los productos con stock disponible (> 0).

---

## Capa de datos (shared)

### 1. Modelo
- `src/app/shared/models/Product.ts`
  - Campos: `id`, `title`, `description`, `price`, `image`, `stock`, `available`

> El producto tiene tanto `stock: number` como `available: boolean`. El cliente solo ve productos donde ambos son positivos (`available: true` y `stock > 0`). El admin puede desactivar un producto independientemente del stock (ej: ítem de temporada, producto en reformulación).

### 2. DTOs
- `src/app/shared/dto/product/GetProductResponse.ts`
- `src/app/shared/dto/product/AddProductRequest.ts` / `AddProductResponse.ts`
- `src/app/shared/dto/product/EditProductRequest.ts` / `EditProductResponse.ts`
- `src/app/shared/dto/product/DeleteProductRequest.ts` / `DeleteProductResponse.ts`

### 3. Rutas
- `src/app/shared/routes/internal.routes.ts` → agregar `PRODUCT: 'product'`
- `src/app/shared/routes/api.routes.ts` → agregar bloque `PRODUCT` con `GETPRODUCTS`, `ADDPRODUCT`, `EDITPRODUCT`, `DELETEPRODUCT`

### 4. Servicio
- `src/app/shared/services/product.service.ts` — métodos CRUD siguiendo el patrón de `food.service.ts`

---

## ABM Admin

### 5. Componente lista
- `src/app/components/administration/product/product.component.ts/html/css`
- Tabla Material con columnas: título, descripción, precio, **stock**, **disponible**, acciones
- Botones Add / Edit / Delete (misma mecánica que `food.component`)
- El admin puede editar el stock y la visibilidad manualmente desde el formulario

### 6. Componente formulario (dialog)
- `src/app/components/administration/product-form/product-form.component.ts/html/css`
- Campos: título, descripción, precio, **stock** (número entero ≥ 0), **disponible** (checkbox), imagen (ngx-dropzone)

### 7. Routing y navegación
- `src/app/app-routing.module.ts` → agregar `{ path: 'product', component: ProductComponent }` como child de `administration`
- `src/app/components/administration/sidenav/sidenav.component.html` → agregar item "Productos" entre Platos y Menú
- `src/app/components/administration/sidenav/sidenav.component.ts` → agregar constante `PRODUCT`

---

## Flow de pedido cliente — nuevo step

El stepper actual tiene 5 steps (índices 0–4). El nuevo step **"Agregá productos"** se inserta entre
Dirección (step 3) y Confirmación (step 4), quedando 6 steps en total:

| Index | Label | Lógica en `onStepComplete` |
|-------|-------|---------------------------|
| 0 | ¿En qué fecha vas a pedir? | `getMenuViewer()` |
| 1 | ¿Qué menú vas a elegir? | `onGetMenu()` |
| 2 | Verifica los platos y las cantidades | `onViewOrderByDay()` |
| 3 | Dirección de entrega | `onLoadProducts()` (precarga para el step siguiente) |
| **4** | **¿Querés agregar algo más?** | guarda `selectedProducts` |
| 5 | Confirmación | `onGetTotal()` → luego `sendOrder()` |

### 8. Componente de selección de productos
- `src/app/components/clients/order/order-products/order-products.component.ts/html/css`
- Lista de cards: imagen, nombre, precio, **stock disponible** y contador de cantidad
- `@Input() products: Product[]` (ya filtrados con `stock > 0`)
- `@Output() productsSelected: EventEmitter<ProductOrder[]>`
- El contador de cada producto no puede superar su `stock`
- El step es opcional (se puede avanzar sin seleccionar nada)
- Si no hay ningún producto con stock, muestra mensaje "No hay productos disponibles por el momento" y permite avanzar

### 9. Cambios en `inicio-order.component`
- Agregar propiedades: `availableProducts: Product[]`, `selectedProducts: ProductOrder[]`
- Nuevo método `onLoadProducts()` → llama `productService.getProducts()` y filtra `available && stock > 0`
- Nuevo `<mat-step>` en el HTML entre "Dirección de entrega" y "Confirmación"
- Ajustar `onStepComplete` switch:
  - case 3 → `onLoadProducts()` (precarga mientras el usuario ve la dirección confirmada)
  - case 4 → _(sin lógica pesada, `selectedProducts` ya fue emitido por el componente hijo)_
  - case 5 → `onGetTotal()`
  - case 6 → `sendOrder()`
- Ajustar `onClickBack` para contemplar el índice nuevo

### 10. Modelo intermedio y request
- Interfaz local `ProductOrder`: `{ product: Product, cant: number }`
- Actualizar `src/app/shared/dto/order/AddOrderRequest.ts` para incluir `products: ProductOrderRequest[]`
  - `ProductOrderRequest`: `{ idProduct: number, cant: number }`
- Actualizar `generateRequest()` en `inicio-order.component.ts` para incluir los productos seleccionados

### 11. Descuento de stock (backend)
- Al procesar `POST /order/uploadOrder`, el backend descuenta `cant` unidades del stock de cada producto incluido en el pedido
- El frontend no maneja stock localmente; siempre consulta el estado real al entrar al step
- Supuesto: el backend valida que el stock sea suficiente y retorna error si no lo es

---

## Registro en app.module.ts
- Declarar todos los nuevos componentes en `src/app/app.module.ts`

---

## Supuestos / Alcance
- El **backend** implementa los endpoints y la lógica de descuento de stock (fuera del scope del frontend).
- Endpoints asumidos: `/app/product/getProducts`, `/app/product/uploadProduct`, `/app/product/editProduct`, `/app/product/deleteProduct`
- El admin recarga el stock y controla la visibilidad manualmente desde el ABM (no hay reposición automática).
- Un producto puede tener stock pero estar oculto (`available: false`), o estar activo pero sin stock (`stock: 0`).
- La selección de productos es opcional; el cliente puede avanzar sin elegir ninguno.
- El contador en el step cliente está limitado por el stock del producto para evitar pedidos imposibles.
