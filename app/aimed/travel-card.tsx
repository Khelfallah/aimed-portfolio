'use client';

import Image from 'next/image';
import { useState } from 'react';

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
  ...egyptPhotos.map((alt, index) => ({ alt, country: 'Egypt', src: `/travel/egypt-${index + 1}.png` })),
  ...turkeyPhotos.map((alt, index) => ({ alt, country: 'Turkey', src: `/travel/turkey-${index + 1}.png` })),
  ...spainPhotos.map((alt, index) => ({ alt, country: 'Spain', src: `/travel/spain-${index + 1}.png` })),
];

export function TravelCard() {
  const [active, setActive] = useState(0);
  const photo = photos[active];

  return (
    <article className="about-panel travel-card" aria-labelledby="travel-card-title">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 700px) 100vw, 50vw"
        className="travel-card-image"
      />
      <button
        type="button"
        className="travel-card-next"
        aria-label="Show next travel photo"
        onClick={() => setActive((current) => (current + 1) % photos.length)}
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
