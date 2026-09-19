import Image from 'next/image';
import { WorkSection } from './work/work-section';
import { Navigation } from './navigation';
import { AboutSection } from './aimed/about-section';
import { ContactSection } from './contact-section';

const portfolio = {
  name: 'Aimed',
  headline: ['Aimed designs brands,', 'digital products &', 'experiences.'],
  disciplines: 'Creative Director · UX Designer · Graphic Designer',
  detail: '10+ years of design. Algeria-based.',
  email: 'mailto:khalfellah@outlook.fr',
  linkedin: 'https://www.linkedin.com/in/aimed/',
};

export default function Home() {
  return (
    <main className="landing-page">
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

      <WorkSection showTitle />

      <section id="aimed" className="about-page" aria-labelledby="about-section-title">
        <h2 id="about-section-title" className="landing-section-title">About me</h2>
        <AboutSection />
      </section>

      <ContactSection />
    </main>
  );
}
