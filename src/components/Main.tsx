import { useState, useEffect, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

interface TimeElapsed {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Photo {
  id: number;
  url: string;
  alt: string;
}

interface PhotoCarouselProps {
  photos: Photo[];
}

interface TimeCounterProps {
  timeElapsed: TimeElapsed;
}

interface EntranceScreenProps {
  onStart: () => void;
}

interface HeartRainProps {
  count?: number;
}

const calculateTimeDifference = (startDate: Date): TimeElapsed => {
  const now = new Date();
  const diff = now.getTime() - startDate.getTime();

  return {
    years: Math.floor(diff / (1000 * 60 * 60 * 24 * 365)),
    months: Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)),
    days: Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000)
  };
};

const useTimeCounter = (startDate: Date): TimeElapsed => {
  const [timeElapsed, setTimeElapsed] = useState<TimeElapsed>(() => calculateTimeDifference(startDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(calculateTimeDifference(startDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return timeElapsed;
};

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

const CarouselIndicators = memo(({ totalSlides, currentSlide }: { totalSlides: number; currentSlide: number }) => {
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

const PhotoCarousel = memo(({ photos }: PhotoCarouselProps) => {
  const [api, setApi] = useState<any>();
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

const TimeCounter = memo(({ timeElapsed }: TimeCounterProps) => {
  const timeString = useMemo(() =>
    `${timeElapsed.years} anos, ${timeElapsed.months} ${timeElapsed.months === 1 ? 'mês' : 'meses'}, ${timeElapsed.days} ${timeElapsed.days === 1 ? 'dia' : 'dias'},
   ${timeElapsed.hours} ${timeElapsed.hours === 1 ? 'hora' : 'horas'}, ${timeElapsed.minutes} ${timeElapsed.minutes === 1 ? 'minuto' : 'minutos'}
    e ${timeElapsed.seconds} ${timeElapsed.seconds === 1 ? 'segundo' : 'segundos'}`,
    [timeElapsed.years, timeElapsed.months, timeElapsed.days, timeElapsed.hours, timeElapsed.minutes, timeElapsed.seconds]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.8 }}
      className="text-center px-4 mb-8"
    >
      <motion.h2
        className="text-white text-2xl font-bold mb-4"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3
        }}
      >
        Te amo há:
      </motion.h2>
      <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
        <motion.div
          className="text-red-400 text-lg font-mono"
          key={timeString}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 0.5 }}
        >
          {timeString}
        </motion.div>
      </div>
    </motion.div>
  );
});

TimeCounter.displayName = 'TimeCounter';

const RomanticMessage = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.8 }}
      className="text-center px-6 mb-8"
    >
      <motion.p
        className="text-gray-300 text-sm leading-relaxed"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Hoje é Dia dos Namorados, mas a verdade é que todo
        dia ao seu lado é um verdadeiro exemplo do amor. É
        impressionante como você consegue transformar
        momentos simples em memórias eternas. Seu jeitinho,
        sorriso e olhar... tudo em você me faz querer ser
        alguém melhor. Você é meu lar, minha melhor escolha
        todos os dias. Obrigado por estar comigo, por me amar
        do jeito que eu sou e por fazer meu mundo mais bonito
        só por existir nele. Que venham muitos dias dos namorados
        juntos, e todos os outros também.
        <p className='text-red-500'>Te amo com tudo que sou</p>
        <p className='text-slate-400'>Com amor</p>
        <p className='text-slate-400'>Luke</p>
      </motion.p>
    </motion.div>
  );
});

RomanticMessage.displayName = 'RomanticMessage';

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

export default function RomanticMemorial() {
  const [showMainContent, setShowMainContent] = useState<boolean>(false);
  const [animationComplete, setAnimationComplete] = useState<boolean>(false);

  const relationshipStart = useMemo(() => new Date('2017-04-17'), []);
  const timeElapsed = useTimeCounter(relationshipStart);

  const photos: Photo[] = useMemo(() => [
    {
      id: 1,
      url: "1.jpg",
      alt: "RiR"
    },
    {
      id: 2,
      url: "2.jpg",
      alt: "Ponte"
    },
    {
      id: 3,
      url: "3.jpg",
      alt: "Praia"
    },
    {
      id: 4,
      url: "4.jpg",
      alt: "Praia2"
    },
    {
      id: 5,
      url: "5.jpg",
      alt: "Ano novo"
    },
    {
      id: 6,
      url: "6.jpg",
      alt: "Show"
    },
    {
      id: 7,
      url: "7.jpg",
      alt: "Pedido"
    },

  ], []);

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
                <iframe
                  style={{borderRadius:'16px', border: '0px'}}
                  src="https://open.spotify.com/embed/track/1zI3RU0boCVsAXChjCvESu?utm_source=generator&theme=0"
                  width="100%"
                  height="152"
                  allowFullScreen={false}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
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