import { fetchRecommendations } from '@/lib/actions';
import { Movie } from '@/utils/types';
import Image from 'next/image';

export default async function Home() {
	const data = await fetchRecommendations('recommend', 'tired and worn out');
	if (!data) {
		return <div>Error fetching data</div>;
	}
	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold text-center mb-6'>
				Movie Recommendations
			</h1>
			<p className='text-center text-lg mb-4'>
				<strong>Detected Moods:</strong> {data.detected_moods.join(', ')}
			</p>
			<p className='text-center text-lg mb-4'>
				<strong>Emotional Context:</strong> {data.emotional_context}
			</p>
			<p className='text-center text-lg mb-6'>
				<strong>Viewing Experience:</strong> {data.viewing_experience}
			</p>
			<ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
				{data.movies.map((movie: Movie) => (
					<li key={movie.id} className='border rounded-lg p-4 shadow-md'>
						<Image
							src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							alt={movie.title}
							className='w-full h-64 object-cover rounded-md mb-4'
						/>
						<h2 className='text-xl font-semibold'>{movie.title}</h2>
						<p className='text-sm text-gray-600 mb-2'>{movie.overview}</p>
						<p className='text-sm'>
							<strong>Rating:</strong> {movie.vote_average} / 10
						</p>
						<p className='text-sm'>
							<strong>Released:</strong> {movie.release_date}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
}
