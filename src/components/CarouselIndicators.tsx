import { memo } from 'react';
import { motion } from 'framer-motion';

interface CarouselIndicatorsProps {
  totalSlides: number;
  currentSlide: number;
}

const CarouselIndicators = memo(({ totalSlides, currentSlide }: CarouselIndicatorsProps) => {
  return (
    <div className="flex justify-center space-x-2 mt-4">
      {Array.from({ length: totalSlides }, (_, index) => (
        <motion.div
          key={index}
          className={`size-1.5 rounded-full transition-all duration-300 ${
            index === currentSlide
              ? 'bg-red-400 scale-125'
              : 'bg-gray-400/50'
          }`}
          initial={{ scale: 0.8 }}
          animate={{
            scale: index === currentSlide ? 1.25 : 1,
            backgroundColor: index === currentSlide ? '#62748e' : '#9ca3af80'
          }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  );
});

CarouselIndicators.displayName = 'CarouselIndicators';
export default CarouselIndicators;