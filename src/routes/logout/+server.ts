// src/routes/logout/+server.ts
// import { redirect } from "@sveltejs/kit";
// import { lucia } from "$lib/server/auth.js";

// import type { RequestHandler } from "./$types.js";

// export const POST: RequestHandler = async ({ cookies, locals }) => {
// 	if (locals.session) {
// 		await lucia.invalidateSession(locals.session.id);
// 	}

// 	const sessionCookie = lucia.createBlankSessionCookie();
// 	cookies.set(sessionCookie.name, sessionCookie.value, {
// 		path: "/",
// 		...sessionCookie.attributes
// 	});

// 	throw redirect(302, "/login");
// };
