# BetterWay

A small React e-commerce demo demonstrating a product listing with filters and a simple cart using React Context. The UI uses utility-first classes (Tailwind CSS classes are present in the codebase) for layout and styling.

---

## Live demo

- Live demo: https://better-way-six.vercel.app/

---

## What this repo contains

- Product listing with search, category filter and sort
- Product cards with stock handling and Add to Cart
- Cart with quantity updates, removal, and localStorage persistence
- Context-based global state for products and cart (`ProductContext`, `CartContext`)
- Minimal, component-driven structure

Screenshot of project structure (for reference):
- src/components/Cart.jsx
- src/components/FiltersBar.jsx
- src/components/ProductCard.jsx
- src/components/ProductList.jsx
- src/context/CartContext.jsx
- src/context/ProductContext.jsx
- src/data/product.js
- src/App.jsx, src/main.jsx, src/index.css

---

## Tech stack

- React (JSX)
- Context API (for global state)
- Tailwind CSS (utility classes appear in components; ensure Tailwind is configured in your setup)
- localStorage for cart persistence

---

## Features

- Search products by title
- Filter by category
- Sort by price (low→high, high→low)
- Add to cart (prevents adding beyond stock)
- Update cart item quantities (bounded by stock)
- Remove items from cart
- Cart persisted to `localStorage`

---



## How components fit together

The app root mounts context providers in `main.jsx`:

- `ProductProvider` — provides `useProducts()` hook
  - `filters` state: `{ search, category, sort }`
  - `products` derived via memoized filtering & sorting from `src/data/product.js`
  - `setFilters`, `clearFilters`

- `CartProvider` — provides `useCart()` hook
  - `cartItems` persisted to `localStorage` (`localStorage.getItem("cart")`)
  - `addToCart(product)` — increments existing quantity (bounded by `product.stock`) or adds new item
  - `updateQuantity(id, qty)` — updates quantity (bounded by stock and min 1)
  - `removeFromCart(id)` — removes item

Typical component layout in `App.jsx`:

- `FiltersBar` — search input, category select, sort select, clear button
- `ProductList` — maps `products` to `ProductCard`
- `ProductCard` — shows product info, stock badge, Add to Cart button (disabled when out of stock)
- `Cart` — shows cart items, quantity inputs, remove button, totals

Example hooks usage:
```js
import { useProducts } from "./context/ProductContext";
import { useCart } from "./context/CartContext";

const { products, filters, setFilters } = useProducts();
const { cartItems, addToCart, updateQuantity } = useCart();
```

---

## Project structure

(src/ - important files)

- components/
  - Cart.jsx
  - FiltersBar.jsx
  - ProductCard.jsx
  - ProductList.jsx
- context/
  - CartContext.jsx
  - ProductContext.jsx
- data/
  - product.js (seed product data)
- App.jsx
- main.jsx
- index.css

---

## How to add products

Open `src/data/product.js` and add product objects with fields the components expect, for example:

```js
export const products = [
  {
    id: "p1",
    title: "Wireless Headphones",
    category: "Electronics",
    price: 1999,
    stock: 10,
  },
  // ...
];
```

Fields used by UI:
- id (string or number)
- title (string)
- category (string)
- price (number)
- stock (number)

---

## Local Storage / Persistence

- Cart reads from `localStorage.getItem("cart")` on initialization.
- Cart writes to `localStorage` whenever `cartItems` changes.
- This preserves the cart between page reloads.

---
