import { useState, useEffect } from 'react';
import { calculateTimeDifference } from '@/lib/utils';
import {type TimeElapsed } from '@/types';

export const useTimeCounter = (startDate: Date): TimeElapsed => {
  const [timeElapsed, setTimeElapsed] = useState<TimeElapsed>(() => calculateTimeDifference(startDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(calculateTimeDifference(startDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return timeElapsed;
};