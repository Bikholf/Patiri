
import type { LayoutServerLoad } from "./$types.js"
 
export const load: LayoutServerLoad = async (event) => {
  const session = await (event.locals as any).auth()
 
  return {
    session,
  }
}