<script>
	import { goto, invalidateAll } from '$app/navigation';

	let username = '';
	let password = '';
	let error = '';

	async function handleLogin(event) {
		event.preventDefault();
		console.log('Received login attempt:', { username, password });

		const res = await fetch('/api/auth', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});

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
