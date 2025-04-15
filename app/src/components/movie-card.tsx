'use client';
import { useRouter } from 'next/navigation';
import { ApiResponse, Movie } from '@/utils/types';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MovieCards({ response }: { response: ApiResponse }) {
	const router = useRouter();

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
		<motion.div
			variants={container}
			initial='hidden'
			animate='show'
			className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8 w-full'>
			{response.movies.map(movie => (
				<motion.div
					key={movie.id}
					variants={item}
					layoutId={`movie-card-${movie.id}`}
					className='cursor-pointer'
					onClick={() => handleMovieClick(movie)}>
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
				</motion.div>
			))}
		</motion.div>
	);
}
