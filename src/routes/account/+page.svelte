<script>
	export let data; // Data from +page.server.js
</script>

<main>
	<h1>Your Account</h1>
	<h2>Welcome, {data.user.username}!</h2>

	<h2>Recommended Books for You</h2>
	{#if data.recommendations.length > 0}
		<ul>
			{#each data.recommendations as book}
				<li>{book.title} — {book.author}</li>
			{/each}
		</ul>
	{:else}
		<p>No recommendations available.</p>
	{/if}
</main>
