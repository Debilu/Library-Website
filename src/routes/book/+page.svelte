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
	<div class="container">
		<!-- <h2>Book Details for "{query}"</h2> -->
			{#if isLoading}
				<p>Loading book details...</p>
			{:else if error}
				<p style="color: red;">{error}</p>
			{:else if book}
				{#if book.image}
					<div class="book-cover">
						<img src="{book.image}" alt="{book.title} cover" />
					</div>
				{/if}
				<div class="content">
					<h1>{book.title}</h1>
					<p class="year">{book.year}</p>
					<p class="author">{book.author}</p>
					<p class="description">{book.description}</p>
					{#if book.infoLink}
						<a href="{book.infoLink}" target="_blank">More Information</a>
					{/if}
				</div>
			{:else}
			<p>Book not found.</p>
			{/if}
	</div>
  </main>

  
    <style>
        main {
            background: linear-gradient(to left, #363883, #EDDDBF);
            font-family: 'IM Fell English', serif;
            margin:0;
            padding: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .container {
            display: flex;
            max-width: 900px;
            background-color: #f8f0e5;
            padding: 20px;
            box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
        }
        .book-cover img {
            width: 300px;
            height: auto;
            box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
        }
        .content {
            padding-left: 20px;
            max-width: 550px;
        }
        h1 {
            font-size: 32px;
            margin: 0;
			color: #1F263A;
            
        }
        .author {
            font-size: 20px;
            font-weight: bold;
            margin-top: 0;
            color: #1F263A80;
        }
        .year {
            font-size: 18px;
            color: #444;
            font-style: italic;
        }
        .description {
            margin-top: 15px;
            font-size: 16px;
            line-height: 1.5;
            text-align: justify;
            color: #1F263A;
            
        }
    </style>

  
  