# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server at http://localhost:4200/
npm run build      # Production build
npm test           # Run tests (Karma + Jasmine in Chrome)
npm run watch      # Build with watch mode
```

## Architecture

Angular 14 food delivery app (ViandasApp) with Keycloak authentication. Two protected areas — `/admin/*` and `/client/*` — both guarded by `AuthGuard`. Public routes: `/inicio`, `/menubycategory`.

**Domain entities:** Menus (weekly food schedules), Orders, Products (optional add-ons like desserts), Clients, Addresses, Tandas (delivery batches), Drivers, Zones, Pathologies (dietary restrictions).

### Layer structure

- `src/app/shared/services/` — all HTTP logic; each entity has its own `*.service.ts`
- `src/app/shared/dto/` — typed request/response classes for every API call; builders are `DataForm*` classes
- `src/app/shared/models/` — domain entity classes (separate from DTOs)
- `src/app/shared/routes/api.routes.ts` — all backend endpoint URLs in one place
- `src/app/shared/routes/internal.routes.ts` — all frontend route paths
- `src/app/components/administration/` — admin panel components
- `src/app/components/clients/` — client portal components
- `src/app/auth/` — Keycloak initializer, `AuthGuard`, `ExitGuard`

### HTTP & error handling

- `SpinnerInterceptor` — tracks in-flight requests to show/hide global spinner
- `ServerErrorInterceptor` — auto-retries 500s (max 2 retries, 2s delay); redirects to login on 400/403; shows success toast on 201
- `GlobalErrorHandler` + `DiscordErrorLogger` — unhandled errors are logged to a Discord webhook
- `DiscordSendOrder` — order notifications sent to Discord on confirmation

### State management

No NgRx. Services return RxJS `Observable`s; components subscribe directly or use the `async` pipe. Reactive Forms (`FormGroup`/`FormControl`) manage form state locally.

### Authentication

Keycloak (realm `viandas`, client `viandas`). `check-sso` on load — users are not forced to log in for public pages. Dev server: `http://localhost:9000/auth`. Config: `src/environments/keycloak.config.ts`.

### Client order flow

Six-step Angular Material stepper in `src/app/components/clients/order/inicio/`. Steps: categories → food list → products (optional add-ons) → address → resume → confirmation. The order-products step is the current `feature/products` addition.

### Adding a new entity (common pattern)

1. Add model to `src/app/shared/models/`
2. Add DTOs to `src/app/shared/dto/<entity>/`
3. Add service to `src/app/shared/services/` (HTTP calls via typed DTOs)
4. Add API endpoints to `src/app/shared/routes/api.routes.ts`
5. Add route constants to `src/app/shared/routes/internal.routes.ts`
6. Create admin components in `src/app/components/administration/<entity>/` and `<entity>-form/`
7. Register components in `src/app/app.module.ts` and routes in `src/app/app-routing.module.ts`

### Environment configuration

- Dev API: `http://localhost:8080/app` (`src/environments/environment.ts`)
- Prod API: `https://backend.integralviandas.com.ar/app` (`environment.prod.ts`)
