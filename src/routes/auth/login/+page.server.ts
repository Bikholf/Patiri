// import { google, github } from "$lib/server/auth.js";
// import type { PageServerLoad } from "./$types.js";
// import { generateCodeVerifier, generateState } from "arctic";
// import { dev } from "$app/environment";
// import 'dotenv/config';

// export const load: PageServerLoad = async ({ cookies }) => {
// 	// Neuen, zufälligen State für jede Anmeldeanfrage generieren
// 	const googleState = generateState();
// 	const githubState = generateState();

//     // Neuen Code-Verifier für PKCE genevieve
// 	const googleCodeVerifier = generateCodeVerifier();

// 	// Die Autorisierungs-URLs erstellen
// 	const googleAuthorizationUrl = await google.createAuthorizationURL(
// 		googleState,
// 		googleCodeVerifier,
// 		["openid", "profile", "email"]
// 	);
// 	const githubAuthorizationUrl = await github.createAuthorizationURL(
// 		githubState,
// 		["user:email"]
// 	);

// 	// Den State in einem Cookie speichern, um ihn im Callback zu überprüfen
// 	// Den State und Code-Verifier in einem httpOnly Cookie speichern
// 	cookies.set("google_oauth_state", googleState, {
// 		path: "/",
// 		secure: process.env.NODE_ENV === "production",
// 		httpOnly: true
// 	});
// 	cookies.set("google_oauth_code_verifier", googleCodeVerifier, {
// 		path: "/",
// 		secure: process.env.NODE_ENV === "production",
// 		httpOnly: true
// 	});
// 	cookies.set("github_oauth_state", githubState, {
// 		path: "/",
// 		secure: process.env.NODE_ENV === "production",
// 		httpOnly: true
// 	});

// 	return {
// 		googleAuthorizationUrl,
// 		githubAuthorizationUrl
// 	};
// };