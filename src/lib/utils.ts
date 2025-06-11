import type { TimeElapsed } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { type Duration, intervalToDuration } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateTimeDifference = (startDate: Date): TimeElapsed => {
  const now = new Date();

  const duration: Duration = intervalToDuration({
    start: startDate,
    end: now,
  });

  return {
    years: duration.years || 0,
    months: duration.months || 0,
    days: duration.days || 0,
    hours: duration.hours || 0,
    minutes: duration.minutes || 0,
    seconds: duration.seconds || 0,
  };
};