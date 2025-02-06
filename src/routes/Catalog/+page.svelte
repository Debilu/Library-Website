<script>
	export let data;
  </script>
  
  <main>
	<h1>Catalog Results for "{data.query}"</h1>
	{#if data.catalog.length > 0}
	  <ul>
		{#each data.catalog as book}
		  <li>
			<a href={`/book/${book.id}`}>{book.title} — {book.author}</a>
		  </li>
		{/each}
	  </ul>
	{:else}
	  <p>No books found.</p>
	{/if}
  </main>
  