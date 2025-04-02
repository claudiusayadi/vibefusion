import VibeInput from '@/components/vibe-input';

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-6 bg-gray-950'>
			<h1 className='text-4xl font-bold text-white mb-8'>
				VibeFusion Movie Recommender
			</h1>
			<VibeInput />
		</main>
	);
}
