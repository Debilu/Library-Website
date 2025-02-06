<script>
	import { onMount } from 'svelte';
  
	let catalog = [];
	let query = '';
	let error = '';
  
	onMount(async () => {
	  try {
		// Get query from the URL parameters
		const urlParams = new URLSearchParams(window.location.search);
		query = urlParams.get('q') || '';
  
		const res = await fetch(`/api/catalog?q=${encodeURIComponent(query)}`);
		const data = await res.json();
		console.log('Data:', data);

		if (res.ok) {
		  catalog = data;
		} else {
		  error = data.message || 'Error fetching catalog.';
		}
	  } catch (err) {
		error = 'Failed to fetch catalog data.';
	  }
	});
  </script>
  
  <main>
	<h1>Catalog Results for "{query}"</h1>
	
	{#if error}
	  <p style="color:red">{error}</p>
	{:else if catalog.length > 0}
	  <ul>
		{#each catalog as book}
		  <li>
			<a href={`/book?q=${encodeURIComponent(book.title)}`}>{book.title} — {book.author}</a>
		  </li>
		{/each}
	  </ul>
	{:else}
	  <p>No books found.</p>
	{/if}
  </main>
  