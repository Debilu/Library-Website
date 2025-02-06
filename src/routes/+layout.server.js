export function load({ locals }) {
	return {
		user: locals.user || null // Ensure user data is always available
	};
}
