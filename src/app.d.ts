// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			auth: () => Promise<any>;
			session: any;
			user: any;
		}
	}
}

export {};
