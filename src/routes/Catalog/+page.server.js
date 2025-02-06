export async function load({ url, locals, fetch }) {
	// if (!locals.user) return { status: 302, redirect: '/login' };
  
	const query = url.searchParams.get('q') || '';
	const res = await fetch(`/api/catalog?q=${encodeURIComponent(query)}`);
	const catalogData = await res.json();
  
	return {
	  catalog: catalogData.results,
	  query
	};
  }
  