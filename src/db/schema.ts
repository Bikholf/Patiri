// schema.ts
import { pgTable, text, timestamp, numeric } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const pool = new pg.Pool();
const db = drizzle(pool);


export const user = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  firstName: text("firstName"),
  lastName: text("lastName"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  githubId: numeric("githubId").unique()
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp("expiresAt", {
    withTimezone: true,
    mode: "date"
  }).notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
}));

export const adapter = new DrizzlePostgreSQLAdapter(db, session, user);
