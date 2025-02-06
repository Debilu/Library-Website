import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user) {
		// Redirect unauthenticated users to the login page
		throw redirect(302, '/login');
	}

	const recommendations = [
		{ title: 'Svelte for Beginners', author: 'John Doe' },
		{ title: 'Mastering JavaScript', author: 'Jane Smith' }
	];

	return {
		user: locals.user, // Send user details
		recommendations
	};
}
