'use client';

import Image from 'next/image';
import { usePhotoCarousel } from './use-photo-carousel';

const photos = [
  {
    src: '/optimized/v2/about-photos/cat-in-the-sun.webp',
    alt: 'A white cat resting in the sun beside tall grass',
    position: '50% 61%',
  },
  {
    src: '/optimized/v2/about-photos/ancient-ruins.webp',
    alt: 'Ancient ruins, trees and distant Algerian hills under a blue sky',
    position: '50% 58%',
  },
  {
    src: '/optimized/v2/about-photos/roman-theatre.webp',
    alt: 'A stone Roman theatre surrounded by mountains',
    position: '50% 58%',
  },
  {
    src: '/optimized/v2/about-photos/sunset-coast.webp',
    alt: 'Sunset over a quiet Algerian beach and mountain coastline',
    position: '50% 54%',
  },
  {
    src: '/optimized/v2/about-photos/shoreline.webp',
    alt: 'Waves meeting a golden beach beneath a clear blue sky',
    position: '50% 57%',
  },
  { src: '/optimized/v2/about-photos/fiery-sunset.webp', alt: 'Orange sunset above waves and dark coastal rocks', position: '50% 55%' },
  { src: '/optimized/v2/about-photos/forest-path.webp', alt: 'A sunlit path beneath tall trees', position: '50% 55%' },
  { src: '/optimized/v2/about-photos/trees-over-the-bay.webp', alt: 'Blue water and green hills framed by trees', position: '50% 55%' },
  { src: '/optimized/v2/about-photos/rocky-cove.webp', alt: 'Clear turquoise water around a rocky cove', position: '50% 55%' },
  { src: '/optimized/v2/about-photos/seaside-walkway.webp', alt: 'A wooden walkway over the sea', position: '50% 55%' },
  { src: '/optimized/v2/about-photos/coastal-cliff.webp', alt: 'A steep cliff above blue coastal waters', position: '50% 55%' },
  { src: '/optimized/v2/about-photos/hillside-architecture.webp', alt: 'Layered hillside buildings beneath a cloudy sky', position: '50% 55%' },
  { src: '/optimized/v2/about-photos/harbor-evening.webp', alt: 'Evening sunlight over a harbor and mountains', position: '50% 55%' },
  { src: '/optimized/v2/about-photos/lighthouse-road.webp', alt: 'A quiet road leading toward a lighthouse', position: '50% 55%' },
  { src: '/optimized/v2/about-photos/overcast-shore.webp', alt: 'Waves breaking on rocks beneath an overcast sky', position: '50% 55%' },
  { src: '/optimized/v2/about-photos/golden-beach.webp', alt: 'Gentle waves on a golden sandy beach', position: '50% 55%' },
  { src: '/optimized/v2/about-photos/green-headland.webp', alt: 'Green coastal cliffs above the open sea', position: '50% 55%' },
  { src: '/optimized/v2/about-photos/mountain-town.webp', alt: 'A town nestled beneath green mountains', position: '50% 55%' },
  { src: '/optimized/v2/about-photos/golden-horizon.webp', alt: 'Golden sunlight reflected across the sea', position: '50% 55%' },
] as const;

export function ImageWidget() {
  const { active, previous, preloadRef, showNext } = usePhotoCarousel(photos);
  const photo = photos[active];

  return (
    <article ref={preloadRef} className="about-panel inspiration-panel">
      <button
        className="image-widget-button"
        type="button"
        onClick={showNext}
        aria-label={`Show next photo. Photo ${active + 1} of ${photos.length}: ${photo.alt}`}
      >
        {previous !== null && (
          <Image
            className="image-widget-photo image-widget-previous"
            src={photos[previous].src}
            alt=""
            aria-hidden="true"
            fill
            unoptimized
            style={{ objectPosition: photos[previous].position }}
          />
        )}
        <Image
          key={photo.src}
          className={`image-widget-photo${previous !== null ? ' image-widget-entering' : ''}`}
          src={photo.src}
          alt={photo.alt}
          fill
          unoptimized
          loading={active === 0 && previous === null ? 'lazy' : 'eager'}
          sizes="(max-width: 760px) calc(100vw - 1.3rem), (max-width: 1100px) 48vw, 24vw"
          style={{ objectPosition: photo.position }}
        />
      </button>
    </article>
  );
}
