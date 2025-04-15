import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { getRecommendations } from '@/utils/ai';
import { searchMovie, getMovieTrailer } from '@/utils/tmdb';
import { ApiResponse, env, querySchema } from '@/utils/types';

const router = new Hono().post(
	'/',
	zValidator('query', querySchema),
	async c => {
		try {
			const { mood } = c.req.valid('query');
			const recommendations = await getRecommendations(mood);

			if (!recommendations || !recommendations.recommended_titles.length)
				return c.json({ error: 'No recommendations found' }, 404);

			const moviesArrays = await Promise.all(
				recommendations.recommended_titles.map(searchMovie)
			);
			// Process movies and add full URLs
			const moviesWithTrailers = await Promise.all(
				moviesArrays.flat().map(async movie => {
					// Get trailer for the movie
					const trailerKey = await getMovieTrailer(movie.id);

					// Create a new object with only the properties desired
					const { poster_path, backdrop_path, ...restMovieProps } = movie;
					return {
						...restMovieProps,
						poster_url: poster_path
							? `${encodeURIComponent(env.TMDB_POSTER_URL)}${encodeURIComponent(
									poster_path
							  )}`
							: null,
						backdrop_url: backdrop_path
							? `${encodeURIComponent(
									env.TMDB_BACKDROP_URL
							  )}${encodeURIComponent(backdrop_path)}`
							: null,
						video_url: trailerKey
							? `${encodeURIComponent(env.TMDB_VIDEO_URL)}?v=${trailerKey}`
							: null,
					};
				})
			);

			const movies = moviesWithTrailers;

			const response = {
				detected_moods: recommendations.detected_moods,
				emotional_context: recommendations.emotional_context,
				viewing_experience: recommendations.viewing_experience,
				movies,
				total: movies.length,
			} as ApiResponse;

			return c.json(response);
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error ? error.message : 'An unknown error occurred';
			return c.json({ error: errorMessage }, 500);
		}
	}
);

export default router;
