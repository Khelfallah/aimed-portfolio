'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageWidget } from './image-widget';
import { ContactsWidget } from './contacts-widget';
import { TravelCard } from './travel-card';
import { MusicWidget } from './music-widget';

/* oxlint-disable next/no-html-link-for-pages */

export function AboutSection() {
  const [expanded, setExpanded] = useState(false);

  return (
      <section className="about-grid" aria-labelledby="about-title">
        <article className={`about-panel about-story${expanded ? ' about-story-expanded' : ''}`}>
          <div className="window-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <h1 id="about-title">Me without filters</h1>

          <div id="about-biography" className="story-copy">
            <section>
              <h2>Where I&apos;m From</h2>
              <p>
                I was born and raised in Algeria. I grew up spending probably
                more time than I should have on computers, obsessing over how
                things looked and why some things just felt better designed than
                others. Eventually, that turned out to be useful.
              </p>
            </section>
            <section>
              <h2>What I Used to Do</h2>
              <p>
                I started designing long before I knew what UX, product design,
                or creative direction really meant. Over the years, I worked
                across graphic design, branding, websites, and pretty much
                anything that involved moving pixels around until they felt
                right. Somewhere along the way, “I like making things look good”
                became an actual career.
              </p>
            </section>
            <section>
              <h2>Where I&apos;ve Worked</h2>
              <p>
                I worked at Khelfallah Consulting and Alchemy Arts, where I
                built my experience across design, branding, and creative work.
                Along the way, I founded Sekoir and later Sekoir Marketplace,
                which gave me my first real taste of building products of my
                own. In between all of that, I freelanced on Fiverr, working
                with clients from around the world on hundreds of projects.
              </p>
            </section>
            <section>
              <h2>What I Do Now</h2>
              <p>
                Today, I&apos;m a Creative Director and Designer based in
                Algeria, working across brand identity, UX, product design, and
                digital experiences. I&apos;ve spent 10+ years designing things
                for clients, companies, and increasingly, products of my own.
                Most recently, I&apos;ve been building Edriso, an education
                platform for students in Algeria, where I&apos;ve had the chance
                to think beyond the interface and work across product, strategy,
                brand, and execution.
              </p>
            </section>
            <section>
              <h2>Where I&apos;m At Now</h2>
              <p>
                These days, I&apos;m somewhere between designer, creative
                director, product person, and founder. I still care deeply about
                typography, grids, and whether something is two pixels off, but
                I&apos;m increasingly interested in the bigger question: should
                we be building this thing in the first place?
              </p>
            </section>
            <section>
              <h2>What I&apos;m Looking For</h2>
              <p>
                Products worth caring about, difficult problems, and people who
                are exceptionally good at what they do. I&apos;m especially
                interested in the space where design, technology, and AI meet
                and in building digital products that don&apos;t just look
                better, but genuinely work better.
              </p>
            </section>
          </div>
          <button
            type="button"
            className="story-toggle"
            aria-expanded={expanded}
            aria-controls="about-biography"
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? 'Show less' : '… Read more'}
          </button>
        </article>

        <div className="about-widgets">
          <article className="contact-card" aria-labelledby="contact-card-name">
            <div className="contact-card-avatar">
              <Image
                src="/optimized/v1/hero-portrait-hover.webp"
                alt="Portrait of Aimed Eddine Khelfallah"
                width={320}
                height={320}
                unoptimized
                sizes="(max-width: 700px) 160px, 220px"
              />
            </div>
            <h2 id="contact-card-name">Aimed Eddine Khelfallah</h2>
            <div className="contact-card-actions" aria-label="Contact options">
              <a
                href="mailto:khalfellah@outlook.fr?subject=Hello%20Aimed"
                aria-label="Send Aimed a message"
                title="Message"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M12 3C6.48 3 2 6.58 2 11c0 2.08 1 3.97 2.64 5.39L3.5 21l5.04-2.12c1.08.35 2.24.54 3.46.54 5.52 0 10-3.58 10-8.42S17.52 3 12 3Z" />
                </svg>
              </a>
              <a
                href="mailto:khalfellah@outlook.fr?subject=Call%20request"
                aria-label="Request a phone call with Aimed"
                title="Request a call"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
                </svg>
              </a>
              <a
                className="video-call-link"
                href="mailto:khalfellah@outlook.fr?subject=Video%20call%20request"
                aria-label="Request a video call with Aimed"
                title="Request a video call"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M3 6.75A2.75 2.75 0 0 1 5.75 4h8.5A2.75 2.75 0 0 1 17 6.75v10.5A2.75 2.75 0 0 1 14.25 20h-8.5A2.75 2.75 0 0 1 3 17.25V6.75Zm15.5 3.08 3.05-2.18A.92.92 0 0 1 23 8.4v7.2a.92.92 0 0 1-1.45.75l-3.05-2.18V9.83Z" />
                </svg>
              </a>
              <a
                href="mailto:khalfellah@outlook.fr"
                aria-label="Email Aimed"
                title="Email"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M3.8 5h16.4A1.8 1.8 0 0 1 22 6.8v.43l-10 6.25L2 7.23V6.8A1.8 1.8 0 0 1 3.8 5Zm-1.8 4.58 6.82 4.26L2.06 19.4A1.8 1.8 0 0 1 2 18.95V9.58Zm20 0v9.37c0 .16-.02.31-.06.45l-6.76-5.56L22 9.58ZM10.45 14.86l1.55.97 1.55-.97 6.37 5.24c-.24.18-.54.29-.87.29H4.95c-.33 0-.63-.11-.87-.29l6.37-5.24Z" />
                </svg>
              </a>
            </div>
          </article>

          <ImageWidget />
          <ContactsWidget />

          <TravelCard />
          <MusicWidget />

          <article className="about-panel practice-panel resume-panel">
            <div className="practice-image">
              <Image
                src="/optimized/v2/resume-card-transparent.webp"
                alt="Résumé document illustration"
                fill
                unoptimized
                sizes="180px"
              />
            </div>
            <div className="practice-copy">
              <h2>Check my resume</h2>
              <p>Get a PDF version of my resume</p>
            </div>
            <button
              type="button"
              className="round-link"
              disabled
              aria-label="Résumé link coming soon"
            >
              ↗
            </button>
          </article>
        </div>
      </section>
  );
}
