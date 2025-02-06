<script>
	export let data;
  </script>
  
  <main>
	{#if data.user}
	  <h1>Welcome back, {data.user.username}!</h1>
	{:else}
	  <h1>Welcome to the College Library</h1>
	  <p>
		<a href="/login">Log in</a> to access your account and personalized recommendations.
	  </p>
	{/if}
  
	<form action="/catalog" method="get">
	  <input type="text" name="q" placeholder="Search for books..." required />
	  <button type="submit">Search</button>
	</form>
  </main>
  