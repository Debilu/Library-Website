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
	<div class="container">
        <div class="login-box">
            <h2>LOGIN</h2>
            {#if error}
		        <p style="color:red">{error}</p>
	        {/if}
            <form on:submit={handleLogin}>
                <!-- <label for="username">User name:</label>
                <input type="text" id="username" class="input-field">
                
                <label for="password">Password:</label>
                <input type="password" id="password" class="input-field"> -->
                <input bind:value={username} type="text" placeholder="Username" required class="input-field" />
		        <input bind:value={password} type="password" placeholder="Password" required  class="input-field" />
                <button type="submit" class="login-btn">LOGIN</button>
            </form>
        </div>
    </div>
</main>


<style>
	main {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background: radial-gradient(circle at center, #562a4d, #1b1c2b);
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.container {
    position: relative;
    width: 100%;
    text-align: left;
}

.home {
    position:top right;
    top: 50px;
    left: 30px;
    font-size: 24px;
    color: white;
}

.login-box {
    background: rgba(50, 30, 50, 0.9);
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    width: 350px;
    text-align: center;
    color: white;
    margin: auto;
}

h2 {
    margin-bottom: 20px;
}

.input-field {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 10px;
    background: #ccc;
    outline: none;
}

/* .login-btn {
    background: rgb(87, 51, 154);
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s;
} */

.login-btn:hover {
    background: #ddd;
}

</style>