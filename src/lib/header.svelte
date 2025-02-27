<script>
	import { goto, invalidateAll } from '$app/navigation';
	export let data;

	async function logout() {
		try {
			const res = await fetch('/api/logout', { method: 'POST' });

			if (res.ok) {
				await invalidateAll(); // Ensures session data is refreshed
				goto('/login');
			} else {
				console.error('Logout failed.');
			}
		} catch (error) {
			console.error('Error during logout:', error);
		}
	}
</script>

<style>
	header {
		padding: 1rem;
		background-color: #00000000;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	nav a {
		margin-right: 1rem;
		text-decoration: none;
		color: #00000000;
	}
	button {
		padding: 0.5rem 1rem;
		font-size: 1rem;
		cursor: pointer;
	}
</style>

<header>
	<nav>
		<a href="/">
		<img src = "liblogo.png" alt = 'logo' width = '50px' height = '50px'>
		</a>
	</nav>

	{#if data.user}
		<button on:click={logout}>Logout</button>
	{:else}
		<a href="/login">
		<img src="login_icon.png" alt="login" width="100px" height="100px">
		</a>
	{/if}
</header>
