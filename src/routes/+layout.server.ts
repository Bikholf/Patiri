
import type { LayoutServerLoad } from "./$types.js"
 
//load function: loads serverside any data we need...

export const load: LayoutServerLoad = async (event) => {
  return {
    session: await event.locals.auth()
  }
}