import { json } from '@sveltejs/kit';
import { signToken } from '$lib/server/auth';

export async function POST({ request, cookies }) {
	const { username, password } = await request.json();

	// Mock user validation – replace this with real database check
	if (username === 'student' && password === 'password123') {
		const user = { username, semester: 2, role: 'student' };
		const token = signToken(user);

		// Set JWT as a secure, HTTP-only cookie
		cookies.set('jwt', token, {
			httpOnly: true,
			sameSite: 'strict',
			path: '/',
			secure: process.env.NODE_ENV === 'production', // Secure in production
			maxAge: 3600 // 1 hour expiry
		});

		return json({ message: 'Logged in successfully', user });
	}

	return json({ message: 'Invalid credentials' }, { status: 401 });
}
