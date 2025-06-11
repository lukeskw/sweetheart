import  { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

const FallingHeart = memo(() => {
  const left = useMemo(() => Math.random() * 100, []);
  const duration = useMemo(() => Math.random() * 2 + 7, []);
  const delay = useMemo(() => Math.random() * 5, []);
  const scale = useMemo(() => Math.random() * 0.8 + 1, []);

  return (
    <motion.div
      className="absolute text-red-500 z-50"
      style={{
        top: '-15vh',
        left: `${left}vw`,
        scale: scale,
      }}
      initial={{ opacity: 0 }}
      animate={{
        y: '200vh',
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: 'loop',
        ease: "linear"
      }}
    >
      ❣
    </motion.div>
  );
});

FallingHeart.displayName = 'FallingHeart';
export default FallingHeart;