import { memo } from 'react';
import { motion } from 'framer-motion';
import HeartRain from './HeartRain';
import type{ EntranceScreenProps } from '@/types';

const EntranceScreen = memo(({ onStart }: EntranceScreenProps) => {
  return (
    <motion.div
      key="entrance"
      initial={{ opacity: 1 }}
      exit={{
        scale: 0,
        opacity: 0,
        borderRadius: "50%"
      }}
      transition={{
        duration: 1.2,
        ease: [0.43, 0.13, 0.23, 0.96],
        scale: { duration: 1.0 },
        opacity: { duration: 0.6, delay: 0.2 }
      }}
      className="flex items-center justify-center min-h-screen relative"
    >
      <HeartRain count={20} />

      <motion.button
        onClick={onStart}
        className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-12 py-6 rounded-full text-xl font-semibold shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 relative z-10 hover:scale-105"
        whileHover={{
          scale: 1.05,
          boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)"
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.span
          initial={{ opacity: 1 }}
          className="relative z-20"
        >
          Clique aqui
        </motion.span>

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
          animate={{ x: ['-200%', '200%'] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />
      </motion.button>

      <motion.div
        className="absolute bottom-20 text-center text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <p className="text-lg mb-2">Uma surpresinha está te esperando...</p>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-2xl"
        >
          💝
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

EntranceScreen.displayName = 'EntranceScreen';
export default EntranceScreen;