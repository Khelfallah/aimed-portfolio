import Image from 'next/image';

export function ContactsWidget() {
  return (
    <article className="about-panel contacts-widget" aria-label="Contacts">
      <h2 className="contacts-widget-heading">People I trust and recommend</h2>
      <ul className="contacts-widget-list">
        <li>
          <a className="contacts-widget-link" href="https://www.linkedin.com/in/aliboukeroui/" target="_blank" rel="noreferrer" aria-label="Ali Boukeroui, Sr Product Designer — LinkedIn">
            <span className="contacts-widget-avatar">
              <Image src="/optimized/v2/avatars/ali-boukeroui.webp" alt="Ali Boukeroui" width={160} height={160} unoptimized />
            </span>
            <span className="contacts-widget-name contacts-widget-person">
              <span>Ali <strong>Boukeroui</strong></span>
            </span>
            <span className="contacts-widget-tag">Sr Product Designer</span>
            <span className="contacts-widget-chevron" aria-hidden="true">›</span>
          </a>
        </li>
        <li>
          <a className="contacts-widget-link" href="https://www.linkedin.com/in/houchi-charafeddine-22b153172/" target="_blank" rel="noreferrer" aria-label="Charaf Houchi, Graphic Designer — LinkedIn">
            <span className="contacts-widget-avatar">
              <Image src="/optimized/v2/avatars/houchi-charafeddine.webp" alt="Charaf Houchi" width={160} height={160} unoptimized />
            </span>
            <span className="contacts-widget-name contacts-widget-person">
              <span>Charaf <strong>Houchi</strong></span>
            </span>
            <span className="contacts-widget-tag">Graphic Designer</span>
            <span className="contacts-widget-chevron" aria-hidden="true">›</span>
          </a>
        </li>
        <li>
          <a className="contacts-widget-link" href="https://www.linkedin.com/in/hachem-bougherra-911a6317a/" target="_blank" rel="noreferrer" aria-label="Hachem Bougherra, UI/UX designer — LinkedIn">
            <span className="contacts-widget-avatar">
              <Image src="/optimized/v2/avatars/hachem-bougherra.webp" alt="Hachem Bougherra" width={160} height={160} unoptimized />
            </span>
            <span className="contacts-widget-name contacts-widget-person">
              <span>Hachem <strong>Bougherra</strong></span>
            </span>
            <span className="contacts-widget-tag">UI/UX designer</span>
            <span className="contacts-widget-chevron" aria-hidden="true">›</span>
          </a>
        </li>
        <li>
          <a className="contacts-widget-link" href="https://www.instagram.com/ilyas_brih/" target="_blank" rel="noreferrer" aria-label="Ilyas Laberach, Videographer — Instagram">
            <span className="contacts-widget-avatar">
              <Image src="/optimized/v2/avatars/ilyas-laberach.webp" alt="Ilyas Laberach" width={160} height={160} unoptimized />
            </span>
            <span className="contacts-widget-name contacts-widget-person">
              <span>Ilyas <strong>Laberach</strong></span>
            </span>
            <span className="contacts-widget-tag">Videographer</span>
            <span className="contacts-widget-chevron" aria-hidden="true">›</span>
          </a>
        </li>
        <li>
          <a className="contacts-widget-link" href="https://www.facebook.com/NzH18" target="_blank" rel="noreferrer" aria-label="Nazih Younsi, Graphic Designer — Facebook">
            <span className="contacts-widget-avatar">
              <Image src="/optimized/v2/avatars/nazih-younsi.webp" alt="Nazih Younsi" width={160} height={160} unoptimized />
            </span>
            <span className="contacts-widget-name contacts-widget-person">
              <span>Nazih <strong>Younsi</strong></span>
            </span>
            <span className="contacts-widget-tag">Graphic Designer</span>
            <span className="contacts-widget-chevron" aria-hidden="true">›</span>
          </a>
        </li>
        <li>
          <a className="contacts-widget-link" href="https://www.linkedin.com/in/seddik-cheriet/" target="_blank" rel="noreferrer" aria-label="Seddik Cheriet, Founder — LinkedIn">
            <span className="contacts-widget-avatar">
              <Image src="/optimized/v2/avatars/seddik-cheriet.webp" alt="Seddik Cheriet" width={160} height={160} unoptimized />
            </span>
            <span className="contacts-widget-name contacts-widget-person">
              <span>Seddik <strong>Cheriet</strong></span>
            </span>
            <span className="contacts-widget-tag">Founder</span>
            <span className="contacts-widget-chevron" aria-hidden="true">›</span>
          </a>
        </li>
      </ul>
    </article>
  );
}
