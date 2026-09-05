import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';

const portfolio = {
  name: 'Aimed',
  headline: ['Aimed designs brands,', 'digital products &', 'experiences.'],
  disciplines: 'Creative Director · UX Designer · Graphic Designer',
  detail: '10+ years of design. Algeria-based.',
  email: 'mailto:hello@aimed.design',
  linkedin: 'https://www.linkedin.com',
};

type Project = {
  title: string;
  discipline: string;
  year?: string;
  image: string | StaticImageData;
  alt: string;
};

const projects: Project[] = [
  {
    title: 'EDRISO',
    discipline: 'Product Design / UX',
    year: '2026',
    image: '/work/edriso.png',
    alt: 'Blue editorial product-design composition with a mobile interface and learning sheets',
  },
  {
    title: 'Project 02',
    discipline: 'Brand Identity',
    image: '/work/project-02.png',
    alt: 'Red editorial still life of abstract brand identity materials',
  },
  {
    title: 'Project 03',
    discipline: 'Creative Direction',
    image: '/work/project-03.png',
    alt: 'Dark art-directed studio scene with chrome, translucent fabric, and stone',
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <nav className="nav-pill" aria-label="Primary navigation">
          <Link
            className="nav-greeting is-active"
            href="/"
            aria-label="Hello in multiple languages, home"
            aria-current="page"
          >
            <span className="greeting-window" aria-hidden="true">
              <span lang="en">Hello 👋</span>
              <span lang="ar" dir="rtl">
                مرحباً 👋
              </span>
              <span lang="fr">Bonjour 👋</span>
              <span lang="de">Hallo 👋</span>
              <span lang="es">Hola 👋</span>
              <span lang="kab">Azul 👋</span>
            </span>
          </Link>
          <button
            className="nav-name"
            type="button"
            disabled
            title="Aimed page coming later"
            aria-label="Aimed page coming later"
          >
            {portfolio.name}
          </button>
          <a className="nav-work" href="#selected-work">
            Work
            <span className="notification-dot" aria-hidden="true" />
          </a>
          <a
            className="nav-linkedin"
            href={portfolio.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a className="nav-contact" href="#contact">
            Get in touch
          </a>
        </nav>

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
            src="/hero-portrait.png"
            alt=""
            width={1024}
            height={1536}
            priority
            sizes="(max-width: 640px) 82vw, 520px"
          />
        </div>
      </section>

      <section
        id="selected-work"
        className="work-section"
        aria-labelledby="work-title"
      >
        <header className="section-heading">
          <p id="work-title">Selected work</p>
          <span aria-hidden="true">01—03</span>
        </header>

        <div className="project-list">
          {projects.map((project, index) => (
            <article className="project" key={project.title}>
              <div className="project-image">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 94vw"
                  priority={index === 0}
                />
              </div>
              <div className="project-meta">
                <h2>{project.title}</h2>
                <p>{project.discipline}</p>
                <span>{project.year ?? `0${index + 1}`}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

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
