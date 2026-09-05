// Native links intentionally force full navigation in the hosted build.
/* oxlint-disable next/no-html-link-for-pages */

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
      <a
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
      </a>
      <a
        className={`nav-name${active === 'aimed' ? ' is-active' : ''}`}
        href="/aimed"
        aria-current={active === 'aimed' ? 'page' : undefined}
      >
        Aimed
      </a>
      <a className="nav-work" href="/#selected-work">
        Work
        <span className="notification-dot" aria-hidden="true" />
      </a>
      <a
        className="nav-linkedin"
        href="https://www.linkedin.com"
        target="_blank"
        rel="noreferrer"
      >
        LinkedIn
      </a>
      <a className="nav-contact" href="/#contact">
        Get in touch
      </a>
    </nav>
  );
}
