import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { github, lucia } from "$lib/server/auth.js";
import { db } from "$lib/server/db/index.js";
import { user } from "$lib/server/db/schema.js";
import { eq } from "drizzle-orm";


import type { RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {
    const code = event.url.searchParams.get("code");
    const state = event.url.searchParams.get("state");
    const storedState = event.cookies.get("github_oauth_state") ?? null;

    if (!code || !state || !storedState || state !== storedState) {
        return new Response(null, {
            status: 400
        });
    }

    try {
        const tokens = await github.validateAuthorizationCode(code);
        const githubUserResponse = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        });
        const githubUser: GitHubUser = await githubUserResponse.json();

        // Replace this with your own DB client.
        const existingUsers = await db
            .select()
            .from(user)
            .where(eq(user.githubId, githubUser.id.toString()));

        const existingUser = existingUsers[0]; // Drizzle gibt ein Array zurück

        if (existingUser) {
            const session = await lucia.createSession(existingUser.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            event.cookies.set(sessionCookie.name, sessionCookie.value, {
                path: ".",
                ...sessionCookie.attributes
            });
        } else {
            const userId = generateIdFromEntropySize(10);

            await db.insert(user).values({
                id: userId,
                githubId: githubUser.id.toString(),
                username: githubUser.login ?? "",
                email: githubUser.email ?? ""
            });

            const session = await lucia.createSession(userId, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            event.cookies.set(sessionCookie.name, sessionCookie.value, {
                path: ".",
                ...sessionCookie.attributes
            });
        }

        return new Response(null, {
            status: 302,
            headers: {
                Location: "/"
            }
        });
    } catch (e) {
        // the specific error message depends on the provider
        if (e instanceof OAuth2RequestError) {
            // invalid code
            return new Response(null, {
                status: 400
            });
        }
        return new Response(null, {
            status: 500
        });
    }
}

interface GitHubUser {
    id: number;
    login: string;
    email: string;
}
