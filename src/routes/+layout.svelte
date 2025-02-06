<script>
	import '../app.css';
	import Header from '$lib/Header.svelte';
  
	export let data; // Receive session data from layout.server.js
  </script>
  
  <Header {data} />
  
  <main>
	<slot />  <!-- This renders child pages dynamically -->
  </main>
  