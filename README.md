# Project Setup

Create a .env file

```text
DB_HOST=localhost
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=database
DB_PORT=5432
PORT=4000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/database
```

```bash
docker copmpose up -d
npm install
npm run dev:api
npm run migrate
npm run seed
npm run dev:client

npx drizzle-kit studio
```
