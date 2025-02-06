// You can use node-fetch or the global fetch if available
import { redisClient } from '$lib/server/redis';

export async function GET({ url }) {
  const title = url.searchParams.get('title');
  if (!title) {
    return { status: 400, body: { error: 'Missing book title' } };
  }

  const cacheKey = `book-details:${title}`;
  const cached = await redisClient.get(cacheKey);
  if (cached) {
    return { status: 200, body: JSON.parse(cached) };
  }

  const googleApiUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}`;
  try {
    const response = await fetch(googleApiUrl);
    const data = await response.json();

    const bookInfo =
      data.items && data.items.length > 0
        ? data.items[0].volumeInfo
        : { title: 'Not found', description: '', image: null };

    const enrichedData = {
      title: bookInfo.title,
      authors: bookInfo.authors,
      description: bookInfo.description,
      image: bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : null,
      infoLink: bookInfo.infoLink
    };

    // Cache enriched data for 60 seconds
    await redisClient.set(cacheKey, JSON.stringify(enrichedData), { EX: 60 });

    return {
      status: 200,
      body: enrichedData
    };
  } catch (err) {
    return { status: 500, body: { error: 'Error fetching book details' } };
  }
}
