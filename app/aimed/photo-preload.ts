'use client';

import { useEffect, useRef, useState } from 'react';

// Keep a small decoded-image cache shared by the two galleries.
const prepared = new Map<string, Promise<HTMLImageElement>>();

export function preparePhoto(src: string, priority: 'high' | 'low' = 'high') {
  const cached = prepared.get(src);
  if (cached) return cached;

  const image = new window.Image();
  image.decoding = 'async';
  image.fetchPriority = priority;
  image.src = src;
  const ready = image.decode().then(() => image).catch((error) => {
    prepared.delete(src);
    throw error;
  });
  prepared.set(src, ready);
  if (prepared.size > 8) prepared.delete(prepared.keys().next().value!);
  return ready;
}

export function usePhotoPreload(photos: readonly { src: string }[], active: number) {
  const ref = useRef<HTMLElement>(null);
  const [nearby, setNearby] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if (!('IntersectionObserver' in window)) {
      setNearby(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNearby(true);
        observer.disconnect();
      }
    }, { rootMargin: '200px' });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!nearby) return;
    let cancelled = false;
    async function warmUpcomingPhotos() {
      for (let offset = 1; offset <= Math.min(2, photos.length - 1); offset++) {
        if (cancelled) return;
        try {
          await preparePhoto(photos[(active + offset) % photos.length].src, 'low');
        } catch {
          // A click can retry a failed speculative download.
        }
      }
    }
    void warmUpcomingPhotos();
    return () => { cancelled = true; };
  }, [active, nearby, photos]);

  return ref;
}
