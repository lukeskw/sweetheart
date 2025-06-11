import { memo } from 'react';

export const SpotifyFrame = memo(() => {
  return (
    <iframe
      style={{ borderRadius: '16px', border: '0px' }}
      src="https://open.spotify.com/embed/track/1zI3RU0boCVsAXChjCvESu?utm_source=generator&theme=0"
      width="100%"
      height="152"
      allowFullScreen={false}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
});

SpotifyFrame.displayName = 'SpotifyFrame';