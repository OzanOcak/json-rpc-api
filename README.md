# Project Setup

Create a .env file

```text
DB_HOST=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
DB_PORT=5432
PORT=4000
DATABASE_URL=
```

```bash
docker copmpose up -d
npm install
npm run dev:api
npm run migrate
npm run dev:client
```

## Database Diagram

```mermaid
Table users {
  id UUID [pk]
  username VARCHAR
  email VARCHAR
  password_hash TEXT
  created_at TIMESTAMP
  updated_at TIMESTAMP
}

Table products {
  id UUID [pk]
  name VARCHAR
  description TEXT
  price DECIMAL
  stock_quantity INT
  created_at TIMESTAMP
  updated_at TIMESTAMP
}

Table categories {
  id UUID [pk]
  name VARCHAR
  created_at TIMESTAMP
  updated_at TIMESTAMP
}

Table product_categories {
  id UUID [pk]
  product_id UUID [ref: > products.id]
  category_id UUID [ref: > categories.id]
}

Table orders {
  id UUID [pk]
  user_id UUID [ref: > users.id]
  order_date TIMESTAMP
  status VARCHAR
  total DECIMAL
  created_at TIMESTAMP
  updated_at TIMESTAMP
}

Table order_items {
  id UUID [pk]
  product_id UUID [ref: > products.id]
  order_id UUID [ref: > orders.id]
  quantity INT
  price DECIMAL
}

Table carts {
  id UUID [pk]
  user_id UUID [ref: > users.id]
  created_at TIMESTAMP
  updated_at TIMESTAMP
}

Table cart_items {
  id UUID [pk]
  cart_id UUID [ref: > carts.id]
  product_id UUID [ref: > products.id]
  quantity INT
}

Table reviews {
  id UUID [pk]
  product_id UUID [ref: > products.id]
  user_id UUID [ref: > users.id]
  rating INT
  comment TEXT
  created_at TIMESTAMP
}

Table addresses {
  id UUID [pk]
  user_id UUID [ref: > users.id]
  address_line1 VARCHAR
  address_line2 VARCHAR
  city VARCHAR
  state VARCHAR
  zip_code VARCHAR
}

Table payments {
  id UUID [pk]
  order_id UUID [ref: > orders.id]
  amount DECIMAL
  payment_date TIMESTAMP
  payment_method VARCHAR
}

Table wishlists {
  id UUID [pk]
  user_id UUID [ref: > users.id]
  created_at TIMESTAMP
}

Table wishlist_items {
  id UUID [pk]
  product_id UUID [ref: > products.id]
  wishlist_id UUID [ref: > wishlists.id]
}
```
