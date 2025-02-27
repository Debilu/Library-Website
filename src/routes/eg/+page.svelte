<script>
    import { onMount, onDestroy } from 'svelte';

    let showDropdown = false;
    let scrollY = 0;

    let handleScroll;

    onMount(() => {
        if (typeof window !== 'undefined') {
            handleScroll = () => {
                scrollY = window.scrollY;
                showDropdown = scrollY > 100;
                document.body.classList.toggle('scrolling', scrollY > 50);
                document.documentElement.style.setProperty('--scrollY', `${scrollY * 0.5}px`);
            };

            window.addEventListener('scroll', handleScroll);
        }
    });

    onDestroy(() => {
        if (typeof window !== 'undefined' && handleScroll) {
            window.removeEventListener('scroll', handleScroll);
        }
    });
</script>

<style>
    body {
        margin: 0;
        font-family: Arial, sans-serif;
        background-color: #1e1e30;
        color: white;
        overflow-x: hidden;
    }
    .header {
        position: absolute;
        top: 0;
        width: 100%;
        background-color: transparent;
        padding: 20px;
        text-align: center;
        z-index: 1000;
        transition: transform 0.5s ease-in-out;
        transform: translateY(var(--scrollY, 0px));
    }
    .banner {
        width: 100%;
        height: 100vh;
        background: url('libimg.png') center/cover no-repeat;
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
        transform: translateY(var(--scrollY, 0px));
    }
    .dropdown {
        position: fixed;
        top: -200px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #292b45;
        padding: 20px;
        text-align: center;
        transition: top 0.5s ease-in-out, opacity 0.5s;
        z-index: 999;
        border-radius: 10px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        opacity: 0;
    }
    .dropdown.show {
        top: 100px;
        opacity: 1;
    }
    .content {
        text-align: center;
        padding: 50px 20px;
        background-color: #1e1e30;
        min-height: 200vh;
        position: relative;
        margin-top: 100vh;
    }
    .menu {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .menu-item {
        margin: 10px 0;
        font-size: 18px;
        padding: 15px 30px;
        border-radius: 5px;
        transition: background-color 0.3s, transform 0.2s;
        background-color: #3a3d5b;
        color: white;
        text-align: center;
        width: 250px;
        cursor: pointer;
    }
    .menu-item:hover {
        background-color: #50527b;
        transform: scale(1.05);
    }
</style>

<div class="header">
    <h2>Welcome to the Library</h2>
    <p>Explore books and get personalized recommendations.</p>
</div>
<div class="banner"></div>

{#if showDropdown}
    <div class="dropdown show">
        <div class="menu">
            <div class="menu-item">📚 Frequently Taken Books</div>
            <div class="menu-item">📖 Personalized Recommendations</div>
        </div>
    </div>
{/if}

<div class="content"></div>
