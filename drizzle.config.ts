import { defineConfig } from 'drizzle-kit';

const AUTH_DRIZZLE_URL = process.env.AUTH_DRIZZLE_URL;

if (!AUTH_DRIZZLE_URL) throw new Error('AUTH_DRIZZLE_URL is not set');

export default defineConfig({
    out: './drizzle',
    schema: './src/lib/server/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: AUTH_DRIZZLE_URL,
    },
});     