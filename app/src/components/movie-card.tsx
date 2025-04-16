'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ApiResponse, Movie } from '@/utils/types';
import { Star, Calendar, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppState } from '@/context/state-context';

interface MovieGridProps {
	data: ApiResponse;
}

export default function MovieGrid({ data }: MovieGridProps) {
	const router = useRouter();
	const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
	const [isMobile, setIsMobile] = useState(false);
	const movieRefs = useRef<(HTMLLIElement | null)[]>([]);
	// Access the app state to ensure it's preserved
	const { setResponse } = useAppState();

	// Store movies in localStorage and context for the detail page to access
	useEffect(() => {
		if (data.movies.length > 0) {
			localStorage.setItem('vibefusion_movies', JSON.stringify(data.movies));
			// Also update the context with the current response data
			setResponse(data);
		}
	}, [data, data.movies, setResponse]);

	// Check if device is mobile
	useEffect(() => {
		const checkIfMobile = () => {
			setIsMobile(window.innerWidth < 1024);
		};

		checkIfMobile();
		window.addEventListener('resize', checkIfMobile);

		return () => {
			window.removeEventListener('resize', checkIfMobile);
		};
	}, []);

	// Auto-focus the first movie item when component mounts
	useEffect(() => {
		if (data.movies.length > 0 && !isMobile) {
			// Set the first movie as selected by default
			setSelectedMovie(data.movies[0]);

			// Focus the first movie item
			if (movieRefs.current[0]) {
				movieRefs.current[0].focus();
			}
		}
	}, [data.movies, isMobile]);

	// Handle single click to show details
	const handleMovieClick = (movie: Movie) => {
		setSelectedMovie(movie);
	};

	// Handle double click to navigate to detail page
	const handleMovieDoubleClick = (movie: Movie) => {
		router.push(`/movie/${movie.id}`);
	};

	// Handle keyboard navigation
	const handleKeyDown = (e: React.KeyboardEvent, movie: Movie) => {
		if (e.key === 'Enter') {
			router.push(`/movie/${movie.id}`);
		}
	};

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05,
			},
		},
	};

	const item = {
		hidden: { y: 20, opacity: 0 },
		show: { y: 0, opacity: 1 },
	};

	return (
		<div className='relative w-full max-w-7xl mx-auto'>
			<motion.h2
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				className='text-2xl font-bold text-white mb-6 pl-2 border-l-4 border-purple-500'>
				Recommended Movies
			</motion.h2>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				<div className='lg:col-span-2'>
					<motion.ul
						variants={container}
						initial='hidden'
						animate='show'
						className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
						{data.movies.map((movie, index) => (
							<motion.li
								key={movie.id}
								ref={(el: HTMLLIElement | null) => {
									movieRefs.current[index] = el;
								}}
								variants={item}
								layoutId={`movie-${movie.id}`}
								onClick={() => handleMovieClick(movie)}
								onDoubleClick={() => handleMovieDoubleClick(movie)}
								onKeyDown={e => handleKeyDown(e, movie)}
								tabIndex={0}
								className={`cursor-pointer focus:outline-none ${
									selectedMovie?.id === movie.id ? 'ring-2 ring-purple-500' : ''
								}`}>
								<article className='flex flex-col h-full'>
									<div className='relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 mb-2 transition-all duration-300'>
										<figure className='w-full h-full m-0'>
											{movie.poster_url ? (
												<picture>
													{/* WebP format for browsers that support it */}
													<source
														type='image/webp'
														srcSet={movie.poster_url.replace(
															/\.(jpg|jpeg|png)$/i,
															'.webp'
														)}
													/>
													{/* Fallback for browsers that don't support WebP */}
													<img
														src={movie.poster_url}
														alt={movie.title}
														className='w-full h-full object-cover'
														loading='lazy'
														decoding='async'
													/>
												</picture>
											) : (
												<div className='w-full h-full flex items-center justify-center'>
													<span className='text-gray-400 text-sm'>
														No Poster
													</span>
												</div>
											)}
										</figure>
										<div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2'>
											<div className='flex items-center'>
												<Star className='text-yellow-400 w-4 h-4 mr-1' />
												<span className='text-white text-xs'>
													{movie.vote_average.toFixed(1)}
												</span>
											</div>
										</div>
									</div>
									<h3 className='text-white text-sm font-medium line-clamp-1'>
										{movie.title}
									</h3>
									<p className='text-gray-400 text-xs'>
										{new Date(movie.release_date).getFullYear()}
									</p>
								</article>
							</motion.li>
						))}
					</motion.ul>
				</div>

				{/* Sidebar - Now in grid layout */}
				<div className='lg:col-span-1'>
					<AnimatePresence>
						{selectedMovie && !isMobile ? (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className='bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-xl h-full'>
								<div className='p-6 relative'>
									{/* Close button with higher z-index */}
									<button
										onClick={() => setSelectedMovie(null)}
										className='absolute top-2 right-2 text-white hover:text-purple-400 bg-gray-800 hover:bg-gray-700 rounded-full p-2 z-30 transition-colors duration-200'>
										<X size={20} />
									</button>

									<div className='relative aspect-video rounded-lg overflow-hidden mb-6 bg-gray-800 mt-8'>
										<figure className='w-full h-full m-0'>
											{selectedMovie.backdrop_url ? (
												<picture>
													{/* WebP format for browsers that support it */}
													<source
														type='image/webp'
														srcSet={selectedMovie.backdrop_url.replace(
															/\.(jpg|jpeg|png)$/i,
															'.webp'
														)}
													/>
													{/* Fallback for browsers that don't support WebP */}
													<img
														src={selectedMovie.backdrop_url}
														alt={selectedMovie.title}
														className='w-full h-full object-cover'
														loading='lazy'
														decoding='async'
													/>
												</picture>
											) : selectedMovie.poster_url ? (
												<picture>
													{/* WebP format for browsers that support it */}
													<source
														type='image/webp'
														srcSet={selectedMovie.poster_url.replace(
															/\.(jpg|jpeg|png)$/i,
															'.webp'
														)}
													/>
													{/* Fallback for browsers that don't support WebP */}
													<img
														src={selectedMovie.poster_url}
														alt={selectedMovie.title}
														className='w-full h-full object-cover'
														loading='lazy'
														decoding='async'
													/>
												</picture>
											) : (
												<div className='w-full h-full flex items-center justify-center'>
													<span className='text-gray-400'>
														No Image Available
													</span>
												</div>
											)}
										</figure>
									</div>

									<h2 className='text-2xl font-bold text-white mb-2'>
										{selectedMovie.title}
									</h2>

									<div className='flex items-center gap-4 mb-4'>
										<div className='flex items-center'>
											<Star className='text-yellow-400 w-5 h-5 mr-1' />
											<span className='text-white'>
												{selectedMovie.vote_average.toFixed(1)}
											</span>
										</div>
										<div className='flex items-center'>
											<Calendar className='text-gray-400 w-5 h-5 mr-1' />
											<span className='text-gray-300'>
												{new Date(selectedMovie.release_date).getFullYear()}
											</span>
										</div>
									</div>

									<p className='text-gray-300 mb-6 line-clamp-4'>
										{selectedMovie.overview}
									</p>

									<div className='flex flex-col gap-3'>
										<Button
											onClick={() => handleMovieDoubleClick(selectedMovie)}
											className='w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full py-5'>
											View Details
										</Button>

										{selectedMovie.video_url && (
											<a
												href={selectedMovie.video_url}
												target='_blank'
												rel='noopener noreferrer'
												className='block'>
												<Button
													variant='outline'
													className='w-full flex items-center justify-center gap-2 bg-transparent hover:bg-gray-800 text-white border border-purple-500 rounded-full py-5'>
													<ExternalLink size={18} />
													Watch Trailer
												</Button>
											</a>
										)}
									</div>
								</div>
							</motion.div>
						) : (
							<div className='hidden lg:block bg-gray-900/50 border border-gray-800/50 rounded-lg h-full'>
								<div className='flex items-center justify-center h-full text-gray-500'>
									<p>Select a movie to see details</p>
								</div>
							</div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}
