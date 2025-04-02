import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { fetchRecommendations } from '@/lib/actions';
import { ApiResponse } from '@/utils/types';
import MovieCards from './movie-card';

export default function VibeInput() {
	const [query, setQuery] = useState('');
	const [loading, setLoading] = useState(false);
	const [response, setResponse] = useState<ApiResponse | null>(null);

	const handleSubmit = async () => {
		if (!query.trim()) return; // Prevent empty submissions
		setLoading(true);
		try {
			const data = await fetchRecommendations('recommend', query);
			setResponse(data);
		} catch (error) {
			console.error('Error fetching recommendations:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex flex-col items-center w-full max-w-2xl'>
			<div className='flex w-full gap-2'>
				<Input
					type='text'
					placeholder="Describe your vibe (e.g., 'worn out and tired')"
					value={query}
					onChange={e => setQuery(e.target.value)}
					className='flex-1 bg-gray-800 text-white border-gray-700 focus:ring-2 focus:ring-indigo-500'
					disabled={loading}
				/>
				<Button
					onClick={handleSubmit}
					disabled={loading}
					className='bg-indigo-600 hover:bg-indigo-700'>
					{loading ? 'Loading...' : 'Get Recommendations'}
				</Button>
			</div>
			{response && (
				<>
					<div className='mt-6 text-center'>
						<h2 className='text-xl font-semibold text-white'>
							Detected Moods: {response.detected_moods.join(', ')}
						</h2>
						<p className='text-gray-300 mt-2'>{response.emotional_context}</p>
						<p className='text-gray-400'>{response.viewing_experience}</p>
					</div>
					<MovieCards response={response} />
				</>
			)}
		</div>
	);
}
