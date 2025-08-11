import { db } from "../index.js";
import { users } from "../schema.js";
import { eq } from "drizzle-orm";

// Super einfach - alle Gruppen eines Benutzers
export async function getUserGroups(userId: string) {
    return await db.query.users.findFirst({
        where: eq(users.id, userId),
        with: {
            memberships: {
                with: {
                    group: true
                }
            }
        }
    });
}

// Nur aktive Mitgliedschaften
export async function getActiveUserGroups(userId: string) {
    return await db.query.users.findFirst({
        where: eq(users.id, userId),
        with: {
            memberships: {
                where: (members, { eq }) => eq(members.isActive, true),
                with: {
                    group: true
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