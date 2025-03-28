import { ApiResponse } from '@/utils/types';

const fetcher = async (
	endpoint: string,
	query: string
): Promise<ApiResponse> => {
	const url = `https://vibefusion.dovely.tech/api/v1/${endpoint}?mood=${encodeURIComponent(
		query
	)}`;

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
