import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { getRecommendations } from '@/utils/ai';
import { searchTMDB } from '@/utils/tmdb';
import { ApiResponse, querySchema } from '@/utils/types';

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
				recommendations.recommended_titles.map(searchTMDB)
			);
			const movies = moviesArrays.flat();

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
