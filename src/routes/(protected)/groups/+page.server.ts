import type { PageServerLoad } from './$types.js';
import { getUserGroups } from '$db/queries/groups.js';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
    await event.parent();
    const session = await event.locals.auth()

    // if (!session?.user?.id) {
    //     throw redirect(302, '/login');
    // }

    const userId = session.user.id;
    
    console.log("user id: ", userId);
    console.log("user id: ", session.user);
    
    const userGroups = await getUserGroups(userId);
    
    console.log("user groups: ", userGroups);
    
    return {
        session,
        user: session.user,
        // Breadcrumb-Konfiguration für diese Route
        breadcrumbConfig: [
            {
                translationKey: 'breadcrumb_groups'  // /groups
            }
        ],
        userGroups: userGroups?.memberships || []
    };
}