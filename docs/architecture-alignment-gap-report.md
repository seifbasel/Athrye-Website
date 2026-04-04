# Coinat Architecture Alignment Gap Report

## Summary

This report compares the current Coinat codebase to the TransHub architecture guide and turns that comparison into a phased migration roadmap. The goal is to align the project with the same layering and decision style without doing a broad blind refactor that risks changing product behavior.

Coinat already aligns on several important foundation choices:

- Next.js App Router is used under `src/app`.
- Global provider wiring is centralized near the root layout.
- React Query is already the owner for remote server state.
- Several route pages are intentionally thin.
- Forms already use `react-hook-form` with Zod validation.

The main architecture gaps that need intentional follow-up are:

- API modules currently live in `src/api/*` instead of `src/services/endpoints/*`.
- Hooks are mostly flat files in `src/hooks` instead of one operation per file under `src/hooks/<domain>/`.
- Auth ownership currently lives in a reusable hook rather than a shared auth provider.
- Some features are implemented as broad single files instead of feature folders with barrels.
- Local state responsibilities need to be documented more explicitly as auth context, React Query remote state, or workflow-only local state.

## Current-State Map

### App Shell And Providers

- [`src/app/layout.tsx`](../src/app/layout.tsx) acts as the root shell and already follows the guide's direction by keeping global composition at the top of the tree.
- [`src/app/provider.tsx`](../src/app/provider.tsx) wires global providers and currently mounts:
  - React Query through `QueryClientProvider`
  - cart state through `CartProvider`
- The root layout also owns persistent shell pieces such as the sidebar and footer.

Current assessment:

- The root layout is aligned with the guide's "global providers in the root app layout" principle.
- The provider file should eventually grow into a clearer provider layer, especially once auth is migrated into a shared provider.

### App Routes

Coinat already has several thin App Router pages that mostly delegate to feature components:

- [`src/app/products/page.tsx`](../src/app/products/page.tsx)
- [`src/app/auth/login/page.tsx`](../src/app/auth/login/page.tsx)
- [`src/app/orders/[id]/page.tsx`](../src/app/orders/%5Bid%5D/page.tsx)

Current assessment:

- This is already close to the target route composition style.
- Some routes still use page-level hooks like `useParams()` inside the page rather than receiving params directly from the route boundary, but the pages remain thin overall.

### Features

Feature code already exists under `src/features`, which is a strong match to the target architecture. Current examples include:

- `src/features/catalog/products.tsx`
- `src/features/products/product-card.tsx`
- `src/features/orders/order-detail.tsx`
- `src/features/checkout/checkout.tsx`
- `src/features/auth/login/login.tsx`

Current assessment:

- The project already uses a feature-oriented UI layer.
- The main mismatch is granularity and structure: several features are broad top-level files instead of grouped folders with `components/`, `schema/`, optional `types/` or `stores/`, and `index.ts`.

### Hooks

Remote-data hooks exist and are React Query based, for example:

- [`src/hooks/use-products.ts`](../src/hooks/use-products.ts)
- [`src/hooks/use-product.ts`](../src/hooks/use-product.ts)
- [`src/hooks/use-order.ts`](../src/hooks/use-order.ts)
- [`src/hooks/use-orders.ts`](../src/hooks/use-orders.ts)
- [`src/hooks/use-favorites.ts`](../src/hooks/use-favorites.ts)
- [`src/hooks/use-auth.ts`](../src/hooks/use-auth.ts)

Current assessment:

- React Query ownership is already established, which matches the guide.
- Hook layout does not yet match the desired domain-based operation-per-file structure.
- `useOrders` and `useFavorites` mix query ownership with write helpers and local orchestration, which is practical today but should be split into narrower operation hooks during migration.

### API/Data Access

Coinat currently splits data access between:

- [`src/lib/api-client.ts`](../src/lib/api-client.ts) for Axios configuration, token storage helpers, token refresh, interceptors, and `apiFetch`
- `src/api/*.ts` for domain-specific API calls

Examples:

- [`src/api/products-api.ts`](../src/api/products-api.ts)
- [`src/api/orders-api.ts`](../src/api/orders-api.ts)
- [`src/api/favorites-api.ts`](../src/api/favorites-api.ts)
- [`src/api/auth-api.ts`](../src/api/auth-api.ts)

Current assessment:

- The codebase already has the core ingredients of the guide: one shared Axios client, centralized auth token logic, and domain modules for HTTP calls.
- The main gap is placement and responsibility split. `src/lib/api-client.ts` currently combines what the guide expects to be separated across `services/axios.ts`, `services/interceptors.ts`, and endpoint modules.

### Shared UI

Shared UI is already separated from feature-level code:

- `src/components/ui/*` contains reusable primitives.
- `src/components/*` contains shared app-level building blocks.

Current assessment:

- This is aligned with the guide.
- Shared UI appears data-agnostic, which is the desired boundary.

### Stores, Types, And Utilities

- `src/stores/cart-store.tsx` holds local cart workflow state via React context.
- `src/types/*` contains shared domain contracts such as `auth`, `order`, `product`, and cart-related types.
- `src/lib/*`, `src/utils/*`, and `src/config/*` hold shared helpers and configuration.

Current assessment:

- Shared types and utilities already follow the intended separation well.
- Local state exists for cart workflow, which should remain local rather than being pushed into React Query.

## Gap Analysis Against The TransHub Guide

### 1. API Layer Placement

Current shape:

- Domain calls live in `src/api/*`.
- Axios setup, interceptor behavior, token persistence, and refresh logic all live in [`src/lib/api-client.ts`](../src/lib/api-client.ts).

Target shape:

- `src/services/axios.ts`
- `src/services/interceptors.ts`
- `src/services/endpoints/<domain>.ts`

Gap:

- Coinat has the right concepts but not the target file placement or separation of responsibilities.
- The refactor should be mostly organizational first, not behavioral.

Decision:

- Move toward `src/services` without changing request behavior, token semantics, or response typing conventions unless necessary for correctness.

### 2. Hook Structure

Current shape:

- Hooks are mostly flat files under `src/hooks`.
- Some hooks combine multiple operations, cache writes, and domain orchestration.

Target shape:

- One hook per use case under `src/hooks/<domain>/use-*.ts`.

Gap:

- The current hook layer is functional but not yet aligned with the TransHub operation-per-file pattern.

Decision:

- Normalize high-value domains first and preserve existing query keys to avoid churn in consumer behavior.

### 3. Auth Ownership

Current shape:

- [`src/hooks/use-auth.ts`](../src/hooks/use-auth.ts) owns auth session bootstrap, current-user querying, persistence, login/signup helpers, logout cleanup, and profile update behavior.

Target shape:

- Shared auth provider owns auth state.
- `useAuth` becomes a consumer API over provider context.

Gap:

- Auth ownership is centralized, but it is centralized in a hook rather than a provider.

Decision:

- Migrate auth ownership into a provider while keeping `useAuth` available as the stable feature-facing interface.

### 4. Feature Folder Structure

Current shape:

- `src/features` is already the primary UI ownership layer.
- Several capabilities are represented as single broad files instead of nested feature folders.

Target shape:

- Feature folders with grouped `components/`, `schema/`, optional `types/`, optional `stores/`, and `index.ts`.

Gap:

- This is mostly a structure and maintainability mismatch, not a product behavior problem.

Decision:

- Restructure only the highest-value areas first: auth, catalog/products, orders, and checkout.

### 5. State Strategy

Current shape:

- Remote server state: React Query
- Auth state: reusable hook with React Query plus local storage orchestration
- Cart/workflow state: React context in [`src/stores/cart-store.tsx`](../src/stores/cart-store.tsx)

Target style from the guide:

- Remote server state: React Query
- Auth state: shared context provider
- Local workflow state: localized client state tool
- Transitional/mock state: store-based when backend is incomplete

Gap:

- Coinat already uses the correct split in spirit, but the boundaries need to be documented and tightened.

Decision:

- Keep cart and checkout workflow state local.
- Do not force cart or stepper state into React Query.
- Move auth to provider ownership and keep remote resource fetching in React Query.

## Migration Roadmap

### Phase 1: Auth Foundation

Goals:

- Introduce shared auth provider ownership.
- Keep `useAuth` as the public API for feature code.
- Move session bootstrap, current-user hydration, and logout cache clearing into the provider layer.

Implementation direction:

- Add `src/providers/auth-provider.tsx`.
- Move the internal stateful logic from [`src/hooks/use-auth.ts`](../src/hooks/use-auth.ts) into the provider.
- Keep a thin `useAuth` hook that reads auth context and exposes the same public surface area.
- Mount the auth provider from [`src/app/provider.tsx`](../src/app/provider.tsx).

Success criteria:

- Existing feature code continues to call `useAuth`.
- Auth behavior remains unchanged from a user perspective.

### Phase 2: API Layer Normalization

Goals:

- Split shared API infrastructure from endpoint modules.
- Move current `src/api/*` files toward `src/services/endpoints/*`.

Implementation direction:

- Introduce:
  - `src/services/axios.ts`
  - `src/services/interceptors.ts`
  - `src/services/endpoints/auth.ts`
  - `src/services/endpoints/products.ts`
  - `src/services/endpoints/orders.ts`
  - `src/services/endpoints/favorites.ts`
- Keep current request and refresh behavior stable while extracting logic from [`src/lib/api-client.ts`](../src/lib/api-client.ts).
- Convert consumers incrementally so the old modules can be retired safely.

Success criteria:

- There is still one shared Axios setup path.
- Token and refresh logic stays centralized.
- Domain endpoint modules become the only place for direct HTTP calls.

### Phase 3: Hook Normalization

Goals:

- Replace broad or mixed-responsibility hooks with one hook per use case.
- Match the TransHub operation-based naming and folder layout.

Implementation direction:

- Create domain folders such as:
  - `src/hooks/products/`
  - `src/hooks/orders/`
  - `src/hooks/favorites/`
  - `src/hooks/auth/`
- Split current hooks into operations such as:
  - `use-get-products`
  - `use-get-product-by-id`
  - `use-get-orders`
  - `use-get-order-by-id`
  - `use-create-order`
  - `use-cancel-order`
- Preserve the existing query key contracts in [`src/lib/query-keys.ts`](../src/lib/query-keys.ts) unless an incompatibility makes a change necessary.

Success criteria:

- Each hook has one clear responsibility.
- Mutation-side cache updates and invalidations are owned by the hook layer.

### Phase 4: Feature Restructuring

Goals:

- Bring the highest-value UI areas into the target feature-folder pattern.

Priority domains:

- auth
- catalog/products
- orders
- checkout

Implementation direction:

- Restructure broad feature files into folders with:
  - `components/`
  - `schema/` where forms exist
  - optional `types/`
  - optional `stores/`
  - `index.ts`
- Preserve route URLs and visible behavior while moving code into better boundaries.

Success criteria:

- Route pages continue to compose features rather than implement them.
- Feature entrypoints are clearer and easier to import through barrels.

### Phase 5: Route Cleanup

Goals:

- Keep route files thin and consistent with the target architecture.

Implementation direction:

- Review routes after Phases 1 through 4 and move any remaining business logic into hooks, providers, or feature components.
- Keep pages focused on params, guards, and feature composition.

Success criteria:

- No route page becomes a business-logic implementation file.

## Public Interfaces And Types

The migration should preserve these public decisions:

- `useAuth` remains available as the public feature-facing auth API.
- Existing route URLs remain unchanged.
- Shared contracts continue to live in `src/types/*`.
- Existing React Query key behavior remains stable unless a migration step explicitly documents a change.
- New endpoint modules should expose domain-noun exports and type their payloads consistently.

## Test Plan

Validate each migration phase against these scenarios:

- Auth bootstrap restores a saved session when valid.
- Invalid or expired auth state is cleared safely.
- Login, signup, logout, and profile update flows still work.
- Product listing and product detail queries continue to resolve correctly.
- Orders list and order detail screens still render through the same routes.
- Order placement and order cancel flows still update cache state correctly.
- Favorites still work for both authenticated and guest users.
- Checkout continues to use local workflow/cart state and is not incorrectly migrated into remote state.
- Route pages stay thin and do not accumulate new business logic during migration.

## Assumptions

- This document is the first deliverable; it does not itself perform the refactor.
- Auth should ultimately move to a shared provider to match the guide.
- Coinat should align closely with TransHub without silently changing product behavior.
- Cart and checkout workflow state may remain local-state driven because they are not purely server-owned.
- Barrel exports and folder normalization should be introduced where they improve consistency, not as churn for untouched areas.
