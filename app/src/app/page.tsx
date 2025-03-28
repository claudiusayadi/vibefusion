import fetcher from '@/utils/fetcher';
import { Movie } from '@/utils/types';
import Image from 'next/image';

export default async function Home() {
	const data = await fetcher('recommend', 'tired and worn out');
	console.log(data);
	return (
		<ul>
			{data.movies.map((movie: Movie) => (
				<li key={movie.id}>
					<Image
						src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
						alt={movie.title}
						width={500}
						height={750}
					/>
					<h2>{movie.title}</h2>
					<p>{movie.overview}</p>
					<p>
						Rating: {movie.vote_average} | Released: {movie.release_date}
					</p>
				</li>
			))}
		</ul>
	);
}
