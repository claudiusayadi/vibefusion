'use server';
import { ApiResponse } from '@/utils/types';

export async function fetchRecommendations(
	endpoint: string,
	query: string
): Promise<ApiResponse> {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;
	const url = `${baseUrl}/${endpoint}?mood=${encodeURIComponent(query)}`;

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
}
