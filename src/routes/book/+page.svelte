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

  <!-- <link href="https://fonts.googleapis.com/css2?family=IM+Fell+English&display=swap" rel="stylesheet">
    <style>
        body {
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
        .toc {
            font-size: 14px;
            margin-top: 10px;
            line-height: 1.6;
        }
        .description {
            margin-top: 15px;
            font-size: 16px;
            line-height: 1.5;
            text-align: justify;
            color: #1F263A;
            
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="book-cover">
            <img src="CompilerDesigncoverpage.jpeg" alt="Compiler Design Book Cover">
        </div>
        <div class="content">
            <p class="year">1946</p>
            <h1>Compiler Design</h1>
            <p class="author">Wilhelm, R. (Reinhard)</p>
            <p class="description">
                "Compiler Design" by Reinhard Wilhelm is a comprehensive and detailed resource that focuses on the theoretical and practical aspects of compiler construction. The book is highly informative but can be challenging to read due to its dense content and mathematical formulas, making it more suitable for academic and professional readers rather than general audiences. It is praised for its clear code generation examples and visual aids, though it requires a deep understanding of the material and solving exercises to fully grasp the concepts.
            </p>
        </div>
    </div>
</body>
</html> -->
  
  