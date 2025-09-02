import {
    boolean,
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
} from "drizzle-orm/pg-core"
import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import type { AdapterAccountType } from "@auth/core/adapters"
import "dotenv/config.js"
import { max, relations } from "drizzle-orm";

const AUTH_DRIZZLE_URL = process.env.AUTH_DRIZZLE_URL;

if (!AUTH_DRIZZLE_URL) throw new Error('AUTH_DRIZZLE_URL is not set');

const pool = postgres(AUTH_DRIZZLE_URL, { max: 1 })

export const db = drizzle(pool)

export const users = pgTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
})

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccountType>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => [
        {
            compoundKey: primaryKey({
                columns: [account.provider, account.providerAccountId],
            }),
        },
    ]
)

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => [
        {
            compositePk: primaryKey({
                columns: [verificationToken.identifier, verificationToken.token],
            }),
        },
    ]
)

export const authenticators = pgTable(
    "authenticator",
    {
        credentialID: text("credentialID").notNull().unique(),
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        providerAccountId: text("providerAccountId").notNull(),
        credentialPublicKey: text("credentialPublicKey").notNull(),
        counter: integer("counter").notNull(),
        credentialDeviceType: text("credentialDeviceType").notNull(),
        credentialBackedUp: boolean("credentialBackedUp").notNull(),
        transports: text("transports"),
    },
    (authenticator) => [
        {
            compositePK: primaryKey({
                columns: [authenticator.userId, authenticator.credentialID],
            }),
        },
    ]
)

export const groups = pgTable(
    "group",
    {
        id: text("id")
            .primaryKey()
            .notNull()
            .$defaultFn(() => crypto.randomUUID()),
        name: text("name").notNull(),
        description: text("description"),
        maxMembers: integer("maxMembers"),
        createdBy: text("createdBy")
            .notNull()
            .references(() => users.id),
        createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
        updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
    }
)

export const members = pgTable(
    "member",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        groupId: text("groupId")
            .notNull()
            .references(() => groups.id, { onDelete: "cascade" }),
        role: text("role").default("member"), // z.B. "admin", "moderator", "member"
        joinedAt: timestamp("joinedAt", { mode: "date" }).notNull().defaultNow(),
    },
    (member) => [
        {
            compositePk: primaryKey({
                columns: [member.userId, member.groupId],
            }),
        },
    ]
)

export const invitationLinks = pgTable(
    "invitationLink",
    {
        id: text("id").primaryKey().notNull().$defaultFn(() => crypto.randomUUID()),
        creatorId: text("creatorId").notNull().references(() => users.id, { onDelete: "cascade" }),
        groupId: text("groupId").notNull().references(() => groups.id, { onDelete: "cascade" }),
        linkToken: text("link_token").notNull().unique(),
        maxUses: integer("maxUses"),
        currentUses: integer("currentUses").notNull().default(0),
        expiresAt: timestamp("expiresAt", { mode: "date" }),
        createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    }
)

// Relations definieren
export const usersRelations = relations(users, ({ many }) => ({
    memberships: many(members),
    createdGroups: many(groups),
}));

export const groupsRelations = relations(groups, ({ one, many }) => ({
    creator: one(users, {
        fields: [groups.createdBy],
        references: [users.id],
    }),
    members: many(members),
}));

export const membersRelations = relations(members, ({ one }) => ({
    user: one(users, {
        fields: [members.userId],
        references: [users.id],
    }),
    group: one(groups, {
        fields: [members.groupId],
        references: [groups.id],
    }),
}));

export const invitationLinksRelations = relations(invitationLinks, ({ one }) => ({
    creator: one(users, {
        fields: [invitationLinks.creatorId],
        references: [users.id],
    }),
    group: one(groups, {
        fields: [invitationLinks.groupId],
        references: [groups.id],
    }),
}));
