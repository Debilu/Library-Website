export async function GET({ url }) {
  const title = url.searchParams.get('title');
  if (!title) {
    return new Response(
      JSON.stringify({ error: 'Missing book title' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  console.log(`Fetching book details for title: ${title}`); // Log the title being fetched

  const googleApiUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}&key=AIzaSyB3ifXgsw-8ehNNzFiBO2qwvw0UK3St3Pk`;
  console.log("Fetching URL:", googleApiUrl);

  try {
    const response = await fetch(googleApiUrl);
    if (!response.ok) {
      console.error('Failed to fetch from Google Books API', response.status); // Log if the fetch fails
      throw new Error(`Google API returned status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Google API data:', data); // Log the data received from Google API

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

    console.log('Enriched data:', enrichedData); // Log the enriched data before returning it

    return new Response(
      JSON.stringify(enrichedData),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Error in fetching book details:', err); // Log any other errors
    return new Response(
      JSON.stringify({ error: 'Error fetching book details' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
