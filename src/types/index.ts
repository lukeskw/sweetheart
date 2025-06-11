export interface TimeElapsed {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface Photo {
  id: number;
  url: string;
  alt: string;
}

export interface PhotoCarouselProps {
  photos: Photo[];
}

export interface TimeCounterProps {
  timeElapsed: TimeElapsed;
}

export interface EntranceScreenProps {
  onStart: () => void;
}

export interface HeartRainProps {
  count?: number;
}