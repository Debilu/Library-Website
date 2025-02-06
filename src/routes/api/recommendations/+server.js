import { fetchRecommendations } from '$lib/server/db';

export async function GET({ locals }) {
  const user = locals.user;
  if (!user) {
    return { status: 401, body: { error: 'Unauthorized' } };
  }

  // Assume user's semester is stored in user.semester
  const recommendations = await fetchRecommendations(user.semester);

  return {
    status: 200,
    body: { recommendations }
  };
}
