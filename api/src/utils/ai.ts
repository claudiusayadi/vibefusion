import { AiResponse } from './types';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { env } from './types';

const schema = {
	description: 'Mood analysis and movie recommendations',
	type: SchemaType.OBJECT,
	properties: {
		detected_moods: {
			type: SchemaType.ARRAY,
			items: {
				type: SchemaType.STRING,
				description: 'Detected mood',
				nullable: false,
			},
		},
		emotional_context: {
			type: SchemaType.STRING,
			description: 'Emotional context of the query',
			nullable: false,
		},
		viewing_experience: {
			type: SchemaType.STRING,
			description: 'Description of the desired viewing experience',
			nullable: false,
		},
		recommended_titles: {
			type: SchemaType.ARRAY,
			items: {
				type: SchemaType.STRING,
				description: 'Recommended movie title',
				nullable: false,
			},
		},
	},
	required: [
		'detected_moods',
		'emotional_context',
		'viewing_experience',
		'recommended_titles',
	],
};

const systemPrompt = `
You are a movie recommendation expert. Analyze the user's mood or vibe query and respond with a structured JSON object containing:
1. "detected_moods": An array of emotional states detected in the query
2. "emotional_context": A brief analysis of the emotional context
3. "viewing_experience": A brief description of the desired viewing experience
3. "recommended_titles": An array of 5-8 movie titles that match the mood

Only return valid JSON without any additional text or explanation. Do not hallucinate or make up information. All recommended titles should be real movies verifiable from real movie databases like TMDB, Rotten Tomatoes, etc. The user may mention specific genres or themes, but you should focus on the overall mood.

Example input: "I'm feeling a bit down and need something uplifting."
Example output: {
	"detected_moods": ["depressed", "hopeful"],
	"emotional_context": "You are looking for a feel-good movie that inspires hope and positivity.",
	"viewing_experience": "Best viewed with family or friends for a shared experience.",required: [
	"recommended_titles": ["The Shawshank Redemption", "The Secret Life of Walter Mitty", "Good Will Hunting"]
}
Example input: "I want to watch something action-packed and thrilling."
Example output: {
	"detected_moods": ["excited", "adventurous"],
	"emotional_context": "You are looking for an adrenaline-pumping experience.",
	"viewing_experience": "Best viewed with friends for a thrilling experience.",
	"recommended_titles": ["Mad Max: Fury Road", "John Wick", "Die Hard"]
}
Example input: "I want to watch something light-hearted and funny."
Example output: {
	"detected_moods": ["happy", "playful"],
	"emotional_context": "You are looking for a comedy that brings joy and laughter.",
	"viewing_experience": "Best viewed with friends or family for a fun experience.",
	"recommended_titles": ["Superbad", "The Hangover", "Bridesmaids"]
}

Example input: "I want to watch something romantic and heartfelt."
Example output: {
	"detected_moods": ["romantic", "heartfelt"],
	"emotional_context": "You are looking for something that evokes feelings of love and warmth.",
	"viewing_experience": "Best viewed with a partner for a cozy experience.",
	"recommended_titles": ["The Notebook", "Pride & Prejudice", "About Time"]
}
`;

/**
 * AI API call that analyzes a user's mood/vibe query and returns structured recommendations
 * @param query - The user's mood or vibe query
 * @returns A structured response with mood analysis and recommendations
 */
export async function getRecommendations(query: string): Promise<AiResponse> {
	const genAI = new GoogleGenerativeAI(env.AI_API_KEY);
	const model = genAI.getGenerativeModel({
		model: env.AI_MODEL,
		generationConfig: {
			responseMimeType: 'application/json',
			responseSchema: schema,
		},
		systemInstruction: systemPrompt,
	});

	try {
		const result = await model.generateContent(query);
		const responseText = result.response.text();
		const parsedResponse = JSON.parse(responseText) as AiResponse;

		return parsedResponse;
	} catch (error) {
		console.error('Error analyzing mood with Gemini:', error);
		throw error;
	}
}
