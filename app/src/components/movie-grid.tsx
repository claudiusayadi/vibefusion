'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ApiResponse, Movie } from '@/utils/types';
import { Star, Calendar, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MovieGridProps {
	data: ApiResponse;
}

export default function MovieGrid({ data }: MovieGridProps) {
	const router = useRouter();
	const [hoveredMovie, setHoveredMovie] = useState<Movie | null>(null);
	const [isMobile, setIsMobile] = useState(false);

	// Store movies in localStorage for the detail page to access
	useEffect(() => {
		if (data.movies.length > 0) {
			localStorage.setItem('vibefusion_movies', JSON.stringify(data.movies));
		}
	}, [data.movies]);

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

	const handleMovieClick = (movie: Movie) => {
		router.push(`/movie/${movie.id}`);
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

			<div className='flex'>
				<motion.ul
					variants={container}
					initial='hidden'
					animate='show'
					className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ${
						hoveredMovie && !isMobile ? 'lg:w-2/3' : 'w-full'
					}`}>
					{data.movies.map(movie => (
						<motion.li
							key={movie.id}
							variants={item}
							layoutId={`movie-${movie.id}`}
							onClick={() => handleMovieClick(movie)}
							onMouseEnter={() => !isMobile && setHoveredMovie(movie)}
							onMouseLeave={() => !isMobile && setHoveredMovie(null)}
							className='cursor-pointer'>
							<article className='flex flex-col h-full'>
								<div className='relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 mb-2 hover:ring-2 hover:ring-purple-500 transition-all duration-300'>
									{movie.poster_url ? (
										<Image
											src={movie.poster_url}
											alt={movie.title}
											fill
											className='object-cover'
											sizes='(max-width: 768px) 50vw, 20vw'
										/>
									) : (
										<div className='w-full h-full flex items-center justify-center'>
											<span className='text-gray-400 text-sm'>No Poster</span>
										</div>
									)}
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

				{/* Sidebar - Only visible on desktop when hovering */}
				<AnimatePresence>
					{hoveredMovie && !isMobile && (
						<motion.div
							initial={{ x: 300, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: 300, opacity: 0 }}
							transition={{ type: 'spring', damping: 30 }}
							className='w-1/3 hidden lg:block fixed right-0 top-0 h-screen bg-gray-900 border-l border-gray-800 overflow-y-auto z-20 shadow-xl'>
							<div className='p-6 relative'>
								{/* Close button with higher z-index */}
								<button
									onClick={() => setHoveredMovie(null)}
									className='absolute top-2 right-2 text-white hover:text-purple-400 bg-gray-800 hover:bg-gray-700 rounded-full p-2 z-30 transition-colors duration-200'>
									<X size={20} />
								</button>

								<div className='relative aspect-video rounded-lg overflow-hidden mb-6 bg-gray-800 mt-8'>
									{hoveredMovie.backdrop_url ? (
										<Image
											src={hoveredMovie.backdrop_url}
											alt={hoveredMovie.title}
											fill
											className='object-cover'
										/>
									) : hoveredMovie.poster_url ? (
										<Image
											src={hoveredMovie.poster_url}
											alt={hoveredMovie.title}
											fill
											className='object-cover'
										/>
									) : (
										<div className='w-full h-full flex items-center justify-center'>
											<span className='text-gray-400'>No Image Available</span>
										</div>
									)}
								</div>

								<h2 className='text-2xl font-bold text-white mb-2'>
									{hoveredMovie.title}
								</h2>

								<div className='flex items-center gap-4 mb-4'>
									<div className='flex items-center'>
										<Star className='text-yellow-400 w-5 h-5 mr-1' />
										<span className='text-white'>
											{hoveredMovie.vote_average.toFixed(1)}
										</span>
									</div>
									<div className='flex items-center'>
										<Calendar className='text-gray-400 w-5 h-5 mr-1' />
										<span className='text-gray-300'>
											{new Date(hoveredMovie.release_date).getFullYear()}
										</span>
									</div>
								</div>

								<p className='text-gray-300 mb-6 line-clamp-4'>
									{hoveredMovie.overview}
								</p>

								<div className='flex flex-col gap-3'>
									<Button
										onClick={() => handleMovieClick(hoveredMovie)}
										className='w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full py-5'>
										View Details
									</Button>

									{hoveredMovie.video_url && (
										<a
											href={hoveredMovie.video_url}
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
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
