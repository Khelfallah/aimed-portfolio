import Image from 'next/image';
import { ContactForm } from './contact-form';
import { ContactEntrance } from './contact-entrance';
import { JijelActivity, JijelSkyIcon, JijelTime } from './jijel-time';

export function ContactSection({ entering = false }: { entering?: boolean }) {
  return (
    <footer id="contact" className={`contact${entering ? ' contact-entering' : ''}`} aria-labelledby="contact-title">
      {!entering && <ContactEntrance />}
      <h2 id="contact-title" className="contact-section-title landing-section-title">Get in touch</h2>
      <div className="contact-shell">
        <div className="contact-left-stack">
          <div className="contact-intro">
            <div className="sleep-card">
              <div className="sleep-card-content">
                <div className="sleep-card-time-row">
                  <div className="sleep-card-time-group">
                    <p className="sleep-card-time"><JijelTime /></p>
                  </div>
                  <div className="sleep-card-icon" aria-hidden="true">
                    <JijelSkyIcon />
                  </div>
                </div>
                <div className="sleep-card-location-row">
                  <span className="sleep-card-location-pin" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
                      <circle cx="12" cy="10" r="2.25" />
                    </svg>
                  </span>
                  <p className="sleep-card-location">in Jijel, Algeria</p>
                </div>
                <div className="sleep-card-divider" aria-hidden="true" />
                <p className="sleep-card-status"><JijelActivity /></p>
              </div>
            </div>
          </div>
          <div className="social-card">
            <div className="social-card-links" aria-label="Social media">
              <a className="social-tile" href="https://www.linkedin.com/in/aimed/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Image src="/social-icons/linkedin.png" alt="" width={1022} height={1023} sizes="(max-width: 1100px) 30vw, 160px" />
              </a>
              <span className="social-tile">
                <Image src="/social-icons/behance.png" alt="Behance" width={1021} height={1021} sizes="(max-width: 1100px) 30vw, 160px" />
              </span>
              <span className="social-tile">
                <Image src="/social-icons/facebook.png" alt="Facebook" width={1017} height={1026} sizes="(max-width: 1100px) 30vw, 160px" />
              </span>
              <span className="social-tile">
                <Image src="/social-icons/instagram.png" alt="Instagram" width={1031} height={1021} sizes="(max-width: 1100px) 30vw, 160px" />
              </span>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
      <small>
        © 2026 Aimed Eddine Khelfallah<br />
        Designed &amp; built by me.
      </small>
    </footer>
  );
}
