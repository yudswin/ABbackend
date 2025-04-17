<div align="center">
  
  <div>
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-drizzle-black?style=for-the-badge&logoColor=C5F74F&logo=drizzle&color=000000" alt="drizzleorm" />
    <img src="https://img.shields.io/badge/-PostgreSQL-black?style=for-the-badge&logoColor=white&logo=postgresql&color=4169E1" alt="postgresql" />
    <img src="https://img.shields.io/badge/-MySQL-black?style=for-the-badge&logoColor=white&logo=mysql&color=4479A1" alt="mysql" />
  </div>

  <h3 align="center">AB Backend Demo</h3>

   <div align="center">
     This Demo implement with <a href="https://orm.drizzle.team/" target="_blank"><b>Drizzle ORM</b></a> 
    </div>
</div>

## 📋 <a name="table">Table of Contents</a>
1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕷️ [Snippets](#️snippets)
6. 🔗 [Limitation](#limitations--not-intended-for)


## <a name="introduction">🤖 Introduction</a>
This is a minimal, structured backend server built specifically for my courses. It’s designed to support A/B testing of database providers (MySQL vs PostgreSQL) in different environments using a clean, scalable architecture.

While working on a involving video streaming services, I needed a server setup that could dynamically switch between databases based on environment settings—MySQL in development and PostgreSQL (via Neon) in production.

Rather than rebuild this structure repeatedly, I created this reusable backend template for **fast prototyping** and **environment-based behavior testing**.


> ⚠️ Note: This template is intended for a very **specific use case**—it’s not a general-purpose backend starter. See the [Limitations](#limitations--not-intended-for) section below.

## <a name="tech-stack">⚙️ Tech Stack</a>
- **Runtime:** Node.js (Latest LTS)
- **Language:** TypeScript
- **Server:** Express.js
- **ORM:** Drizzle ORM
- **Database:** 
  - MySQL for development
  - PostgreSQL via [Neon](https://neon.tech/) for production

## <a name="features">🔋 Features</a>
- 🌱 TypeScript-first setup
- ⚡ Fast and lightweight: built on Express
- 🧱 Clean project structure (MVC-like)
- 🌐 Environment-based database switching
- 🧪 Built-in A/B testing logic for DB providers
- 🐘 PostgreSQL (via Neon) and 🐬 MySQL support using [Drizzle ORM](https://orm.drizzle.team/)
- 📦 Simple and modular: routers → controllers → services
- 📞 Basic REST API with *GET*, *POST*, *PUT*, *UPDATE*.
  
## <a name="quick-start">🤸 Quick Start</a>

### Prerequisites
Make sure you have the following installed on your machine:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

Install the project dependencies using npm:

```bash
npm install
```

### Environment Variables
Copy the `.env.example` file to `.env` and update the  `MYSQL` instances or `DATABASE_URL`. you can sign up for free and create a Postgres database at https://neon.tech

```bash
cp .env.example .env
```

```env
NODE_ENV="development"
MYSQL_URL=
MYSQL_HOST=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=
```

For production:
```env
NODE_ENV="production"
DATABASE_URL=
```
### Configurations
This project have multiple config files in the project, it’s very useful which the scenario of implementing multiple database stages or multiple databases or different databases on the same project. See more at [Multiple configuration files with Drizzle](https://orm.drizzle.team/docs/drizzle-config-file#multiple-configuration-files)

<details>
<summary><code>drizzle-dev.config.ts</code></summary>

```typescript
import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
    out: './drizzle/mysql',
    dialect: "mysql",
    schema: "./src/model/mysql/*.schema.ts",
    dbCredentials: {
        url: process.env.MYSQL_URL!,
    }
});
```

</details>

<details>
<summary><code>drizzle-production.config.ts</code></summary>

```typescript
import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
    out: './drizzle/neonhttp',
    dialect: "postgresql",
    schema: "./src/model/pg/*.schema.ts",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
```
</details>

### Migration

- `generation`: creates migration files from schema changes
- `migrate`: apply generated migration into DB
- `pull`: convert schema to Drizzle schema
- `push`: apply Drizzle schema into DB
- `check`: checking race condition 
- `up`: upgrade snapshots of previously generated migrations

Run migration `npm run {option}`

<details> <summary>Production Environment </summary>

```json
"migrate:prod:generation": "drizzle-kit generate --config=drizzle-production.config.ts",
"migrate:prod:migrate": "drizzle-kit migrate --config=drizzle-production.config.ts",
"migrate:prod:pull": "drizzle-kit pull --config=drizzle-production.config.ts",
"migrate:prod:push": "drizzle-kit push --config=drizzle-production.config.ts",
"migrate:prod:check": "drizzle-kit check --config=drizzle-production.config.ts",
"migrate:prod:up": "drizzle-kit up --config=drizzle-production.config.ts",
```

</details>  


<details> <summary>Development Environment </summary>

```jsonld
"migrate:dev:generation": "drizzle-kit generate --config=drizzle-dev.config.ts",
"migrate:dev:migrate": "drizzle-kit migrate --config=drizzle-dev.config.ts",
"migrate:dev:pull": "drizzle-kit pull --config=drizzle-dev.config.ts",
"migrate:dev:push": "drizzle-kit push --config=drizzle-dev.config.ts",
"migrate:dev:check": "drizzle-kit check --config=drizzle-dev.config.ts",
"migrate:dev:up": "drizzle-kit up --config=drizzle-dev.config.ts",
```

</details>  

### Running the Project

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

You can explore your SQL database by using Drizzle Studio 

```base
npx drizzle-kit studio --config=drizzle-dev.config.ts
```

See more about [Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview)


## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>@routes/user.route.ts</code></summary>

```typescript
import { Router } from 'express';
import * as userController from "@controllers/user.controller"

const router = Router();

router.post('/create', userController.createUser);

export default router;
```
</details>

<details>
<summary><code>@controllers/user.controller.ts</code></summary>

```typescript
import { Request, Response } from 'express';
import * as userService from "@services/user.service"

export const createUser = async (req: Request, res: Response) => {
    try {
        console.log('Incoming request body:', req.body);
        const { name, age, email } = req.body;
        console.log(req.body);
        const result = await userService.createUser(name, age, email);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.log(error);
    }
};
```
</details>

<details>
<summary><code>@services/user.service.ts</code></summary>

```typescript
import { usersTable as pgUsers } from "@schema/pg/user.schema";
import { usersTable as sqlUsers } from "@schema/sql/user.schema";
import { getDB } from '@db/client';
import { eq } from "drizzle-orm";

export const getUsers = async () => {
    const db = getDB();
    try {
        if (db.type === "mysql") {
            return await db.client.select().from(sqlUsers);
        } else {
            return await db.client.select().from(pgUsers);
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
```
</details>

<details>
<summary><code>@schemas</code></summary>

```typescript
// mysql schema
import { mysqlTable, int, varchar, timestamp } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users', {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    createdAt: timestamp('created_at').notNull().defaultNow()
});

// postgre (neon) schema
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
    email: varchar({ length: 255 }).notNull(),
});
```
</details>

## <a name="limitations--not-intended-for">⚠️ Limitations / Not Intended For</a>
This template is built for **experimental** and **academic purposes**, not production-scale applications.

- ❌ Not intended for general-purpose APIs
- ❌ No frontend or SSR support
- ❌ No authentication layer (add your own)
- ❌ No support for GraphQL or real-time (WebSocket) features
