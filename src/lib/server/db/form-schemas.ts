import {
    object,
    string,
    minLength,
    maxLength,
    optional,
    pipe
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

export type GroupSchema = typeof groupSchema;