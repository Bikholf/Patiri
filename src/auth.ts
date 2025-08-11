
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
        // ✅ Session-Callback: User-ID zur Session hinzufügen
        async session({ session, token, user }: { session: Session; token: JWT; user: User | undefined }) {
            console.log("Session callback triggered");
            console.log("Token:", token);
            console.log("User:", user);
            console.log("Session before:", session);

            // User-ID zur Session hinzufügen
            if (token?.sub && session?.user) {
                session.user.id = token.sub;
            }

            console.log("Session after:", session);
            return session;
        },

        // ✅ JWT-Callback: User-ID im Token speichern
        async jwt(
            { token, user, account }: { token: JWT; user?: User; account?: any }
        ): Promise<JWT> {
            console.log("JWT callback triggered");
            console.log("Token:", token);
            console.log("User:", user);
            console.log("Account:", account);

            // Bei erster Anmeldung die User-ID im Token speichern
            if (user) {
                token.sub = user.id;
            }

            return token;
        }
    },

    // ✅ Session-Strategie für JWT
    session: {
        strategy: "jwt"
    }
})