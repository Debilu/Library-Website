<script>
	export let data;
  </script>
  <main>
		{#if data.user}
		<h1>Welcome back, {data.user.username}!</h1>
		{:else}
		<h1 class="logo">Welcome to the Library</h1>
		<p>
			<a href="/login">Login</a> to access your account and personalized recommendations.
			<br><br>
		</p>
		{/if}
		<div class="search-container">
			<form action="/catalog" method="get">
				<input type="text" name="q" placeholder="Search for books..." required />
				<button type="submit">Search</button>
			</form>
		</div>
		<br>
		<div class="image-container">
			<img src="library image.png" alt="Library Bookshelf">
		</div>
		<div>
			<p>Explore books and get personalized recommendations.</p>
		</div>
				
  </main>
  <style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Poppins', sans-serif;
	}
	main {
	  background-image: url('loginpage_bg.png');
	  background-size: cover;
	  background-position: center;
	  background-attachment: fixed;
	  height: 100vh;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  text-align: center;
	  color: white;
	}

	.logo {
    background: url('Welcome1.png') no-repeat center;
    background-size: contain;
    width: 200px; 
    height: 80px; 
    text-indent: -9999px;
    overflow: hidden;
    display: block;
	}

	input[type="text"] {
    width: 100%; 
	height: 40px;
    max-width: 700px; 
    padding: 12px 20px;
    font-size: 16px;
    border: none;
    border-radius: 40px; 
    background-color: #eedfc3b4; 
    color: #333; 
    outline: none; 
	}
	
	input[type="text"]::placeholder {
		color: #666;
		font-style: italic;
	}
	
	
	input[type="text"]:focus {
		background-color: #f3e6c9; 
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
	}
	button {
		background-color: #EDDDBF; 
		width: auto;
		color: #333; 
		font-size: 16px;
		font-weight: bold;
		border: none;
		border-radius: 40px;
		padding: 10px 20px;
		cursor: pointer;
		transition: background-color 0.3s, transform 0.2s;
	}
	button:hover {
		background-color: #d4c1a1;
		transform: scale(1.05);
	}
	button:active {
		background-color: #b8a389;
		transform: scale(0.98);
	}

	.image-container {
		position: relative;
		width: 100%;
		max-width: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 20px;
		overflow: hidden;
	}

	.image-container img {
		width: 80%;
		height: auto;
		border-radius: 150px;
	}
  </style>