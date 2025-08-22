import type { PageServerLoad } from './$types.js';
import { getAllUserGroupsWithCreator, getUserGroups } from '$db/queries/groups.js';
import { redirect } from '@sveltejs/kit';
// import { groupFormSchema, type GroupFormSchema } from '$db/schema.js';

import { superValidate } from 'sveltekit-superforms';
import { object, string, email, optional, pipe, minLength, maxLength } from 'valibot';
import { valibot } from 'sveltekit-superforms/adapters';
import { groupFormSchema } from '$db/form-objects.js';

export const load = async (event) => {
    console.log("Load function started");

    try {
        await event.parent();   
        const session = await event.locals.auth()

        // if (!session?.user?.id) {
        //     throw redirect(302, '/login');
        // }

        const userId = session.user.id;

        console.log("user id: ", userId);
        console.log("user id: ", session.user);

        const userGroups = await getAllUserGroupsWithCreator();
        const form = await superValidate(valibot(groupFormSchema));

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
            userGroups: userGroups?.memberships || [],
            groupForm: form
        };
    } catch (error) {
        console.error("Load function error:", error);
        throw error;
    }
}