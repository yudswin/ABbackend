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