import type { Metadata } from 'next';
import { Navigation } from '../navigation';
import { AboutSection } from './about-section';

/* oxlint-disable next/no-html-link-for-pages */

export const metadata: Metadata = {
  title: 'Aimed — About',
  description:
    'A little about Aimed, an Algeria-based creative director and designer.',
};

export default function AimedPage() {
  return (
    <main className="about-page about-page-entering">
      <Navigation active="aimed" />

      <AboutSection />
    </main>
  );
}
