'use client';
import { useEffect } from 'react';
import { ApiResponse } from '@/utils/types';
import Logo from './logo';
import SearchForm from './search-form';
import MoodContextCards from './mood-context-cards';
import MovieGrid from './movie-grid';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useAppState } from '@/context/state-context';

export default function HomePage() {
	const { response, loading, setResponse, setLoading } = useAppState();

	// Restore scroll position if we have results
	useEffect(() => {
		if (response && response.movies.length > 0) {
			// Small delay to ensure the component has rendered
			setTimeout(() => {
				window.scrollTo({
					top: 200,
					behavior: 'smooth',
				});
			}, 100);
		}
	}, [response]);

	const handleResultsReceived = (data: ApiResponse) => {
		setResponse(data);
		// Scroll to results after a short delay to allow for animation
		setTimeout(() => {
			if (data.movies.length > 0) {
				window.scrollTo({
					top: 200,
					behavior: 'smooth',
				});
			}
		}, 300);
	};

	return (
		<main className='min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white'>
			<div className='container mx-auto px-4 py-12'>
				{/* Logo and Search Section */}
				<section className='mb-12'>
					<Logo />
					<SearchForm
						onResultsReceived={handleResultsReceived}
						setLoading={setLoading}
					/>
				</section>

				{/* Loading Indicator */}
				<AnimatePresence>
					{loading && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className='flex justify-center my-12'>
							<Loader2 className='w-12 h-12 text-purple-500 animate-spin' />
						</motion.div>
					)}
				</AnimatePresence>

				{/* Results Section */}
				<AnimatePresence>
					{response && !loading && (
						<motion.section
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}>
							<MoodContextCards data={response} />
							<MovieGrid data={response} />
						</motion.section>
					)}
				</AnimatePresence>
			</div>
		</main>
	);
}
