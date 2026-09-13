import Image from 'next/image';
import { WorkSection } from './work/work-section';
import { Navigation } from './navigation';
import { AboutSection } from './aimed/about-section';

const portfolio = {
  name: 'Aimed',
  headline: ['Aimed designs brands,', 'digital products &', 'experiences.'],
  disciplines: 'Creative Director · UX Designer · Graphic Designer',
  detail: '10+ years of design. Algeria-based.',
  email: 'mailto:hello@aimed.design',
  linkedin: 'https://www.linkedin.com/in/aimed/',
};

export default function Home() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <Navigation active="home" />

        <div id="top" className="hero-copy">
          <h1 id="hero-title">
            {portfolio.headline.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="disciplines">{portfolio.disciplines}</p>
          <p className="hero-detail">{portfolio.detail}</p>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <Image
            src="/hero-portrait-hover.png"
            alt=""
            width={1027}
            height={1532}
            priority
            sizes="(max-width: 640px) 82vw, 520px"
          />
        </div>
      </section>

      <WorkSection />

      <div id="aimed" className="about-page">
        <AboutSection />
      </div>

      <footer id="contact" className="contact">
        <p>Have a project in mind?</p>
        <div className="contact-links">
          <a href={portfolio.email}>Email</a>
          <a href={portfolio.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
        <small>© {new Date().getFullYear()} Aimed</small>
      </footer>
    </main>
  );
}
