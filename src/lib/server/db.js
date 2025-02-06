export async function fetchCatalogFromDB(query) {
	await new Promise((resolve) => setTimeout(resolve, 100)); // simulate delay
	return {
	  results: [
		{ id: 1, title: `Book 1 matching "${query}"`, author: 'Author A' },
		{ id: 2, title: `Book 2 matching "${query}"`, author: 'Author B' }
	  ]
	};
  }
  
  export async function fetchBookFromDB(slug) {
	await new Promise((resolve) => setTimeout(resolve, 100)); // simulate delay
	return { title: `Book with slug ${slug}`, author: 'Author A' };
  }
  
  // Example: Get recommendations based on semester
  export async function fetchRecommendations(semester) {
	await new Promise((resolve) => setTimeout(resolve, 100));
	return [
	  { id: 101, title: `Recommended Book for Semester ${semester}`, author: 'Author X' },
	  { id: 102, title: `Another Book for Semester ${semester}`, author: 'Author Y' }
	];
  }
  