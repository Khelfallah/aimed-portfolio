import type { Metadata } from 'next';
import Image from 'next/image';
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
          <h1 id="about-title">What I’m about.</h1>

          <div className="story-copy">
            <section>
              <h2>Where I’m from</h2>
              <p>
                I’m based in Algeria, working with people and teams who care
                about making ideas clear, useful and memorable.
              </p>
            </section>
            <section>
              <h2>What I’ve been doing</h2>
              <p>
                For more than 10 years, I’ve worked across brand systems,
                digital products and experiences—connecting strategy with the
                details people actually see and use.
              </p>
            </section>
            <section>
              <h2>What I do now</h2>
              <p>
                Today I bring creative direction, UX design and graphic design
                together to shape coherent work from the first idea to the final
                expression.
              </p>
            </section>
          </div>
        </article>

        <article className="about-panel profile-panel">
          <header className="profile-header">
            <Image
              className="profile-avatar"
              src="/hero-portrait.png"
              alt="Portrait of Aimed"
              width={88}
              height={88}
              sizes="88px"
            />
            <div>
              <h2>Aimed</h2>
              <p>Creative Director · Designer</p>
            </div>
            <span className="profile-mark" aria-hidden="true">
              AK
            </span>
          </header>
          <p className="profile-note">
            Designing brands, digital products and experiences from Algeria.
          </p>
          <a className="panel-action" href="mailto:hello@aimed.design">
            Email me <span aria-hidden="true">↗</span>
          </a>
        </article>

        <article className="about-panel soundtrack-panel">
          <div className="soundtrack-top">
            <div className="album-art">
              <Image
                src="/work/project-02.png"
                alt="Red, black and cream graphic design composition"
                fill
                sizes="180px"
              />
            </div>
            <span className="music-mark" aria-hidden="true">
              ♪
            </span>
          </div>
          <div className="soundtrack-copy">
            <h2>Ideas on repeat</h2>
            <p>Studio mix — Volume 01</p>
          </div>
          <div className="track-line" aria-hidden="true">
            <span />
          </div>
          <div className="track-controls" aria-hidden="true">
            <span>↝</span>
            <span>◀</span>
            <span className="play-control">▶</span>
            <span>▶</span>
            <span>◖</span>
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
      </section>
    </main>
  );
}
