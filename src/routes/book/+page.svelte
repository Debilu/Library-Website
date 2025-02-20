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
   
<!-- <script>
  export let book = {
    year: 1946,
    title: "Compiler Design",
    author: "Wilhelm, R. (Reinhard)",
    image: "screenshot.png", // Replace with actual path
    tableOfContents: [
      "Introduction",
      "Compilation of imperative programming languages",
      "Compilation of functional programming languages",
      "Compilation of logic programming languages",
      "Compilation of object-oriented languages",
      "The structure of compilers",
      "Lexical analysis",
      "Syntax analysis",
      "Semantic analysis",
      "Abstract interpretation",
      "Trees: pattern matching and parsing",
      "Code generation"
    ]
  };
</script>

<style>
  .container {
    display: flex;
    background: #f5e6d0;
    padding: 20px;
    font-family: serif;
  }
  .image {
    width: 250px;
    height: auto;
    margin-right: 20px;
  }
  .content {
    max-width: 600px;
  }
  h1 {
    font-size: 2rem;
    color: #333;
  }
  h2 {
    font-size: 1.5rem;
  }
  .toc {
    margin-top: 10px;
  }
</style>

<div class="container">
  <img class="image" src={book.image} alt={book.title} />
  <div class="content">
    <p>{book.year}</p>
    <h1>{book.title}</h1>
    <h2>{book.author}</h2>
    <p><strong>Table of contents:</strong></p>
    <ul class="toc">
      {#each book.tableOfContents as item}
        <li>{item}</li>
      {/each}
    </ul>
  </div>
</div> -->
