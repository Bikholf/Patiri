import type { PageServerLoad } from './$types.js';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url, locals }) => {
    // If user is already logged in, redirect them
    const session = await locals.auth();
    
    if (session?.user) {
        // Check if there's a return URL
        const returnUrl = url.searchParams.get('returnUrl');
        
        if (returnUrl) {
            // Decode and validate the return URL
            const decodedUrl = decodeURIComponent(returnUrl);
            
            // Security check: ensure it's a relative URL
            if (decodedUrl.startsWith('/') && !decodedUrl.startsWith('//')) {
                throw redirect(303, decodedUrl);
            }
        }
        
        // Default redirect to home
        throw redirect(303, '/');
    }
    
    // Pass the return URL to the component if needed
    return {
        returnUrl: url.searchParams.get('returnUrl'),
    };
};