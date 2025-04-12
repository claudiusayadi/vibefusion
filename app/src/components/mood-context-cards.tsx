'use client';
import { motion } from 'framer-motion';
import { ApiResponse } from '@/utils/types';
import { Heart, Eye, Film } from 'lucide-react';

interface MoodContextCardsProps {
  data: ApiResponse;
}

export default function MoodContextCards({ data }: MoodContextCardsProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-5xl mx-auto mt-12 mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Detected Moods Card */}
        <motion.div variants={item} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center mb-4">
            <div className="bg-purple-500/20 p-3 rounded-lg mr-4">
              <Heart className="text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white">Detected Moods</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.detected_moods.map((mood, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
              >
                {mood}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Emotional Context Card */}
        <motion.div variants={item} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center mb-4">
            <div className="bg-pink-500/20 p-3 rounded-lg mr-4">
              <Eye className="text-pink-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white">Emotional Context</h3>
          </div>
          <p className="text-gray-300">{data.emotional_context}</p>
        </motion.div>

        {/* Viewing Experience Card */}
        <motion.div variants={item} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center mb-4">
            <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
              <Film className="text-blue-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white">Viewing Experience</h3>
          </div>
          <p className="text-gray-300">{data.viewing_experience}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
