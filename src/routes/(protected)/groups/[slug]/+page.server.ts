import type { PageServerLoad } from './$types.js';
import { getUserGroupsByUserId } from '$lib/server/db/groups.js';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
    await event.parent();
    const session = await event.locals.auth();

    console.log("=== Session Debug ===");
    console.log("Full session:", JSON.stringify(session, null, 2));
    
    // ✅ Robuste Validierung
    if (!session?.user?.id) {
        // console.log("No user ID in session - redirecting to login");
        throw redirect(302, '/login');
    }

    const userId = session.user.id;
    
    // console.log("Valid user id: ", userId);
    
    const userGroups = await getUserGroupsByUserId(userId);
    
    // console.log("user groups: ", userGroups);
    
    return {
        session,
        user: session.user,
        breadcrumbConfig: [
            {
                translationKey: 'breadcrumb_groups'
            }
        ],
        userGroups: userGroups?.memberships || []
    };
};