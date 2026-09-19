import type { Metadata } from 'next';
import { Navigation } from '../navigation';
import { ContactSection } from '../contact-section';

export const metadata: Metadata = {
  title: 'Aimed — Get in touch',
  description: 'Get in touch with Aimed, an Algeria-based creative director and designer.',
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <Navigation active="contact" />
      <ContactSection entering />
    </main>
  );
}
