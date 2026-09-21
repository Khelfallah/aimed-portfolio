'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { preparePhoto, usePhotoPreload } from './photo-preload';

const TRANSITION_MS = 360;

export function usePhotoCarousel(photos: readonly { src: string }[]) {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const current = useRef(0);
  const queued = useRef(0);
  const processing = useRef(false);
  const mounted = useRef(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const processQueueRef = useRef<() => void>(() => {});
  const preloadRef = usePhotoPreload(photos, active);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const processQueue = useCallback(() => {
    if (processing.current || queued.current === 0 || !mounted.current) return;
    processing.current = true;
    const next = (current.current + 1) % photos.length;

    void preparePhoto(photos[next].src).then(() => {
      if (!mounted.current) return;
      queued.current -= 1;
      setPrevious(current.current);
      current.current = next;
      setActive(next);

      const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : TRANSITION_MS;
      timer.current = setTimeout(() => {
        if (!mounted.current) return;
        setPrevious(null);
        processing.current = false;
        processQueueRef.current();
      }, duration);
    }).catch(() => {
      if (!mounted.current) return;
      // Keep the visible image when a download fails; the next tap can retry it.
      queued.current -= 1;
      processing.current = false;
      processQueueRef.current();
    });
  }, [photos]);

  useEffect(() => {
    processQueueRef.current = processQueue;
  }, [processQueue]);

  const showNext = useCallback(() => {
    queued.current = Math.min(queued.current + 1, photos.length);
    processQueue();
  }, [photos.length, processQueue]);

  return { active, previous, preloadRef, showNext };
}
