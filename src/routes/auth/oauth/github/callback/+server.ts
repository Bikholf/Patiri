// import { github, lucia } from "$lib/server/auth.js";
// import { OAuth2RequestError } from "arctic";
// import { db } from "$lib/server/db/index.js";
// import { user } from "$lib/server/db/schema.js";
// import { eq } from "drizzle-orm";
// import { generateId } from "lucia";
// import { redirect } from "@sveltejs/kit";

// export async function GET({ url, cookies, locals }) {
// 	const code = url.searchParams.get("code");
// 	const state = url.searchParams.get("state");
// 	const storedState = cookies.get("github_oauth_state");
	
// 	if (!code || !state || state !== storedState) {
// 		return new Response("Ungültige OAuth-Anfrage", { status: 400 });
// 	}

	
// 	try {
// 		// Validiert den Autorisierungscode und gibt die Tokens zurück
// 		const tokens = await github.validateAuthorizationCode(
// 			code
// 		);
			
// 		// Verwendet den Access Token, um die Benutzerdaten von GitHub zu holen
// 		// Diese Methode ist entscheidend, um das providerUser-Objekt zu erhalten
// 		const providerUser = await github.getUser(tokens.accessToken);
		
// 		const existingUsers = await db
// 			.select()
// 			.from(userTable)
// 			.where(eq(userTable.githubId, providerUser.id))
// 			.limit(1);

// 		const existingUser = existingUsers[0];

// 		if (existingUser) {
// 			const session = await lucia.createSession(existingUser.id, {});
// 			const sessionCookie = lucia.createSessionCookie(session.id);
// 			cookies.set(sessionCookie.name, sessionCookie.value, {
// 				path: "/",
// 				...sessionCookie.attributes
// 			});
// 		} else {
// 			const userId = generateId(15);
			
// 			// Neuen Benutzer in der Datenbank erstellen
// 			await db.insert(userTable).values({
// 				id: userId,
// 				githubId: providerUser.id,
// 				username: providerUser.login
// 			});
			
// 			const session = await lucia.createSession(userId, {});
// 			const sessionCookie = lucia.createSessionCookie(session.id);
// 			cookies.set(sessionCookie.name, sessionCookie.value, {
// 				path: "/",
// 				...sessionCookie.attributes
// 			});
// 		}
// 	} catch (e) {
// 		console.error("OAuth-Fehler:", e);
// 		if (e instanceof OAuthRequestError) {
// 			return new Response("Ungültiger Callback", { status: 400 });
// 		}
// 		return new Response("Ein unerwarteter Fehler ist aufgetreten", { status: 500 });
// 	}

// 	throw redirect(302, PUBLIC_URL); // Ersetzen Sie dies durch Ihre Homepage-URL
// }