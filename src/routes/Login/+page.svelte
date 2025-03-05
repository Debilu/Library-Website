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
    background-image: url('loginpage_bg.png');
    background-size: cover;
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

.login-box {
    background-image: url('loginBox.png');
    padding: 30px;
    border-radius: 15px;
    /*box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);*/
    width: 350px;
    text-align: center;
    color: white;
    margin: auto;
}

h2 {
    margin-bottom: 20px;
    color: #EDDDBF;
}

/* Input Container */
.input-field {
    background: #EDDDBF; 
    border-radius: 30px;
    padding: 20px 20px;
    width: 300px;
    display: flex;
    align-items: center;
}

/* Input Field 
.input-field input {
    border: none;
    outline: none;
    background: none;
    width: 100%;
    font-size: 16px;
    color: #333;
}*/


.login-btn {
    background-color: #eedfc3b4; 
    color: #5c523f; 
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 30px;
    padding: 10px 25px;
    cursor: pointer;
    text-transform: uppercase;
    width: 125px;
    height: 40px;
    font-family: 'IBM Plex Mono', sans-serif;
}

.login-btn:hover {
    background-color: #d4c1a1;
		transform: scale(1.05);
}

</style>