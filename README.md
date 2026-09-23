<div align="center">

# Pizzeria Vesuvio

A pizza ordering app: browse the menu, build a cart, place an order, track it until delivery.

React 18 · Redux Toolkit · React Router 6 data APIs · Tailwind + custom CSS

<br />

<img src="screenshots/02-menu.png" alt="The menu" width="90%" />

</div>

<br />

---

## The flow

<table>
<tr>
<td width="50%" valign="top">

**Welcome**

The guest's name is stored once and reused on the cart, the checkout form and the header tag.

<img src="screenshots/01-home.png" alt="Welcome screen" />

</td>
<td width="50%" valign="top">

**Menu**

Loaded by a React Router `loader`, so the data is ready before the route renders. Sold-out pizzas are greyed out and stamped.

<img src="screenshots/03-menu-cart.png" alt="Menu with the order docket" />

</td>
</tr>
<tr>
<td width="50%" valign="top">

**Cart**

Quantities change through Redux reducers. Dropping an item to zero removes it, because `decreaseItemQuantity` calls `deleteItem` instead of repeating the rule.

<img src="screenshots/04-cart.png" alt="Cart with quantity steppers" />

</td>
<td width="50%" valign="top">

**Checkout**

Submitted through a route `action`. The phone number is validated there and errors come back via `useActionData`, so the form holds no error state of its own.

<img src="screenshots/05-order-form.png" alt="Checkout form" />

</td>
</tr>
<tr>
<td width="50%" valign="top">

**Validation**

When the phone number is wrong the action returns errors instead of redirecting, and they render next to the field.

<img src="screenshots/07-validation.png" alt="Inline validation error" />

</td>
<td width="50%" valign="top">

**Order status**

Countdown to delivery, itemised receipt, priority badge. An order can be upgraded to priority afterwards through a second action.

<img src="screenshots/06-order-status.png" alt="Order status page" />

</td>
</tr>
</table>

<details>
<summary><b>Empty cart and mobile</b></summary>

<br />

<table>
<tr>
<td width="52%" valign="top"><img src="screenshots/08-empty-cart.png" alt="Empty cart" /></td>
<td width="24%" valign="top"><img src="screenshots/09-mobile-menu.png" alt="Menu on mobile" /></td>
<td width="24%" valign="top"><img src="screenshots/10-mobile-cart.png" alt="Cart on mobile" /></td>
</tr>
</table>

</details>

---

## Why Redux is here

The cart is written from the menu page, read by the header, edited on the cart page, serialised into the checkout form, and cleared by a route action that runs outside the React tree. Threading that through props would mean passing it down five components that have no interest in it. That is what a store is for.

The menu and the orders are a different thing. They belong to the server, so they are not in Redux at all. React Router's `loader` and `action` own them, which means no hand-written loading flags and no stale copy of the server's data sitting in memory.

| State | Lives in | Why |
|---|---|---|
| Menu, order details | Route `loader` | Server state, fetched per route |
| Placing / updating an order | Route `action` | A write, with its validation and redirect |
| Cart | Redux slice | Global, many readers and writers, survives navigation |
| Guest name, geolocated address | Redux slice | Session-wide, read by three routes |
| Priority checkbox | `useState` | Local to one form |

Context would have covered a cart this size, and on a product this small I would probably use it. I picked Redux Toolkit on purpose, because this project is where I wanted to learn the patterns by writing them:

- `createSlice` for reducers that mutate a draft through Immer while staying immutable underneath
- selectors like `getTotalCartPrice` and `getCurrentQuantityById(id)` as the public surface, so components never learn the shape of the store
- `createAsyncThunk` for "get my position", which resolves geolocation, reverse-geocodes it, and drives `loading → idle | error` in `extraReducers`
- dispatching from outside React once, where the order action clears the cart by importing the store, and knowing why that is an exception rather than the habit

The point of the repo is not that Redux is installed. It is that I can say what belongs in a global store and what does not.

## Stack

| | |
|---|---|
| React 18 | function components, hooks, `StrictMode` |
| React Router 6.11 | `createBrowserRouter`, `loader`, `action`, `useNavigation`, `useActionData`, `errorElement` |
| Redux Toolkit 2 | `configureStore`, `createSlice`, `createAsyncThunk`, selectors |
| Tailwind CSS 3 | utility layer, remapped theme, breakpoints |
| Custom CSS | about 1000 lines carrying the visual identity |
| Vite 4 | dev server and build |
| `Intl` | currency and dates, no date library |

Menu and orders come from a live REST API. Addresses come from reverse-geocoding the browser's coordinates through BigDataCloud.

## Structure

Organised by feature, not by file type, so changing how the cart works means changing one folder.

```
src/
├── features/
│   ├── cart/      Cart, CartItem, CartOverview, UpdateItemQuantity,
│   │              DeleteItem, EmptyCart, cartSlice.js
│   ├── menu/      Menu (+ loader), MenuItem
│   ├── order/     CreateOrder (+ action), Order (+ loader),
│   │              OrderItem, SearchOrder, UpdateOrder (+ action)
│   └── user/      CreateUser, Username, userSlice.js (+ thunk)
├── services/      apiRestaurant.js, apiGeocoding.js
├── ui/            AppLayout, Header, Button, LinkButton, Loader, Error
├── utils/         helpers.js
├── store.js
└── App.jsx        the route tree
```

Every `fetch` lives in `services/` and is called from a loader, an action or a thunk, never from a component. Every data route declares its own `errorElement`, so a failed menu request breaks that route and not the app.

## The design

Red gingham header, black enamel wall sign, paper menu card, pizzas plated on ceramic rings, dotted price leaders, a stamped SOLD OUT, and a pinned paper docket that slides in when the cart fills.

Two rules I worked under. The markup was off limits, so the whole restyle happens in `tailwind.config.js` and `index.css`: the theme is remapped so the same `bg-yellow-400` now resolves to tomato red, and the rest is descendant selectors, `::before` / `::after` and `:has()`. And no images for the chrome, so the gingham, the scalloped valance, the torn paper edge and the plate rings are gradients and shadows.

Responsive to 375px, with a visible focus ring on everything interactive.

---

Architecture follows *The Ultimate React Course* by Jonas Schmedtmann, which I worked through while building this. The API and the pizza photography are his. The design, the CSS behind it and the notes above are mine.

<div align="center">

**Ahmed** · [github.com/ahmedmoh14314-code](https://github.com/ahmedmoh14314-code)

</div>
