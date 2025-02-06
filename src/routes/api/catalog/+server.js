export async function GET({ url }) {
  try {
    // Extract query parameter
    const query = url.searchParams.get('q')?.toLowerCase() || '';

    // Sample book data (Replace with DB query if needed)
    const books = [
      { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
      { id: 2, title: '1984', author: 'George Orwell' },
      { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
      { id: 4, title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
    ];

    // Filter books based on the query
    const filteredBooks = books.filter(book =>
      book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
    );

    return new Response(JSON.stringify(filteredBooks), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
