import { env, Movie, SearchResponse, VideoResponse } from './types';

/**
 * Fetches videos (trailers) for a specific movie from TMDB
 * @param movieId - The TMDB movie ID
 * @returns Promise resolving to a YouTube video key or null if no trailer is found
 */
export async function getMovieTrailer(movieId: number): Promise<string | null> {
	try {
		const url = `${env.TMDB_MOVIE_VIDEOS_URL}/${movieId}/videos?language=en-US`;
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

		const data = (await response.json()) as VideoResponse;
		if (!data || !data.results) {
			return null;
		}

		// First try to find an official YouTube trailer
		const officialTrailer = data.results.find(
			video =>
				video.site === 'YouTube' &&
				video.type === 'Trailer' &&
				video.official === true
		);

		if (officialTrailer) {
			return officialTrailer.key;
		}

		// If no official trailer, try to find any YouTube trailer
		const anyTrailer = data.results.find(
			video => video.site === 'YouTube' && video.type === 'Trailer'
		);

		if (anyTrailer) {
			return anyTrailer.key;
		}

		// If no trailer, try to find any YouTube video
		const anyVideo = data.results.find(video => video.site === 'YouTube');

		return anyVideo ? anyVideo.key : null;
	} catch (error) {
		console.error('Error fetching movie trailer:', error);
		return null;
	}
}

export async function searchTMDB(title: string): Promise<Movie[]> {
	try {
		const url = `${env.TMDB_MOVIE_SEARCH_URL}?query=${encodeURIComponent(
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
