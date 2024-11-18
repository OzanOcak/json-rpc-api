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
erDiagram
    users {
        UUID id PK
        VARCHAR username
        VARCHAR email
        TEXT password_hash
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }
    
    products {
        UUID id PK
        VARCHAR name
        TEXT description
        DECIMAL price
        INT stock_quantity
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }
    
    categories {
        UUID id PK
        VARCHAR name
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }
    
    product_categories {
        UUID id PK
        UUID product_id FK
        UUID category_id FK
    }
    
    orders {
        UUID id PK
        UUID user_id FK
        TIMESTAMP order_date
        VARCHAR status
        DECIMAL total
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }
    
    order_items {
        UUID id PK
        UUID product_id FK
        UUID order_id FK
        INT quantity
        DECIMAL price
    }
    
    carts {
        UUID id PK
        UUID user_id FK
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }
    
    cart_items {
        UUID id PK
        UUID cart_id FK
        UUID product_id FK
        INT quantity
    }
    
    reviews {
        UUID id PK
        UUID product_id FK
        UUID user_id FK
        INT rating
        TEXT comment
        TIMESTAMP created_at
    }
    
    addresses {
        UUID id PK
        UUID user_id FK
        VARCHAR address_line1
        VARCHAR address_line2
        VARCHAR city
        VARCHAR state
        VARCHAR zip_code
    }
    
    payments {
        UUID id PK
        UUID order_id FK
        DECIMAL amount
        TIMESTAMP payment_date
        VARCHAR payment_method
    }
    
    wishlists {
        UUID id PK
        UUID user_id FK
        TIMESTAMP created_at
    }
    
    wishlist_items {
        UUID id PK
        UUID product_id FK
        UUID wishlist_id FK
    }

    users ||--o{ orders : orders
    users ||--o{ carts : carts
    users ||--o{ addresses : addresses
    users ||--o{ reviews : reviews
    users ||--o{ wishlists : wishlists

    products ||--o{ order_items : order_items
    products ||--o{ cart_items : cart_items
    products ||--o{ reviews : reviews
    products ||--o{ product_categories : product_categories
    
    categories ||--o{ product_categories : product_categories
    
    orders ||--o{ order_items : order_items
    orders ||--o{ payments : payments
    
    carts ||--o{ cart_items : cart_items
    
    wishlists ||--o{ wishlist_items : wishlist_items
```
