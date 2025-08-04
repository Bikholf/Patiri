import type { Handle, HandleServerError } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { handle as authHandle } from "./auth.js";

const protectionHandle: Handle = async ({ event, resolve }) => {
    try {
        // Get the session for all routes
        const session = await event.locals.auth();
        
        // Make session and user available in locals
        event.locals.session = session;
        event.locals.user = session?.user || null;
        
        // Check if the route is protected (inside (app) folder)
        const isProtectedRoute = event.url.pathname.startsWith('/home') || 
                               event.url.pathname.startsWith('/settings') ||
                               event.route.id?.includes('(app)');
        
        if (isProtectedRoute && !session?.user) {
            // Store the original URL as a query parameter
            const returnUrl = encodeURIComponent(event.url.pathname + event.url.search);
            throw redirect(303, `/login?returnUrl=${returnUrl}`);
        }
        
        return resolve(event);
    } catch (error) {
        // Log error but don't crash the server
        console.error('Error in protection handle:', error);
        
        // If it's a redirect, re-throw it
        if (error instanceof Response) {
            throw error;
        }
        
        // For other errors, redirect to login as fallback
        const returnUrl = encodeURIComponent(event.url.pathname + event.url.search);
        throw redirect(303, `/login?returnUrl=${returnUrl}`);
    }
};

// Error handler to prevent server crashes
export const handleError: HandleServerError = ({ error, event }) => {
    console.error('Server error:', error);
    console.error('Event URL:', event.url.pathname);
    
    // Return a generic error message
    return {
        message: 'Ein unerwarteter Fehler ist aufgetreten',
        code: (error as any)?.code ?? 'UNKNOWN'
    };
};

// Combine auth handle with protection handle
export const handle = sequence(authHandle, protectionHandle);