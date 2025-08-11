import type { DefaultSession } from "@auth/core/types"

declare global {
    namespace App {
        interface Locals {
            auth: import('@auth/sveltekit').Auth
            session: import('@auth/core/types').Session | null
            user: import('@auth/core/types').User | null
        }
    }
}

// ✅ Auth.js Session-Type erweitern
declare module "@auth/core/types" {
    interface Session {
        user: {
            id: string
        } & DefaultSession["user"]
    }
}

export {};