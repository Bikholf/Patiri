
import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/sveltekit/providers/github"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "$db/schema.js"
import { GITHUB_CLIENT_SECRET, GITHUB_CLIENT_ID, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private"
import Google from "@auth/sveltekit/providers/google"

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
        })
    ]
})