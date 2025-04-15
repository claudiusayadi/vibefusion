import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	output: 'standalone',
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'image.tmdb.org',
				port: '',
				pathname: '**',
			},
		],
		domains: ['localhost'],
	},
};

export default nextConfig;
