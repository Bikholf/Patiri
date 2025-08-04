import type { PageServerLoad } from "./$types.js"
 
export const load: PageServerLoad = async (event) => {
  // Session and user are already available from hooks.server.ts
  // and authentication is already enforced there
  const { session, user } = event.locals;
  
  console.log("session from locals: ", session);
  console.log("user from locals: ", user);
 
  return {
    session,
    user
  };
}