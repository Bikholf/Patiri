import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ params, locals }) => {
    const session = await locals.auth();
    
    return {
        session,
        user: session?.user,
        title: `Medien - ${params.slug}`,
        content: `<p>Medien für Gruppe: <strong>${params.slug}</strong></p>`,
        // Breadcrumb-Konfiguration für diese Route
        breadcrumbConfig: [
            {
                translationKey: 'breadcrumb_groups'  // /groups
            },
            {
                label: params.slug  // /groups/[slug]
            },
            {
                translationKey: 'breadcrumb_media'  // /groups/[slug]/media
            }
        ]
    };
};