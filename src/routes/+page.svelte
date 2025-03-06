<script>
	export let data;
  </script>
  <main>
		{#if data.user}
		<img src="Welcome1.png" alt="Welcome" class="logo">
		{:else}
		<img src="Welcome1.png" alt="Welcome" class="logo">
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
		<div class="banner-container">
			<img src="library image.png" alt="Library Banner" class="banner-image">
			<div class="banner-overlay">
				<div class="banner-item">
					<img src="freq2.png" alt="Frequently Taken Books" class="banner-icon">
					<p>Frequently taken <br> Books</p>
				</div>
				<div class="banner-item">
					<img src="reco2.png" alt="Personalized Recommendations" class="banner-icon">
					<p>Personalised <br> Recommendations</p>
				</div>
			</div>
		</div>
		<div>
			<p>Explore books and get personalised recommendations.</p>
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
		/* height: 100vh; */
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
        width: auto; 
        height: 150px; 
        display: block;
        margin: 0 auto;
    }

	input[type="text"] {
		margin-bottom: 10px;
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
	
	.banner-container {
		position: relative;
		width: 100%;
		max-width: 1100px; /* Adjust width if needed */
		margin: 0 auto;
		overflow: hidden;
		border-radius: 20px; /* Soft rounded edges */
	}

	.banner-image {
		width: 100%;
		height: auto;
		display: block;
		filter: brightness(80%);
		border-radius: 20px; /* Match the container */
	}

	.banner-overlay {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 90%;
		text-align: center;
	}

	.banner-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: white;
		font-size: 20px;
		font-weight: bold;
		text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
	}

	.banner-icon {
		width: 60px;
		height: 60px;
		margin-bottom: 10px;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.banner-overlay {
			flex-direction: column;
			gap: 20px;
		}
	}

  </style>