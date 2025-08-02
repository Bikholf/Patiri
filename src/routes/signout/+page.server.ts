import { signOut } from "../../auth.js"
import type { Actions } from "./$types.js"
 
export const actions: Actions = { default: signOut }