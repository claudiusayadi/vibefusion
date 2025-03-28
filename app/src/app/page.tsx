import fetcher from '@/utils/fetcher';

export default async function Home() {
	const data = await fetcher('recommend', 'tired and worn out');
	console.log(data);
	return <p className='text-center font-bold'>Hello from Next.js</p>;
}
