import { db } from './index.js'; // Ersetze dies durch deinen tatsächlichen Drizzle-Export
import { invitationLinks } from './schema.js';
import { eq, and, gt, or, isNull, sql } from 'drizzle-orm';

/**
 * Erstellt einen neuen Einladungslink für eine Gruppe.
 * @param groupId ID der Gruppe
 * @param creatorId ID des Erstellers
 * @param options Optionen wie maxUses und expiresAt
 * @returns Der generierte Link-Token
 */
export async function createInvitationLink(
    groupId: string,
    creatorId: string,
    options: { maxUses?: number | null; expiresAt?: Date | null }
) {
    const linkToken = crypto.randomUUID();
    await db.insert(invitationLinks).values({
        groupId,
        creatorId,
        linkToken: linkToken,
        maxUses: options.maxUses,
        expiresAt: options.expiresAt,
    });
    return linkToken;
}

/**
 * Findet einen Link und überprüft seine Gültigkeit.
 * @param token Der Einladungs-Token
 * @returns Das Link-Objekt oder null, wenn ungültig
 */
export async function findValidInvitationLink(token: string) {
    const now = new Date();
    const link = await db.select().from(invitationLinks).where(
        and(
            eq(invitationLinks.linkToken, token),
            eq(invitationLinks.isActive, true),
            // Überprüfe, ob der Link nicht abgelaufen ist ODER ob kein Ablaufdatum gesetzt ist
            or(gt(invitationLinks.expiresAt, now), isNull(invitationLinks.expiresAt)),
            // Überprüfe, ob die maxUses nicht erreicht sind ODER ob keine Beschränkung gesetzt ist
            or(gt(invitationLinks.maxUses, invitationLinks.currentUses), isNull(invitationLinks.maxUses))
        )
    ).limit(1);
    
    return link[0] || null;
}

/**
 * Erhöht die Nutzung eines Links und deaktiviert ihn bei Bedarf.
 * @param linkId Die ID des Links
 * @param maxUses Die maximale Nutzung des Links
 */
export async function incrementLinkUses(linkId: string, maxUses: number | null) {
    const updatedLinks = await db.update(invitationLinks)
        .set({
            currentUses: sql`${invitationLinks.currentUses} + 1`,
            isActive: maxUses !== null ? sql`${invitationLinks.currentUses} + 1 >= ${maxUses}` : true
        })
        .where(eq(invitationLinks.id, linkId))
        .returning({ updatedId: invitationLinks.id, newIsActive: invitationLinks.isActive });
        
    return updatedLinks[0];
}

/**
 * Ruft alle Einladungslinks für eine bestimmte Gruppe ab.
 * @param groupId Die ID der Gruppe
 * @returns Eine Liste von Einladungslink-Objekten
 */
export async function getGroupInvitationLinks(groupId: string) {
    return db.select().from(invitationLinks).where(eq(invitationLinks.groupId, groupId));
}

/**
 * Löscht einen Einladungslink (oder deaktiviert ihn).
 * @param linkId Die ID des zu löschenden Links
 */
export async function deleteInvitationLink(linkId: string) {
    await db.delete(invitationLinks).where(eq(invitationLinks.id, linkId));
    // Oder, um den Link zu deaktivieren, ohne ihn zu löschen:
    // await db.update(invitationLinks).set({ isActive: false }).where(eq(invitationLinks.id, linkId));
}
