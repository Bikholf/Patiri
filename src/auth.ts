
import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/sveltekit/providers/github"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "$db/schema.js"

export const { handle, signIn, signOut } = SvelteKitAuth({
    adapter: DrizzleAdapter(db),
    providers: [GitHub]
}) // 