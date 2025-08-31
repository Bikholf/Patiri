import type { Handle, HandleServerError } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { handle as authHandle } from "./auth.js";
import { paraglideMiddleware } from "./paraglide/server.js";

const protectionHandle: Handle = async ({ event, resolve }) => {
    try {
        // Skip auth for static assets, API routes that don't need auth, and other non-page routes
        if (event.url.pathname.startsWith('/favicon.ico') ||
            event.url.pathname.startsWith('/_app/') ||
            event.url.pathname.startsWith('/static/') ||
            event.url.pathname.startsWith('/images/') ||
            event.url.pathname.startsWith('/robots.txt') ||
            event.url.pathname.startsWith('/sitemap.xml') ||
            event.url.pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|css|js|woff|woff2|ttf|eot)$/)) {
            return resolve(event);
        }

        // Skip auth for login and auth routes
        if (event.url.pathname.startsWith('/login') ||
            event.url.pathname.startsWith('/auth/') ||
            event.url.pathname.startsWith('/api/auth/')) {
            return resolve(event);
        }

        // Get the session for all other routes
        const session = await event.locals.auth();
        
        // Make session and user available in locals
        event.locals.session = session;
        event.locals.user = session?.user || null;
        
        // Check if the route is protected
        const isProtectedRoute = event.route.id?.includes('(app)') || 
                               event.route.id?.includes('(protected)') ||
                               event.url.pathname.startsWith('/dashboard') ||
                               event.url.pathname.startsWith('/settings') ||
                               event.url.pathname.startsWith('/profile');
                               event.url.pathname.startsWith('/api');
        
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
        
        // For other errors, only redirect to login if it's actually a page route
        if (!event.url.pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|css|js|woff|woff2|ttf|eot)$/)) {
            const returnUrl = encodeURIComponent(event.url.pathname + event.url.search);
            throw redirect(303, `/login?returnUrl=${returnUrl}`);
        }
        
        // For static assets, just resolve normally
        return resolve(event);
    }
};

// Error handler to prevent server crashes
export const handleError: HandleServerError = ({ error, event }) => {
    // Don't log 404s for common static assets
    if ((error as any).status === 404 && 
        (event.url.pathname.startsWith('/favicon.ico') ||
         event.url.pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|css|js|woff|woff2|ttf|eot)$/))) {
        return {
            message: 'Not found',
            code: 'NOT_FOUND'
        };
    }
    
    console.error('Server error:', error);
    console.error('Event URL:', event.url.pathname);
    
    // Return a generic error message
    return {
        message: 'Ein unerwarteter Fehler ist aufgetreten',
        code: (error as any)?.code ?? 'UNKNOWN'
    };
};

// creating a handle to use the paraglide middleware
const paraglideHandle: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
		event.request = localizedRequest;
		return resolve(event, {
			transformPageChunk: ({ html }) => {
				return html.replace('%lang%', locale);
			}
		});
	});


// Combine auth handle with protection handle
export const handle = sequence(authHandle, protectionHandle, paraglideHandle);