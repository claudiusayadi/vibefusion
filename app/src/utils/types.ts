import { z } from 'zod';

export const movieSchema = z.object({
	id: z.number(),
	title: z.string(),
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

export type Movie = z.infer<typeof movieSchema>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>;
