
import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/sveltekit/providers/github"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "$db/schema.js"
import { GITHUB_CLIENT_SECRET, GITHUB_CLIENT_ID, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET } from "$env/static/private"
import Google from "@auth/sveltekit/providers/google"
import Discord from "@auth/sveltekit/providers/discord"
import Reddit from "@auth/sveltekit/providers/reddit"
import Passkey from "@auth/sveltekit/providers/passkey"

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
    // trustHost: true, // Für Development
    // experimental: { enableWebAuthn: true },
    // callbacks: {
    //     async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
    //         // Erlaubt relative URLs oder URLs von derselben Origin
    //         if (url.startsWith("/")) return `${baseUrl}${url}`;
    //         if (new URL(url).origin === baseUrl) return url;
    //         return baseUrl;
    //     }
    // }
})