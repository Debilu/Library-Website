<script>
	import { goto, invalidateAll } from '$app/navigation'; // Imported goto for navigation and invalidate all() for refreshing easily
	//Intialise all the variables
	let username = '';
	let password = '';
	let error = '';
	//Async function to handle the login
	async function handleLogin(e) {
		e.preventDefault(); //Prevents by default behaviour to submit
		console.log('Received login attempt:', { username, password });

		const res = await fetch('/api/auth', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		}); //Fetch from api/auth if the username and password are correct

		const result = await res.json();
		if (res.ok) {
			await invalidateAll(); // Ensures session data is refreshed
			goto('/');
		} else {
			error = result.message || 'Login failed';
		}
	}
</script>

<main>
	<h1>Login</h1>
	{#if error}
		<p style="color:red">{error}</p>
	{/if}
	<form on:submit={handleLogin}>
		<input bind:value={username} type="text" placeholder="Username" required />
		<input bind:value={password} type="password" placeholder="Password" required />
		<button type="submit">Login</button>
	</form>
</main>
