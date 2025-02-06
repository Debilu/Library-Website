<!-- /src/routes/book/[slug]/+page.svelte -->
<script context="module">
	// This load function runs on the client in CSR mode.
	export async function load({ params, fetch }) {
	  const res = await fetch(`/api/book-details?title=${encodeURIComponent(params.slug)}`);
	  if (!res.ok) throw new Error('Book not found');
	  const book = await res.json();
	  return { book };
	}
  </script>
  
  <script>
	export let data;
  </script>
  
  <main>
	<h1>{data.book.title}</h1>
	{#if data.book.image}
	  <img src="{data.book.image}" alt="{data.book.title} cover" />
	{/if}
	<p>{data.book.description}</p>
	{#if data.book.infoLink}
	  <a href="{data.book.infoLink}" target="_blank">More Information</a>
	{/if}
  </main>
  