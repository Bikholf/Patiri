import { redirect } from "@sveltejs/kit";
import { generateState } from "arctic";
import { github } from "$lib/server/auth.js";
import 'dotenv/config';

import type { RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {
    const state = generateState();
    const scopes = ["read:user", "user:email"];
    const url = github.createAuthorizationURL(state, scopes);

    event.cookies.set("github_oauth_state", state, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax"
    });

    // Redirect the user to GitHub's authorization page
    return redirect(302, url.toString());
}
