'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const photos = [
  {
    src: '/about-photos/cat-in-the-sun.jpg',
    alt: 'A white cat resting in the sun beside tall grass',
    position: '50% 61%',
  },
  {
    src: '/about-photos/ancient-ruins.jpg',
    alt: 'Ancient ruins, trees and distant Algerian hills under a blue sky',
    position: '50% 58%',
  },
  {
    src: '/about-photos/roman-theatre.jpg',
    alt: 'A stone Roman theatre surrounded by mountains',
    position: '50% 58%',
  },
  {
    src: '/about-photos/sunset-coast.jpg',
    alt: 'Sunset over a quiet Algerian beach and mountain coastline',
    position: '50% 54%',
  },
  {
    src: '/about-photos/shoreline.jpg',
    alt: 'Waves meeting a golden beach beneath a clear blue sky',
    position: '50% 57%',
  },
  { src: '/about-photos/fiery-sunset.webp', alt: 'Orange sunset above waves and dark coastal rocks', position: '50% 55%' },
  { src: '/about-photos/forest-path.webp', alt: 'A sunlit path beneath tall trees', position: '50% 55%' },
  { src: '/about-photos/trees-over-the-bay.webp', alt: 'Blue water and green hills framed by trees', position: '50% 55%' },
  { src: '/about-photos/rocky-cove.webp', alt: 'Clear turquoise water around a rocky cove', position: '50% 55%' },
  { src: '/about-photos/seaside-walkway.webp', alt: 'A wooden walkway over the sea', position: '50% 55%' },
  { src: '/about-photos/coastal-cliff.webp', alt: 'A steep cliff above blue coastal waters', position: '50% 55%' },
  { src: '/about-photos/hillside-architecture.webp', alt: 'Layered hillside buildings beneath a cloudy sky', position: '50% 55%' },
  { src: '/about-photos/harbor-evening.webp', alt: 'Evening sunlight over a harbor and mountains', position: '50% 55%' },
  { src: '/about-photos/lighthouse-road.webp', alt: 'A quiet road leading toward a lighthouse', position: '50% 55%' },
  { src: '/about-photos/overcast-shore.webp', alt: 'Waves breaking on rocks beneath an overcast sky', position: '50% 55%' },
  { src: '/about-photos/golden-beach.webp', alt: 'Gentle waves on a golden sandy beach', position: '50% 55%' },
  { src: '/about-photos/green-headland.webp', alt: 'Green coastal cliffs above the open sea', position: '50% 55%' },
  { src: '/about-photos/mountain-town.webp', alt: 'A town nestled beneath green mountains', position: '50% 55%' },
  { src: '/about-photos/golden-horizon.webp', alt: 'Golden sunlight reflected across the sea', position: '50% 55%' },
] as const;

export function ImageWidget() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const busy = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const photo = photos[activeIndex];

  useEffect(() => {
    // Warm only the next photo, keeping the initial download small.
    const next = new window.Image();
    next.src = photos[(activeIndex + 1) % photos.length].src;
  }, [activeIndex]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function showNextPhoto() {
    if (busy.current) return;
    busy.current = true;
    const nextIndex = (activeIndex + 1) % photos.length;
    const next = new window.Image();
    next.src = photos[nextIndex].src;
    try {
      await next.decode();
      setPreviousIndex(activeIndex);
      setActiveIndex(nextIndex);
      timer.current = setTimeout(() => {
        setPreviousIndex(null);
        busy.current = false;
      }, 550);
    } catch {
      busy.current = false;
    }
  }

  return (
    <article className="about-panel inspiration-panel">
      <button
        className="image-widget-button"
        type="button"
        onClick={showNextPhoto}
        aria-label={`Show next photo. Photo ${activeIndex + 1} of ${photos.length}: ${photo.alt}`}
      >
        {previousIndex !== null && (
          <Image
            className="image-widget-photo image-widget-previous"
            src={photos[previousIndex].src}
            alt=""
            aria-hidden="true"
            fill
            unoptimized
            style={{ objectPosition: photos[previousIndex].position }}
          />
        )}
        <Image
          key={photo.src}
          className={`image-widget-photo${previousIndex !== null ? " image-widget-entering" : ""}`}
          src={photo.src}
          alt={photo.alt}
          fill
          unoptimized
          sizes="(max-width: 760px) calc(100vw - 1.3rem), (max-width: 1100px) 48vw, 24vw"
          style={{ objectPosition: photo.position }}
        />
      </button>
    </article>
  );
}
