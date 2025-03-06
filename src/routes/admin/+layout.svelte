<script>

</script>

<div class="admin-layout">
	<nav>
		<ul>
			<li><a href="/admin">Dashboard</a></li>
			<li><a href="/admin/books">Books</a></li>
			<li><a href="/admin/users">Users</a></li>
		</ul>
	</nav>  
	<main>
		<slot />
	  </main>
</div>

<style>
	.admin-layout {
		display: grid;
		grid-template-columns: 200px 1fr;
		height: 100vh;
	}

	main {
		padding: 20px;
	}
</style>