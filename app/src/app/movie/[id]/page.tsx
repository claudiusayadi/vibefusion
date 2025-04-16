'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Movie } from '@/utils/types';
import { Button } from '@/components/ui/button';
import { Star, Calendar, ArrowLeft, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppState } from '@/context/state-context';

export default function MovieDetailPage() {
	const params = useParams();
	const router = useRouter();
	const [movie, setMovie] = useState<Movie | null>(null);
	const [loading, setLoading] = useState(true);
	// Access the app state to ensure it's preserved when navigating back
	useAppState();

	useEffect(() => {
		const fetchMovie = async () => {
			try {
				// In a real app, you would fetch the movie details from your API
				// For now, we'll try to get it from localStorage as a workaround
				const storedMovies = localStorage.getItem('vibefusion_movies');
				if (storedMovies) {
					const movies = JSON.parse(storedMovies);
					const foundMovie = movies.find(
						(m: Movie) => m.id.toString() === params.id
					);
					if (foundMovie) {
						setMovie(foundMovie);
					}
				}
			} catch (error) {
				console.error('Error fetching movie:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchMovie();
	}, [params.id]);

	if (loading) {
		return (
			<div className='min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white flex items-center justify-center'>
				<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500'></div>
			</div>
		);
	}

	if (!movie) {
		return (
			<div className='min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white flex flex-col items-center justify-center p-4'>
				<h1 className='text-2xl font-bold mb-4'>Movie not found</h1>
				<Button
					onClick={() => router.push('/')}
					variant='default'
					className='bg-purple-600 hover:bg-purple-700'>
					Return to Home
				</Button>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white'>
			{/* Hero Section with Backdrop */}
			<div className='relative w-full h-[50vh] md:h-[60vh]'>
				{movie.backdrop_url ? (
					<Image
						src={movie.backdrop_url}
						alt={movie.title}
						fill
						className='object-cover'
						priority
					/>
				) : movie.poster_url ? (
					<Image
						src={movie.poster_url}
						alt={movie.title}
						fill
						className='object-cover'
						priority
					/>
				) : (
					<div className='w-full h-full bg-gray-800 flex items-center justify-center'>
						<span className='text-gray-400 text-xl'>No Image Available</span>
					</div>
				)}

				{/* Gradient Overlay */}
				<div className='absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent'></div>

				{/* Back Button */}
				<Button
					onClick={() => router.push('/')}
					variant='ghost'
					className='absolute top-4 left-4 text-white hover:bg-black/20 z-10'>
					<ArrowLeft className='mr-2 h-4 w-4' /> Back
				</Button>
			</div>

			<div className='container mx-auto px-4 -mt-32 relative z-10'>
				<div className='flex flex-col md:flex-row gap-8'>
					{/* Poster */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className='w-full md:w-1/3 lg:w-1/4'>
						<div className='relative aspect-[2/3] rounded-lg overflow-hidden shadow-xl'>
							{movie.poster_url ? (
								<Image
									src={movie.poster_url}
									alt={movie.title}
									fill
									className='object-cover'
								/>
							) : (
								<div className='w-full h-full bg-gray-800 flex items-center justify-center'>
									<span className='text-gray-400'>No Poster Available</span>
								</div>
							)}
						</div>
					</motion.div>

					{/* Details */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className='w-full md:w-2/3 lg:w-3/4'>
						<h1 className='text-3xl md:text-4xl font-bold mb-2'>
							{movie.title}
						</h1>

						<div className='flex flex-wrap items-center gap-4 mb-6'>
							<div className='flex items-center'>
								<Star className='text-yellow-400 w-5 h-5 mr-1' />
								<span className='text-white'>
									{movie.vote_average.toFixed(1)}
								</span>
							</div>
							<div className='flex items-center'>
								<Calendar className='text-gray-400 w-5 h-5 mr-1' />
								<span className='text-gray-300'>
									{new Date(movie.release_date).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</span>
							</div>
						</div>

						<div className='bg-gray-800/50 rounded-lg p-6 mb-6'>
							<h2 className='text-xl font-semibold mb-3'>Overview</h2>
							<p className='text-gray-300 leading-relaxed'>{movie.overview}</p>
						</div>

						{movie.video_url && (
							<a
								href={movie.video_url}
								target='_blank'
								rel='noopener noreferrer'
								className='block mb-6'>
								<Button className='w-full sm:w-auto flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full py-6 px-8'>
									<ExternalLink size={18} />
									Watch Trailer
								</Button>
							</a>
						)}
					</motion.div>
				</div>
			</div>
		</div>
	);
}
