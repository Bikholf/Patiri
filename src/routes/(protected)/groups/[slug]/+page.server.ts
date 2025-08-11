import type { PageServerLoad } from './$types.js';
import { getUserGroups } from '$db/queries/groups.js';

export const load: PageServerLoad = async ({ params, locals }) => {
    const session = await locals.auth();

    const userGroups = await getUserGroups(locals.user.id);
    
    return {
        session,
        user: session?.user,
        title: `Gruppe: ${params.slug}`,
        content: `<p>Willkommen in der Gruppe <strong>${params.slug}</strong></p>`,
        // Breadcrumb-Konfiguration für diese Route
        breadcrumbConfig: [
            {
                translationKey: 'breadcrumb_groups'  // /groups
            },
            {
                label: params.slug  // /groups/[slug] - Verwende Parameter-Wert
            }
        ],
        userGroups: userGroups
    };
};