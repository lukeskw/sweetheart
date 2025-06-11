import { memo } from 'react';
import FallingHeart from './FallingHeart';
import {type HeartRainProps } from '@/types';

const HeartRain = memo(({ count = 20 }: HeartRainProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {[...Array(count)].map((_, i) => (
        <FallingHeart key={i} />
      ))}
    </div>
  );
});

HeartRain.displayName = 'HeartRain';
export default HeartRain;