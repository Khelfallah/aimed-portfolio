'use client';

import Image from 'next/image';
import { useState } from 'react';

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
] as const;

export function ImageWidget() {
  const [activeIndex, setActiveIndex] = useState(0);
  const photo = photos[activeIndex];

  function showNextPhoto() {
    setActiveIndex((current) => (current + 1) % photos.length);
  }

  return (
    <article className="about-panel inspiration-panel">
      <button
        className="image-widget-button"
        type="button"
        onClick={showNextPhoto}
        aria-label={`Show next photo. Photo ${activeIndex + 1} of ${photos.length}: ${photo.alt}`}
      >
        <Image
          key={photo.src}
          className="image-widget-photo"
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 760px) calc(100vw - 1.3rem), (max-width: 1100px) 48vw, 24vw"
          style={{ objectPosition: photo.position }}
        />
        <div className="image-caption" aria-hidden="true">
          <span>⌖</span>
          <p>
            <strong>Algeria, through my lens</strong>
            Click to change · {String(activeIndex + 1).padStart(2, '0')} /{' '}
            {String(photos.length).padStart(2, '0')}
          </p>
        </div>
      </button>
    </article>
  );
}
