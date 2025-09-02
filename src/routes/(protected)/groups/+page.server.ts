import type { PageServerLoad, Actions } from './$types.js';
import { getAllUserGroupsWithCreator, createGroup, addUserToGroup, getUserGroupsByUserId, updateGroup, deleteGroup, removeUserFromGroup } from '$db/groups.js';
import { redirect, fail } from '@sveltejs/kit';
// import { groupFormSchema, type GroupFormSchema } from '$db/schema.js';

import { superValidate } from 'sveltekit-superforms';
import { object, string, email, optional, pipe, minLength, maxLength } from 'valibot';
import { valibot } from 'sveltekit-superforms/adapters';
import { groupSchema, invitationLinkSchema } from '$db/form-schemas.js';
import { message } from 'sveltekit-superforms';
import { getLocale } from '$paraglide/runtime.js';
import * as v from 'valibot';
import '@valibot/i18n/de';

type GroupInput = v.InferInput<typeof groupSchema>;

export const load: PageServerLoad = async (event) => {

    try {
        const session = await event.locals.auth()

        const userId = session.user.id;

        // console.log("user id: ", userId);
        // console.log("user id: ", session.user);

        const userGroups = await getUserGroupsByUserId(userId);
        const groupForm = await superValidate(valibot(groupSchema));
        const invitationLinkForm = await superValidate(valibot(invitationLinkSchema));

        // console.log("user groups: ", userGroups);

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
            groupForm: groupForm,
            invitationLinkForm: invitationLinkForm
        };
    } catch (error) {
        console.error("Load function error:", error);
        throw error;
    }
}

export const actions: Actions = {
    // Create a group
    create: async (event) => {
        const session = await event.locals.auth();

        const lang = getLocale() === 'en' ? 'en' : 'de';
        console.log("Current language in action:", lang);
        v.setGlobalConfig({ lang: lang });


        const form = await superValidate(event, valibot(groupSchema));
        console.log(form);

        if (!form.valid) {
            //return error code because submitted form data was not successfully validated against the schema
            console.log("Form not valid!")
            return fail(400, { form })
        }

        // TODO: post data to database
        const newGroupResult = await createGroup({
            ...form.data,
            createdBy: session.user.id
        })

        const newGroupId = newGroupResult[0].createdGroupId;
        console.log("New group created with ID:", newGroupId);

        // Add the user to the newly created group
        await addUserToGroup(session.user.id, newGroupId, "admin");

        //return the form with a success status message
        console.log("Form valid!")
        return message(form, 'Form posted successfully!');
    },

    // Update a group
    update: async (event) => {
        const session = await event.locals.auth();

        const lang = getLocale() === 'en' ? 'en' : 'de';
        v.setGlobalConfig({ lang });

        // validate name/description with the existing schema
        const form = await superValidate(event, valibot(groupSchema));
        console.log('validated form:', form);

        // Wenn Validation fehlschlägt
        if (!form.valid) {
            console.log("Form not valid!");
            return fail(400, { form });
        }

        // Hole groupId: zuerst aus form.data (wenn present), sonst aus raw formData
        let groupId = form.data?.id;
        if (!groupId) {
            const raw = await event.request.formData();
            const idFromRaw = raw.get('id');
            if (idFromRaw) groupId = String(idFromRaw);
        }

        if (!groupId) {
            console.error('Missing group id for update');
            return fail(400, { form, message: 'Missing group id' });
        }

        // Baue update payload (nur erlaubte Felder)
        const updateData: Partial<GroupInput> = {
            name: (form.data as any).name,
            description: (form.data as any).description
        };

        try {
            const updated = await updateGroup(String(groupId), updateData);
            console.log('[update] db update result:', updated);
            return message(form, 'Group updated successfully!');
        } catch (err) {
            console.error('[update] DB update error:', err);
            return fail(500, { form, message: 'Database update failed', error: String(err) });
        }
    },

    // Update a group
    delete: async (event) => {
        const session = await event.locals.auth();

        // validate name/description with the existing schema
        const form = await superValidate(event, valibot(groupSchema));
        console.log('validated form:', form);

        // Wenn Validation fehlschlägt
        if (!form.valid) {
            console.log("Form not valid!");
            return fail(400, { form });
        }

        // Hole groupId: zuerst aus form.data (wenn present), sonst aus raw formData
        let groupId = form.data?.id;
        if (!groupId) {
            const raw = await event.request.formData();
            const idFromRaw = raw.get('id');
            if (idFromRaw) groupId = String(idFromRaw);
        }

        if (!groupId) {
            console.error('Missing group id for update');
            return fail(400, { form, message: 'Missing group id' });
        }

        try {
            const deleted = await deleteGroup(String(groupId));
            console.log('[delete] db delete result:', deleted);
            return message(form, 'Group deleted successfully!');
        } catch (err) {
            console.error('[delete] DB delete error:', err);
            return fail(500, { form, message: 'Database delete failed', error: String(err) });
        }
    },

    leave: async (event) => {
        const session = await event.locals.auth();

        const userId = session.user.id;

        const form = await superValidate(event, valibot(groupSchema));
        console.log('validated form:', form);

        // Wenn Validation fehlschlägt
        if (!form.valid) {
            console.log("Form not valid!");
            return fail(400, { form });
        }

        // Hole groupId: zuerst aus form.data (wenn present), sonst aus raw formData
        let groupId = form.data?.id;

        if (!groupId) {
            const raw = await event.request.formData();
            const idFromRaw = raw.get('id');
            if (idFromRaw) groupId = String(idFromRaw);
        }

        if (!groupId) {
            console.error('Missing group id for update');
            return fail(400, { form, message: 'Missing group id' });
        }

        try {
            const deleted = await removeUserFromGroup(userId, String(groupId));
            console.log('[delete] db delete result:', deleted);
            return message(form, 'Group deleted successfully!');
        } catch (err) {
            console.error('[delete] DB delete error:', err);
            return fail(500, { form, message: 'Database delete failed', error: String(err) });
        }
    },

    invite: async (event) => {
        const session = await event.locals.auth();
        const formData = await event.request.formData();
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }
    }
};