import { verifyToken } from '$lib/server/auth';

export async function handle({ event, resolve }) {
	const token = event.cookies.get('jwt');

	if (token) {
		try {
			const user = verifyToken(token);
			if (user) {
				event.locals.user = user; // Store user in locals
			} else {
				event.cookies.delete('jwt', { path: '/' });
			}
		} catch (error) {
			event.cookies.delete('jwt', { path: '/' });
		}
	}

	return await resolve(event);
}
