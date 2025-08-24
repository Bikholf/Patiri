
import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/sveltekit/providers/github"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "$db/schema.js"
import { GITHUB_CLIENT_SECRET, GITHUB_CLIENT_ID, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET } from "$env/static/private"
import Google from "@auth/sveltekit/providers/google"
import Discord from "@auth/sveltekit/providers/discord"
import Reddit from "@auth/sveltekit/providers/reddit"
import Passkey from "@auth/sveltekit/providers/passkey"

import type { Session, User } from "@auth/core/types"
import type { JWT } from "@auth/core/jwt"

export const { handle, signIn, signOut } = SvelteKitAuth({
    adapter: DrizzleAdapter(db),
    providers: [
        GitHub({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
        }),
        Google({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        }),
        Discord({
            clientId: DISCORD_CLIENT_ID,
            clientSecret: DISCORD_CLIENT_SECRET
        }),
        Reddit({
            clientId: REDDIT_CLIENT_ID,
            clientSecret: REDDIT_CLIENT_SECRET
        }),
        // Passkey
    ],
    pages: {
        signIn: "/login",
    },

    // experimental: { enableWebAuthn: true },
    callbacks: {
        async session({ session, user }: { session: Session; user: User }): Promise<Session> {
            // console.log("Database session callback");
            // console.log("User from DB:", user);
            // console.log("Session before:", session);
            
            // Bei Database Strategy ist user das User-Objekt aus der DB
            if (user && session?.user && user.id) {
                session.user.id = user.id;
            }
            
            // console.log("Session after:", session);
            return session;
        }
    },
    
    // ✅ Database Session Strategy
    session: {
        strategy: "database"
    }
})