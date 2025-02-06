<script>
	import { onMount } from 'svelte';
  
	let book = null;
	let query = '';
	let error = '';
	let isLoading = true;
  
	onMount(async () => {
	  try {
		// Extract the query parameter 'q' from the URL (the book title)
		const urlParams = new URLSearchParams(window.location.search);
		query = urlParams.get('q') || ''; // Get the search query (q)
		console.log(query);
		if (!query) {
		  throw new Error('No book title provided');
		}
  
		// Fetch the book details from the API using the query as the book title
		const res = await fetch(`/api/book-details?title=${encodeURIComponent(query)}`);
		if (!res.ok) {
		  throw new Error('Book not found');
		}
  
		// Parse the JSON response
		book = await res.json();
	  } catch (err) {
		error = err.message || 'Failed to fetch book details.';
		console.error(err);
	  } finally {
		isLoading = false;
	  }
	});
  </script>
  
  <main>
	<h1>Book Details for "{query}"</h1>
  
	{#if isLoading}
	  <p>Loading book details...</p>
	{:else if error}
	  <p style="color: red;">{error}</p>
	{:else if book}
	  <h2>{book.title}</h2>
	  {#if book.image}
		<img src="{book.image}" alt="{book.title} cover" />
	  {/if}
	  <p>{book.description}</p>
	  {#if book.infoLink}
		<a href="{book.infoLink}" target="_blank">More Information</a>
	  {/if}
	{:else}
	  <p>Book not found.</p>
	{/if}
  </main>
  