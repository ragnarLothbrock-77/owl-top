import { useState } from 'react';
import { useEffect } from 'react';

export const useScrollY = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const isBrowser = typeof window !== 'undefined';

  const handleScroll = () => {
    const currentYPosition = isBrowser ? window.scrollY : 0;
    setScrollY(currentYPosition);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollY;
};