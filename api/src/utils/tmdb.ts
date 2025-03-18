import { env, Movie, SearchResponse } from './types';

/**
 * Searches TMDB for movies matching the provided title
 * @param title - The search term
 * @returns Promise resolving to an array of movies
 */
export async function searchTMDB(title: string): Promise<Movie[]> {
	try {
		const url = `${env.TMDB_API_URL}?query=${encodeURIComponent(
			title
		)}&include_adult=true&language=en-US&page=1`;
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${env.TMDB_API_KEY}`,
			},
		};

		const response = await fetch(url, options);

		if (!response.ok) {
			throw new Error(`TMDB API responded with status: ${response.status}`);
		}

		const data = (await response.json()) as SearchResponse;
		if (!data || !data.results) {
			throw new Error('Invalid response format from TMDB API');
		}

		return data.results.slice(0, 1);
	} catch (error) {
		console.error('Error searching TMDB:', error);
		return [];
	}
}
