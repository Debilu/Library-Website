<script>
	let books = [];
	async function getBooks() {
		const response = await fetch ('/api/books');
		books = await response.json();
	}
	getBooks();
</script>

<h1>Book List</h1>

<table>
	<thead>
		<tr>
			<th>Ttile</th>
			<th>Author</th>
			<th>Actions</th>
		</tr>
	</thead>
	<tbody>
		{#each books as book}
			<tr>
				<td>{book.title}</td>
				<td>{book.author}</td>
				<td> <a href={`/admin/books/${book.id}`}>Edit</a></td>
			</tr>
		{/each}
	</tbody>
</table>