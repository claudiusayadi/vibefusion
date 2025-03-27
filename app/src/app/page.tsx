'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

interface Movie {
	id: number;
	title: string;
	overview: string;
	poster_path: string;
	release_date: string;
	vote_average: number;
}

interface APIResponse {
	detected_moods: string[];
	emotional_context: string;
	viewing_experience: string;
	movies: Movie[];
}

export default function Home() {
	const [mood, setMood] = useState<string>('');
	const [results, setResults] = useState<APIResponse | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	return (
		<div className='min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900'>
			{/* Header */}
			<header className='pt-12 pb-8 text-center'>
				<h1 className='text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 animate-pulse'>
					VibeFusion
				</h1>
				<p className='text-xl md:text-2xl text-white mt-2 font-semibold'>
					Movies That Match Your Mood
				</p>
			</header>

			{/* Mood Input Form */}
			<main className='max-w-4xl mx-auto px-4'>
				<Card className='bg-white/10 backdrop-blur-lg border-none mb-12'>
					<CardContent className='pt-6'>
						<form
							action={async (formData: FormData) => {
								setLoading(true);
								const moodInput = formData.get('mood') as string;
								const response = await fetch(
									'https://vibefusion.dovely.tech/api/v1/recommend',
									{
										method: 'POST',
										headers: { 'Content-Type': 'application/json' },
										body: JSON.stringify({ mood: moodInput }),
									}
								);
								const data: APIResponse = await response.json();
								setResults(data);
								setLoading(false);
							}}
							className='flex gap-4'>
							<Input
								name='mood'
								placeholder="Enter your mood (e.g., 'romantic and hearty')"
								className='bg-white/20 border-none text-white placeholder:text-gray-300'
								value={mood}
								onChange={e => setMood(e.target.value)}
							/>
							<Button
								type='submit'
								className='bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600'>
								Find Movies
							</Button>
						</form>
					</CardContent>
				</Card>

				{/* Results Section */}
				{loading ? (
					<MovieSkeletonGrid />
				) : results ? (
					<div className='space-y-8'>
						<div className='text-white'>
							<h2 className='text-3xl font-bold mb-2'>
								Detected Moods: {results.detected_moods.join(', ')}
							</h2>
							<p className='text-lg'>{results.emotional_context}</p>
							<p className='text-md italic'>{results.viewing_experience}</p>
						</div>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{results.movies.map(movie => (
								<MovieCard key={movie.id} movie={movie} />
							))}
						</div>
					</div>
				) : (
					<p className='text-center text-white text-xl'>
						Enter a mood to get movie recommendations!
					</p>
				)}
			</main>
		</div>
	);
}

function MovieCard({ movie }: { movie: Movie }) {
	return (
		<Card className='bg-white/10 backdrop-blur-lg border-none hover:scale-105 transition-transform duration-300'>
			<CardHeader>
				<Image
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
					alt={movie.title}
					className='rounded-lg w-full h-64 object-cover'
					width={500}
					height={256}
				/>
			</CardHeader>
			<CardContent className='text-white'>
				<CardTitle className='text-xl mb-2'>{movie.title}</CardTitle>
				<p className='text-sm line-clamp-3'>{movie.overview}</p>
				<div className='mt-4 flex justify-between items-center'>
					<span className='text-yellow-400'>★ {movie.vote_average}</span>
					<span>{new Date(movie.release_date).getFullYear()}</span>
				</div>
			</CardContent>
		</Card>
	);
}

function MovieSkeletonGrid() {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
			{[...Array(6)].map((_, i) => (
				<Skeleton key={i} className='h-96 w-full bg-white/20 rounded-lg' />
			))}
		</div>
	);
}
