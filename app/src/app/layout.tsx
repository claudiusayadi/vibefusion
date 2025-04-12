import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap',
});

const outfit = Outfit({
	subsets: ['latin'],
	variable: '--font-outfit',
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'VibeFusion | Movie Recommendations Based on Your Mood',
	description:
		'Discover the perfect movies for your current mood or vibe with VibeFusion, an AI-powered movie recommendation platform.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className='dark'>
			<body
				className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-gray-950 text-white overflow-x-hidden`}>
				{children}
			</body>
		</html>
	);
}
