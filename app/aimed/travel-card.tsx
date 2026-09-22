'use client';

import Image from 'next/image';
import { usePhotoCarousel } from './use-photo-carousel';

const egyptPhotos = [
  'Standing beside a pyramid in Egypt',
  'A close view of an Egyptian pyramid',
  'Pyramids seen from a rooftop terrace',
  'A market beneath a stone arch in Egypt',
];

const turkeyPhotos = [
  'An ornate waterfront gate in Turkey',
  'Standing before a grand palace entrance in Turkey',
  'A palace room with chandeliers and gilded chairs',
  'A gold mosaic in Turkey',
  'Exploring a historic courtyard in Turkey',
  'A stone palace entrance with twin towers in Turkey',
];

const spainPhotos = [
  'Coastal city and bullring overlooking the sea in Spain',
  'A hillside walk overlooking the harbor in Spain',
  'An arched courtyard with a tiled reflecting pool',
  'White hillside homes in Spain',
  'Exploring a historic city square in Spain',
  'A grand plaza with a canal and decorative bridge',
  'A colorful historic building along a Spanish street',
  'Visiting a football stadium in Spain',
  'A display of football trophies in Spain',
];

const photos = [
  ...egyptPhotos.map((alt, index) => ({ alt, country: 'Egypt', src: `/optimized/v2/travel/egypt-${index + 1}.webp` })),
  ...turkeyPhotos.map((alt, index) => ({ alt, country: 'Turkey', src: `/optimized/v2/travel/turkey-${index + 1}.webp` })),
  ...spainPhotos.map((alt, index) => ({ alt, country: 'Spain', src: `/optimized/v2/travel/spain-${index + 1}.webp` })),
];

export function TravelCard() {
  const { active, previous, preloadRef, showNext } = usePhotoCarousel(photos);
  const photo = photos[active];

  return (
    <article ref={preloadRef} className="about-panel travel-card" aria-labelledby="travel-card-title">
      {previous !== null && (
        <Image
          className="travel-card-image travel-card-previous"
          src={photos[previous].src}
          alt=""
          aria-hidden="true"
          fill
          unoptimized
        />
      )}
      <Image
        key={photo.src}
        src={photo.src}
        alt={photo.alt}
        fill
        unoptimized
        loading={active === 0 && previous === null ? 'lazy' : 'eager'}
        sizes="(max-width: 700px) 100vw, 50vw"
        className={`travel-card-image${previous !== null ? ' travel-card-entering' : ''}`}
      />
      <button
        type="button"
        className="travel-card-next"
        aria-label="Show next travel photo"
        onClick={showNext}
      />
      <div className="travel-card-caption">
        <div>
          <h2 id="travel-card-title">Travel</h2>
          <p className="travel-card-location" aria-live="polite"><span aria-hidden="true">📍</span> {photo.country}</p>
        </div>
      </div>
    </article>
  );
}
