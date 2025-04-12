import { z } from 'zod';

export const envSchema = z.object({
	TMDB_API_KEY: z.string().min(1, 'TMDB API key is required'),
	TMDB_MOVIE_SEARCH_URL: z.string().min(1, 'TMDB movie search URL is required'),
	TMDB_MOVIE_VIDEOS_URL: z.string().min(1, 'TMDB movie videos URL is required'),
	TMDB_IMAGE_URL: z.string().min(1, 'TMDB image URL is required'),
	TMDB_VIDEO_URL: z.string().min(1, 'TMDB video URL is required'),
	AI_MODEL: z.string().min(1, 'AI model is required'),
	AI_API_KEY: z.string().min(1, 'AI API key is required'),
	API_PORT: z.string().default('3001').transform(Number),
});

export const movieSchema = z.object({
	id: z.number(),
	title: z.string(),
	poster_path: z.string().nullable(),
	backdrop_path: z.string().nullable().optional(),
	full_poster_path: z.string().nullable().optional(),
	full_backdrop_path: z.string().nullable().optional(),
	full_video_path: z.string().nullable().optional(),
	release_date: z.string(),
	overview: z.string(),
	vote_average: z.number(),
});

export const AiResponseSchema = z.object({
	detected_moods: z.array(z.string()),
	emotional_context: z.string(),
	viewing_experience: z.string(),
	recommended_titles: z.array(z.string()),
});

export const videoResultSchema = z.object({
	site: z.string(),
	key: z.string(),
	type: z.string(),
	official: z.boolean(),
});

export const videoResponseSchema = z.object({
	results: z.array(videoResultSchema),
});

export const searchResponseSchema = z.object({
	page: z.number(),
	results: z.array(movieSchema),
	total_pages: z.number(),
	total_results: z.number(),
});

export const ApiResponseSchema = z.object({
	detected_moods: AiResponseSchema.shape.detected_moods,
	emotional_context: AiResponseSchema.shape.emotional_context,
	viewing_experience: AiResponseSchema.shape.viewing_experience,
	movies: z.array(movieSchema),
	total: z.number(),
});

export const querySchema = z.object({
	mood: z.string().min(1, { message: 'Mood is required' }),
});

export type Env = z.infer<typeof envSchema>;
export type Movie = z.infer<typeof movieSchema>;
export type AiResponse = z.infer<typeof AiResponseSchema>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>;
export type SearchResponse = z.infer<typeof searchResponseSchema>;
export type VideoResult = z.infer<typeof videoResultSchema>;
export type VideoResponse = z.infer<typeof videoResponseSchema>;

export const env = envSchema.parse({
	TMDB_API_KEY: Bun.env.TMDB_API_KEY,
	TMDB_MOVIE_SEARCH_URL: Bun.env.TMDB_MOVIE_SEARCH_URL,
	TMDB_MOVIE_VIDEOS_URL: Bun.env.TMDB_MOVIE_VIDEOS_URL,
	TMDB_IMAGE_URL: Bun.env.TMDB_IMAGE_URL,
	TMDB_VIDEO_URL: Bun.env.TMDB_VIDEO_URL,
	AI_API_KEY: Bun.env.AI_API_KEY,
	AI_MODEL: Bun.env.AI_MODEL,
	API_PORT: Bun.env.API_PORT,
});
