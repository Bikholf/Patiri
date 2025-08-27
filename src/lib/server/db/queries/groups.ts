import type { groupSchema, GroupSchema } from "$db/form-schemas.js";
import type { InferInput } from "valibot";
import { db } from "../index.js";
import { groups, members, users } from "../schema.js";
import { eq, sql } from "drizzle-orm";

// Alle Gruppen wo ein User Mitglied ist
export async function getUserGroupsByUserId(userId: string) {
    return await db.query.users.findFirst({
        where: eq(users.id, userId),
        with: {
            memberships: {
                with: {
                    group: {
                        with: {
                            creator: true
                        }
                    }
                }
            }
        }
    });
}

// Mit Creator-Informationen
export async function getUserGroupsWithCreator(userId: string) {
    return await db.query.users.findFirst({
        where: eq(users.id, userId),
        with: {
            memberships: {
                with: {
                    group: {
                        with: {
                            creator: true
                        }
                    }
                }
            }
        }
    });
}

// Mit Creator-Informationen
export async function getAllUserGroupsWithCreator() {
    return await db.query.users.findFirst({
        with: {
            memberships: {
                with: {
                    group: {
                        with: {
                            creator: true
                        }
                    }
                }
            }
        }
    });
}

type NewGroup = typeof groups.$inferInsert;

export async function createGroup(data: NewGroup) {
    return await db.insert(groups).values(data).returning({ createdGroupId: groups.id });
}

type GroupInput = InferInput<typeof groupSchema>;

export async function updateGroup(groupId: string, data: Partial<GroupInput>) {
  try {
    const [updated] = await db
      .update(groups)
      .set({ ...data, updatedAt: sql`NOW()` })
      .where(eq(groups.id, groupId))
      .returning(); // falls Postgres
    return updated ?? null;
  } catch (err) {
    console.error('[updateGroup] error:', err);
    throw err;
  }
}

export async function addUserToGroup(userId: string, groupId: string, role: string = "member") {
    return await db.insert(members).values({
        userId,
        groupId,
        role
    })
}

export async function deleteGroup(groupId: string) {
    return await db.delete(groups).where(eq(groups.id, groupId));
}