import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ApiResponse } from '@/utils/types';
import Image from 'next/image';

export default function MovieCards({ response }: { response: ApiResponse }) {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full'>
			{response.movies.map(movie => (
				<Card
					key={movie.id}
					className='bg-gray-900 border-gray-800 hover:shadow-lg hover:shadow-indigo-500/20 transition-shadow duration-300'>
					<CardHeader className='p-4'>
						<CardTitle className='text-lg font-medium text-white truncate'>
							{movie.title}
						</CardTitle>
					</CardHeader>
					<CardContent className='p-4 pt-0'>
						{movie.poster_path ? (
							<div className='relative w-full h-72 mb-4'>
								<Image
									src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
									alt={movie.title}
									fill
									className='object-cover rounded-md'
									sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								/>
							</div>
						) : (
							<div className='w-full h-72 bg-gray-700 rounded-md mb-4 flex items-center justify-center'>
								<span className='text-gray-400'>No Poster Available</span>
							</div>
						)}
						<p className='text-gray-300 text-sm line-clamp-3'>
							{movie.overview}
						</p>
						<div className='mt-3 text-gray-400 text-sm'>
							<p>
								<strong>Release:</strong> {movie.release_date}
							</p>
							<p>
								<strong>Rating:</strong> {movie.vote_average}/10
							</p>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
