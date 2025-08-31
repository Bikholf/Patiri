import { getUserGroupsByUserId } from '$db/groups.js';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
    // z.B. aus DB lesen
    console.log("called /api/groups GET method")
    try {
        const session = await event.locals.auth()
        const userId = session.user.id;
        const forms = await getUserGroupsByUserId(userId);
        return new Response(JSON.stringify(forms), { status: 200 });
    } catch (error) {
        console.error("Load function error:", error);
        throw error;
    }
};