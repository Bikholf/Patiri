import { is } from 'drizzle-orm';
import {
    object,
    string,
    minLength,
    maxLength,
    optional,
    pipe,
    date,
    boolean,
    number,
    minValue,
    maxValue
} from 'valibot';

// export const userFormSchema = object({
//     username: pipe(string(), minLength(2), maxLength(50)),
//     email: pipe(string(), email()),
// });

export const groupSchema = object({
    id: optional(string()), // <-- optionales id-Feld (z.B. UUID/string)
    name: pipe(
        string(),
        minLength(3),
        maxLength(100)
    ),
    description: pipe(
        optional(string(), ""),
        maxLength(500, 'Description cannot exceed 500 characters'),
    ),  // Beschreibung ist optional und hat eine Max-Länge
});

export const invitationLinkSchema = object({
    id: optional(string()), // <-- optionales id-Feld (z.B. UUID/string)
    groupId: pipe(
        optional(string()),
    ),
    creatorId: pipe(
        optional(string()),
    ),
    linkToken: pipe(
        optional(string()),
    ),
    maxUses: optional(pipe(
        number(),
        minValue(1),
        maxValue(100)
    )),  // Beschreibung ist optional und hat eine Max-Länge
    currentUses: optional(pipe(
        number(),
        minValue(0),
        maxValue(100)
    )),
    expiresAt: optional(date()),
    isActive: optional(boolean()),
    createdAt: optional(date()),
});

export type GroupSchema = typeof groupSchema;