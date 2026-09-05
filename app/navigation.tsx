import Link from 'next/link';

const greetings = [
  { text: 'Hello 👋', lang: 'en' },
  { text: 'مرحباً 👋', lang: 'ar', dir: 'rtl' as const },
  { text: 'Bonjour 👋', lang: 'fr' },
  { text: 'Hallo 👋', lang: 'de' },
  { text: 'Hola 👋', lang: 'es' },
  { text: 'Azul 👋', lang: 'kab' },
];

type NavigationProps = {
  active: 'home' | 'aimed';
};

export function Navigation({ active }: NavigationProps) {
  return (
    <nav className="nav-pill" aria-label="Primary navigation">
      <Link
        className={`nav-greeting${active === 'home' ? ' is-active' : ''}`}
        href="/"
        aria-label="Hello in multiple languages, home"
        aria-current={active === 'home' ? 'page' : undefined}
      >
        <span className="greeting-window" aria-hidden="true">
          {greetings.map((greeting) => (
            <span key={greeting.lang} lang={greeting.lang} dir={greeting.dir}>
              {greeting.text}
            </span>
          ))}
        </span>
      </Link>
      <Link
        className={`nav-name${active === 'aimed' ? ' is-active' : ''}`}
        href="/aimed"
        aria-current={active === 'aimed' ? 'page' : undefined}
      >
        Aimed
      </Link>
      <Link className="nav-work" href="/#selected-work">
        Work
        <span className="notification-dot" aria-hidden="true" />
      </Link>
      <a
        className="nav-linkedin"
        href="https://www.linkedin.com"
        target="_blank"
        rel="noreferrer"
      >
        LinkedIn
      </a>
      <Link className="nav-contact" href="/#contact">
        Get in touch
      </Link>
    </nav>
  );
}
