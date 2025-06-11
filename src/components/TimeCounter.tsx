import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { formatDuration } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { TimeCounterProps } from '@/types';

const TimeCounter = memo(({ timeElapsed }: TimeCounterProps) => {
  const timeString = useMemo(() => {
    const duration = {
      years: timeElapsed.years,
      months: timeElapsed.months,
      days: timeElapsed.days,
      hours: timeElapsed.hours,
      minutes: timeElapsed.minutes,
      seconds: timeElapsed.seconds,
    };

    return formatDuration(duration, {
      locale: ptBR,
      format: ['years', 'months', 'days', 'hours', 'minutes', 'seconds'],
      zero: false,
      delimiter: ', '
    });
  },
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
export default TimeCounter;