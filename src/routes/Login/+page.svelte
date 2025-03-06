<script>
    import { goto, invalidateAll } from '$app/navigation';
    let username = '';
    let password = '';
    let error = '';
    let loading = false; 

    async function handleLogin(e) {
        e.preventDefault();
        console.log('Received login attempt:', { username, password });
        loading = true; 
        error = ''; 

        const res = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const result = await res.json();
        if (res.ok) {
            await invalidateAll();
            goto('/');
        } else {
            error = result.message || 'Login failed';
        }

        loading = false; 
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
                <input bind:value={password} type="password" placeholder="Password" required class="input-field" />
                {#if loading}
                    <button type="submit" class="login-btn" disabled>
                        <div class="loader"></div> 
                    </button>
                {:else}
                    <button type="submit" class="login-btn">LOGIN</button>
                {/if}
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

    .loader {
        border: 4px solid #f3f3f3; 
        border-radius: 50%;
        border-top: 4px solid #3498db; 
        width: 20px;
        height: 20px;
        animation: spin 2s linear infinite;
        margin: 0 auto; 
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>