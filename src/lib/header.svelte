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
		background-color: transparent !important;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	nav a {
		margin-right: 1rem;
		text-decoration: none;
		color: transparent;
	}
	button {
		padding: 0.5rem 1rem;
		font-size: 1rem;
		cursor: pointer;
		border: none;
	}
</style>

<header>
	<nav>
		<a href="/">
		<img src = "liblogo.png" alt = 'logo' width = '35px' height = '50px'>
		</a>
	</nav>

	{#if data.user}
		<h2>{data.user.username}!</h2>
		<button on:click={logout}>
			<img src="-S8+-icons.png" alt="account" width="50px" height="50px">
		</button>
	{:else}
		<a href="/login">
		<img src="login_icon.png" alt="login" width="100px" height="100px">
		</a>
	{/if}
</header>
