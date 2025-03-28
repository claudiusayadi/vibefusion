const fetcher = async (query: string, endpoint: string) => {
	const url = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`;

	if (!url) {
		throw new Error(
			'NEXT_PUBLIC_API_URL is not defined in the environment variables.'
		);
	}

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ query }),
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status} ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Failed to fetch:', error);
		throw error;
	}
};

export default fetcher;
