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
      const timeout = setTimeout(() => setNearby(true), 0);
      return () => clearTimeout(timeout);
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNearby(true);
        observer.disconnect();
      }
    }, { rootMargin: '400px' });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!nearby) return;
    const upcoming = [1, 2]
      .filter((offset) => offset < photos.length)
      .map((offset) => preparePhoto(photos[(active + offset) % photos.length].src, 'low'));
    // Start both downloads together so the second tap is ready too.
    void Promise.allSettled(upcoming);
  }, [active, nearby, photos]);

  return ref;
}
