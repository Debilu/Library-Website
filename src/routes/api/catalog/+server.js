import { redisClient } from '$lib/server/redis';
import { fetchCatalogFromDB } from '$lib/server/db';

export async function get({ url }) {
  const query = url.searchParams.get('q') || '';
  const cacheKey = `catalog:${query}`;

  // Try to serve from cache
  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    return {
      status: 200,
      body: JSON.parse(cachedData)
    };
  }

  // Otherwise, query your database
  const catalogData = await fetchCatalogFromDB(query);

  // Cache for 60 seconds
  await redisClient.set(cacheKey, JSON.stringify(catalogData), { EX: 60 });

  return {
    status: 200,
    body: catalogData
  };
}
