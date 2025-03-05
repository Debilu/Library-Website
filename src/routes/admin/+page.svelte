<script>
	import { onMount } from "svelte";
	
	let books = [];
	let users = [];
	let newBook = { title: "", author: "" };
	let newUser = { name: "", id: "" };
  
	async function fetchData() {
	  const bookRes = await fetch("/api?type=books");
	  books = await bookRes.json();
  
	  const userRes = await fetch("/api?type=users");
	  users = await userRes.json();
	}
  
	async function addBook() {
	  if (!newBook.title || !newBook.author) return;
	  await fetch("/api?type=books", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newBook),
	  });
	  newBook = { title: "", author: "" };
	  fetchData();
	}
  
	async function addUser() {
	  if (!newUser.name || !newUser.email) return;
	  await fetch("/api?type=users", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newUser),
	  });
	  newUser = { name: "", id: "" };
	  fetchData();
	}
  
	async function deleteBook(id) {
	  await fetch(`/api?type=books&id=${id}`, { method: "DELETE" });
	  fetchData();
	}
  
	async function deleteUser(id) {
	  await fetch(`/api?type=users&id=${id}`, { method: "DELETE" });
	  fetchData();
	}
  
	onMount(fetchData);
  </script>
  
  <style>
	.dashboard { max-width: 800px; margin: auto; padding: 20px; }
	table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
	th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
	th { background: #f4f4f4; }
	input { margin-right: 10px; padding: 5px; }
	button { padding: 5px 10px; margin-left: 5px; cursor: pointer; }
  </style>
  
  <div class="dashboard">
	<h1>📚 Library Admin Dashboard</h1>
  
	<!-- Books Section -->
	<h2>Manage Books</h2>
	<input bind:value={newBook.title} placeholder="Book Title" />
	<input bind:value={newBook.author} placeholder="Author" />
	<button on:click={addBook}>Add Book</button>
  
	<table>
	  <thead>
		<tr><th>ID</th><th>Title</th><th>Author</th></tr>
	  </thead>
	  <tbody>
		{#each books as book}
		  <tr>
			<td>{book.id}</td>
			<td>{book.title}</td>
			<td>{book.author}</td>
			<td><button on:click={() => deleteBook(book.id)}>❌ Delete</button></td>
		  </tr>
		{/each}
	  </tbody>
	</table>
  
	<!-- Users Section -->
	<h2>Manage Users</h2>
	<input bind:value={newUser.name} placeholder="User Name" />
	<input bind:value={newUser.email} placeholder="Admn no:" />
	<button on:click={addUser}>Add User</button>
  
	<table>
	  <thead>
		<tr><th>ID</th><th>Name</th><th>Admn no:</th></tr>
	  </thead>
	  <tbody>
		{#each users as user}
		  <tr>
			<td>{user.id}</td>
			<td>{user.name}</td>
			<td>{user.email}</td>
			<td><button on:click={() => deleteUser(user.id)}>❌ Delete</button></td>
		  </tr>
		{/each}
	  </tbody>
	</table>
  </div>
  