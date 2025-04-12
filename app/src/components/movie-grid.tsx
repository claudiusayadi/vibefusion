'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ApiResponse, Movie } from '@/utils/types';
import { Star, Calendar, Clock, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MovieGridProps {
  data: ApiResponse;
}

export default function MovieGrid({ data }: MovieGridProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-white mb-6 pl-2 border-l-4 border-purple-500"
      >
        Recommended Movies
      </motion.h2>
      
      <div className="flex">
        <motion.ul 
          variants={container}
          initial="hidden"
          animate="show"
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ${selectedMovie ? 'w-2/3' : 'w-full'}`}
        >
          {data.movies.map((movie) => (
            <motion.li 
              key={movie.id}
              variants={item}
              layoutId={`movie-${movie.id}`}
              onClick={() => setSelectedMovie(movie)}
              className="cursor-pointer"
            >
              <article className="flex flex-col h-full">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 mb-2 hover:ring-2 hover:ring-purple-500 transition-all duration-300">
                  {movie.full_poster_path ? (
                    <Image
                      src={movie.full_poster_path}
                      alt={movie.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-400 text-sm">No Poster</span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <div className="flex items-center">
                      <Star className="text-yellow-400 w-4 h-4 mr-1" />
                      <span className="text-white text-xs">{movie.vote_average.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-white text-sm font-medium line-clamp-1">{movie.title}</h3>
                <p className="text-gray-400 text-xs">{new Date(movie.release_date).getFullYear()}</p>
              </article>
            </motion.li>
          ))}
        </motion.ul>

        <AnimatePresence>
          {selectedMovie && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: 'spring', damping: 30 }}
              className="w-1/3 fixed md:relative right-0 top-0 h-screen md:h-auto bg-gray-900 border-l border-gray-800 overflow-y-auto z-10"
            >
              <div className="p-6">
                <button 
                  onClick={() => setSelectedMovie(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>

                <div className="relative aspect-video rounded-lg overflow-hidden mb-6 bg-gray-800">
                  {selectedMovie.full_backdrop_path ? (
                    <Image
                      src={selectedMovie.full_backdrop_path}
                      alt={selectedMovie.title}
                      fill
                      className="object-cover"
                    />
                  ) : selectedMovie.full_poster_path ? (
                    <Image
                      src={selectedMovie.full_poster_path}
                      alt={selectedMovie.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-400">No Image Available</span>
                    </div>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">{selectedMovie.title}</h2>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Star className="text-yellow-400 w-5 h-5 mr-1" />
                    <span className="text-white">{selectedMovie.vote_average.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="text-gray-400 w-5 h-5 mr-1" />
                    <span className="text-gray-300">{new Date(selectedMovie.release_date).getFullYear()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="text-gray-400 w-5 h-5 mr-1" />
                    <span className="text-gray-300">N/A</span>
                  </div>
                </div>

                <p className="text-gray-300 mb-6">{selectedMovie.overview}</p>

                {selectedMovie.full_video_path && (
                  <a
                    href={selectedMovie.full_video_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mb-6"
                  >
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white border-none py-6"
                    >
                      <ExternalLink size={18} />
                      Watch Trailer
                    </Button>
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
