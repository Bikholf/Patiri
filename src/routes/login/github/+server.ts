import { redirect } from "@sveltejs/kit";
import { generateState } from "arctic";
import { github } from "$lib/server/auth.js";

import type { RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {
	const state = generateState();
    const scopes = ["read:user", "user:email"];
	const url = github.createAuthorizationURL(state, scopes);

	event.cookies.set("github_oauth_state", state, {
		path: "/",
		secure: import.meta.env.PROD,
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax"
	});

	redirect(302, url.toString());
}
