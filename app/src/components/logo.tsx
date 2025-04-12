'use client';
import { motion } from 'framer-motion';

export default function Logo() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center mb-12"
    >
      <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        VibeFusion
      </h1>
      <p className="text-gray-400 mt-2 text-lg md:text-xl">Find the perfect movie for your mood</p>
    </motion.div>
  );
}
