// import { google, lucia } from "$lib/server/auth.js";
// import { OAuth2RequestError } from "arctic";
// import { db } from "$lib/server/db/index.js";
// import { user } from "$lib/server/db/schema.js";
// import { eq } from "drizzle-orm";
// import { generateId } from "lucia";
// import { PUBLIC_URL } from "$env/static/public";
// import { redirect } from "@sveltejs/kit";
// import * as arctic from "arctic";


// export async function GET({ url, cookies, locals }) {
//     const code = url.searchParams.get("code");
//     const state = url.searchParams.get("state");
//     const storedState = cookies.get("google_oauth_state");
//     const storedCodeVerifier = cookies.get("google_oauth_code_verifier");

//     if (!code || !state || state !== storedState) {
//         return new Response("Ungültige OAuth-Anfrage", { status: 400 });
//     }

//     if (!storedCodeVerifier) {
//         return new Response("Ungültiger Code-Verifier", { status: 400 });
//     }

//     try {
//         // Validiert den Autorisierungscode und gibt die Tokens zurück
//         const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);
//         const idToken = tokens.idToken();
//         const claims = arctic.decodeIdToken(idToken);

//         // Verwende die Ansprüche aus dem ID-Token als Benutzerdaten

//         const existingUsers = await db
//             .select()
//             .from(user)
//             .where(eq(user.googleId, providerUser.id))
//             .limit(1);

//         const existingUser = existingUsers[0];

//         if (existingUser) {
//             const session = await lucia.createSession(existingUser.id, {});
//             const sessionCookie = lucia.createSessionCookie(session.id);
//             cookies.set(sessionCookie.name, sessionCookie.value, {
//                 path: "/",
//                 ...sessionCookie.attributes
//             });
//         } else {
//             const userId = generateId(15);

//             // Neuen Benutzer in der Datenbank erstellen
//             await db.insert(userTable).values({
//                 id: userId,
//                 googleId: providerUser.id,
//                 username: providerUser.name
//             });

//             const session = await lucia.createSession(userId, {});
//             const sessionCookie = lucia.createSessionCookie(session.id);
//             cookies.set(sessionCookie.name, sessionCookie.value, {
//                 path: "/",
//                 ...sessionCookie.attributes
//             });
//         }
//     } catch (e) {
//         console.error("OAuth-Fehler:", e);
//         if (e instanceof OAuthRequestError) {
//             return new Response("Ungültiger Callback", { status: 400 });
//         }
//         return new Response("Ein unerwarteter Fehler ist aufgetreten", { status: 500 });
//     }

//     throw redirect(302, PUBLIC_URL); // Ersetzen Sie dies durch Ihre Homepage-URL
// }