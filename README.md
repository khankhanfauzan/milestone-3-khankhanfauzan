# RevoShop

## Overview

RevoShop is a simple e‑commerce demo built with Next.js App Router. It showcases product listing, product detail with server‑side rendering, a client‑side cart, and a statically generated FAQ page. The UI uses Radix UI primitives and Tailwind for styling.

## Screenshots

Home
![Home](./public/screenshots/home.png)

Products
![Products](./public/screenshots/products.png)

Product Detail
![Product Detail](./public/screenshots/product-detail.png)

Cart
![Cart](./public/screenshots/cart.png)

FAQ
![FAQ](./public/screenshots/faq.png)

Admin Products
![Admin Products](./public/screenshots/admin-products.png)

Admin Add Product
![Admin Add Product](./public/screenshots/admin-add-product.png)

Admin Update Product
![Admin Update Product](./public/screenshots/admin-update-product.png)

## Features

- Home highlights new arrivals and categories
- All Products grid with images, names, prices, and navigation to detail
- Product Detail page rendered with SSR (server fetch, gallery, category, price, description)
- Categories list fetched with ISR (Incremental Static Regeneration) via `fetchCategories` revalidating every 60s
- Add to Cart and quantity controls; cart summary and item removal
- FAQ page statically generated (SSG) with cached fetch
- File‑based routing and client‑side navigation via Next.js Link

## Tech Stack

- Next.js 16 (App Router, server components, SSR/SSG)
- React 19 and TypeScript
- Tailwind CSS 4
- Radix UI and lucide‑react icons
- Embla Carousel (autoplay) for carousels
- Axios and Fetch API for data fetching
- LocalStorage utilities for cart/auth persistence

## Deployed Website

[Link](https://milestone-3-khankhanfauzan.vercel.app/)

## Folder Structure

```
.
├─ README.md
├─ .gitignore
├─ bun.lock
├─ components.json
├─ jest.config.js
├─ jest.setup.js
├─ next.config.ts
├─ package.json
├─ postcss.config.mjs
├─ tsconfig.json
├─ public/
│  ├─ screenshots/
│  │  ├─ home.png
│  │  ├─ products.png
│  │  ├─ product-detail.png
│  │  ├─ cart.png
│  │  ├─ faq.png
│  │  ├─ admin-products.png
│  │  ├─ admin-add-product.png
│  │  └─ admin-update-product.png
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
└─ src/
   ├─ __tests__/
   │  ├─ lib/
   │     └─ utils.test.ts
   ├─ actions/
   │  └─ auth.ts
   ├─ app/
   │  ├─ (admin)/
   │  │  └─ admin/
   │  │     ├─ categories/
   │  │     │  └─ page.tsx
   │  │     ├─ dashboard/
   │  │     │  └─ page.tsx
   │  │     ├─ products/
   │  │     │  ├─ [id]/
   │  │     │  │  └─ page.tsx
   │  │     │  ├─ add/
   │  │     │  │  └─ page.tsx
   │  │     │  └─ page.tsx
   │  │     ├─ users/
   │  │     │  └─ page.tsx
   │  │     ├─ layout.tsx
   │  │     └─ page.tsx
   │  ├─ (site)/
   │  │  ├─ cart/
   │  │  │  └─ page.tsx
   │  │  ├─ categories/
   │  │  │  └─ [id]/
   │  │  │     └─ page.tsx
   │  │  ├─ faq/
   │  │  │  └─ page.tsx
   │  │  ├─ login/
   │  │  │  └─ page.tsx
   │  │  ├─ products/
   │  │  │  ├─ [id]/
   │  │  │  │  └─ page.tsx
   │  │  │  └─ page.tsx
   │  │  ├─ layout.tsx
   │  │  └─ page.tsx
   │  ├─ favicon.ico
   │  ├─ globals.css
   │  ├─ layout.tsx
   │  └─ page.tsx
   ├─ components/
   │  ├─ headers/
   │  │  ├─ AdminHeader.tsx
   │  │  ├─ NavBar.tsx
   │  │  └─ NavBarWrapper.tsx
   │  ├─ sidebars/
   │  │  ├─ AdminSidebar.tsx
   │  │  ├─ AppSideBarUser.tsx
   │  │  ├─ AppSidebar.tsx
   │  │  ├─ AppSidebarGroup.tsx
   │  │  └─ AppSidebarWrapper.tsx
   │  ├─ ui/...
   │  ├─ AddToCartAction.tsx
   │  ├─ AppAddProductForm.tsx
   │  ├─ AppDataTable.tsx
   │  ├─ AppProductActions.tsx
   │  ├─ AppProductForm.tsx
   │  ├─ BackButton.tsx
   │  ├─ CartCard.tsx
   │  ├─ CategoryCard.tsx
   │  ├─ CategoryCarousel.tsx
   │  ├─ FAQCard.tsx
   │  ├─ Footer.tsx
   │  ├─ HomeCarousel.tsx
   │  ├─ Loading.tsx
   │  ├─ ProductCard.tsx
   │  ├─ ProductGallery.tsx
   │  └─ SafeImage.tsx
   ├─ hooks/
   │  ├─ use-mobile.ts
   │  └─ useCart.ts
   ├─ lib/
   │  ├─ dal.ts
   │  ├─ definitions.ts
   │  ├─ session.ts
   │  └─ utils.ts
   ├─ services/
   │  ├─ api.ts
   │  └─ storage.ts
   ├─ types/
   │  ├─ auth.ts
   │  ├─ faq.ts
   │  ├─ param.ts
   │  └─ product.ts
   └─ proxy.ts
```
