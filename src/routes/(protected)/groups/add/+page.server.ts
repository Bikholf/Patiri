import type { PageServerLoad } from './$types.js';
import { getUserGroups } from '$lib/server/db/queries/groups.js';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
    await event.parent();
    const session = await event.locals.auth();

    return {
        session,
        user: session.user,
        breadcrumbConfig: [
            {
                translationKey: 'breadcrumb_groups'  // /groups
            },
            {
                translationKey: 'add'
            }
        ],
    };
};