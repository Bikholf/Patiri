import { GitHub } from "arctic";
import 'dotenv/config';
import { Lucia } from "lucia";
import { drizzle } from "drizzle-orm/node-postgres";
import { adapter } from "$lib/server/db/schema.js";


export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: !process.env.NODE_ENV
		}
	},
	getUserAttributes: (attributes) => {
        return {
            // attributes has the type of DatabaseUserAttributes
			githubId: attributes.githubId,
			username: attributes.username
		};
	}
});

declare module "lucia" {
    interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}


interface DatabaseUserAttributes {
    githubId: number;
    username: string;
}

export const github = new GitHub(
  process.env.GITHUB_CLIENT_ID!,
  process.env.GITHUB_CLIENT_SECRET!,
  process.env.GITHUB_REDIRECT_URI!
);