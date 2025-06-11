import { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from './ui/carousel';

import CarouselIndicators from './CarouselIndicators';
import type { Photo, PhotoCarouselProps } from '@/types';

const PhotoCarousel = memo(({ photos }: PhotoCarouselProps) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full z-30">
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {photos.map((photo: Photo, index: number) => (
            <CarouselItem key={photo.id}>
              <motion.div
                className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 aspect-[3/4]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + (index * 0.2) }}
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 5,
                    delay: index * 2,
                  }}
                />
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <CarouselIndicators totalSlides={photos.length} currentSlide={current} />
    </div>
  );
});

PhotoCarousel.displayName = 'PhotoCarousel';
export default PhotoCarousel;