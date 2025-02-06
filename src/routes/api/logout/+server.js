import { json } from '@sveltejs/kit';

export async function POST({ cookies }) {
	// Delete the JWT cookie to log out the user
	cookies.delete('jwt', {
		path: '/',
		httpOnly: true,
		sameSite: 'strict'
	});

	// Return a JSON response to indicate success
	return json({ message: 'Logged out successfully' }, { status: 200 });
}
