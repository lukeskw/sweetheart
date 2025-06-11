import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useTimeCounter } from '@/hooks/useTimeCounter';

import EntranceScreen from '@/components/EntranceScreen';
import PhotoCarousel from '@/components/PhotoCarousel';
import TimeCounter from '@/components/TimeCounter';
import RomanticMessage from '@/components/RomanticMessage';
import HeartRain from '@/components/HeartRain';
import { photosData } from './data/photos';
import { SpotifyFrame } from './SpotifyFrame';

export default function RomanticMemorial() {
  const [showMainContent, setShowMainContent] = useState<boolean>(false);
  const [animationComplete, setAnimationComplete] = useState<boolean>(false);

  const relationshipStart = useMemo(() => new Date('2017-04-17'), []);
  const timeElapsed = useTimeCounter(relationshipStart);

  const photos = useMemo(() => photosData, []);

  const handleStartExperience = (): void => {
    setShowMainContent(true);
    setTimeout(() => setAnimationComplete(true), 1500);
  };

  return (
    <div className="min-h-screen max-w-xl mx-auto px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!showMainContent ? (
          <EntranceScreen onStart={handleStartExperience} />
        ) : (
          <motion.div
            key="main-content"
            initial={{
              scale: 0,
              opacity: 0,
              borderRadius: "50%"
            }}
            animate={{
              scale: 1,
              opacity: 1,
              borderRadius: "0%"
            }}
            transition={{
              duration: 1.5,
              ease: [0.43, 0.13, 0.23, 0.96],
              delay: 0.2
            }}
            className="min-h-screen relative"
          >
            {animationComplete && (
              <HeartRain count={10} />
            )}

            <div className="relative z-10 max-w-md mx-auto pt-8 pb-2">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <SpotifyFrame />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mx-4 my-8"
              >
                <PhotoCarousel photos={photos} />
              </motion.div>

              <TimeCounter timeElapsed={timeElapsed} />

              <RomanticMessage />

              <footer className='flex justify-center text-slate-600 border-t border-slate-600 pt-1 text-sm'>
                Feito com ❤ por Luke
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}