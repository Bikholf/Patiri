import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

if (!process.env.AUTH_DRIZZLE_URL) throw new Error('AUTH_DRIZZLE_URL is not set');

export default defineConfig({
    out: './drizzle',
    schema: './src/lib/server/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.AUTH_DRIZZLE_URL,
    },
});