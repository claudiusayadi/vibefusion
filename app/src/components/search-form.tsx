'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { fetchRecommendations } from '@/lib/actions';
import { ApiResponse } from '@/utils/types';

interface SearchFormProps {
  onResultsReceived: (data: ApiResponse) => void;
  setLoading: (loading: boolean) => void;
}

export default function SearchForm({ onResultsReceived, setLoading }: SearchFormProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const data = await fetchRecommendations('recommend', query);
      onResultsReceived(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe your mood or vibe (e.g., 'feeling nostalgic' or 'need something uplifting')"
            className="w-full bg-gray-800/50 border-2 border-gray-700 rounded-full py-4 pl-6 pr-16 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-600 text-white p-3 rounded-full hover:from-purple-600 hover:to-pink-700 transition-all duration-300"
          >
            <Search size={20} />
          </button>
        </div>
      </form>
    </motion.div>
  );
}
