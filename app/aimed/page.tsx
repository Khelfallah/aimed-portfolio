import type { Metadata } from 'next';
import Image from 'next/image';
import { Mail, MessageCircle, Phone, Video } from 'lucide-react';
import { Navigation } from '../navigation';

/* oxlint-disable next/no-html-link-for-pages */

export const metadata: Metadata = {
  title: 'Aimed — About',
  description:
    'A little about Aimed, an Algeria-based creative director and designer.',
};

export default function AimedPage() {
  return (
    <main className="about-page">
      <Navigation active="aimed" />

      <section className="about-grid" aria-labelledby="about-title">
        <article className="about-panel about-story">
          <div className="window-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <h1 id="about-title">Me without filters</h1>

          <div className="story-copy">
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
                Most recently, I&apos;ve been building EDRISO, an education
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
        </article>

        <div className="about-widgets">
          <article className="contact-card" aria-labelledby="contact-card-name">
            <Image
              className="contact-card-avatar"
              src="/hero-portrait.png"
              alt="Portrait of Aimed Eddine Khelfallah"
              width={320}
              height={320}
              sizes="(max-width: 700px) 160px, 220px"
            />
            <h2 id="contact-card-name">Aimed Eddine Khelfallah</h2>
            <div className="contact-card-actions" aria-label="Contact options">
              <a
                href="mailto:hello@aimed.design?subject=Hello%20Aimed"
                aria-label="Send Aimed a message"
                title="Message"
              >
                <MessageCircle aria-hidden="true" />
              </a>
              <a
                href="mailto:hello@aimed.design?subject=Call%20request"
                aria-label="Request a phone call with Aimed"
                title="Request a call"
              >
                <Phone aria-hidden="true" />
              </a>
              <a
                className="video-call-link"
                href="mailto:hello@aimed.design?subject=Video%20call%20request"
                aria-label="Request a video call with Aimed"
                title="Request a video call"
              >
                <Video aria-hidden="true" />
              </a>
              <a
                href="mailto:hello@aimed.design"
                aria-label="Email Aimed"
                title="Email"
              >
                <Mail aria-hidden="true" />
              </a>
            </div>
          </article>

          <article className="about-panel inspiration-panel">
            <Image
              src="/work/project-03.png"
              alt="Monochrome art-directed scene exploring material, light and form"
              fill
              sizes="(max-width: 760px) 100vw, 32vw"
            />
            <div className="image-caption">
              <span aria-hidden="true">⌖</span>
              <p>
                <strong>Materials, form &amp; light</strong>
                Visual references
              </p>
            </div>
          </article>

          <article className="about-panel practice-panel">
            <div className="practice-image">
              <Image
                src="/work/edriso.png"
                alt="Blue product design composition"
                fill
                sizes="180px"
              />
            </div>
            <div className="practice-copy">
              <h2>Working across disciplines</h2>
              <p>Brand, product &amp; experience</p>
            </div>
            <a
              className="round-link"
              href="/#selected-work"
              aria-label="View selected work"
            >
              ↗
            </a>
          </article>
        </div>
      </section>
    </main>
  );
}
