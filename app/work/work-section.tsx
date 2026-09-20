/* oxlint-disable next/no-html-link-for-pages */
import Image, { type StaticImageData } from 'next/image';
import styles from './work-section.module.css';

type Project = {
  title: string;
  headline: string;
  description: string;
  image?: string | StaticImageData;
  alt?: string;
  href?: string;
  className?: string;
  status?: string;
};

const projects: Project[] = [
  {
    title: 'Edriso',
    status: 'Shipped',
    href: '/work/edriso',
    headline: 'A clearer path to exam preparation',
    description: 'Helping Algerian students find, evaluate, and practice with relevant exams.',
    image: '/optimized/v1/work/edriso-homepage.webp',
    alt: 'Edriso homepage with school navigation and an exam platform for Algerian students, built by experienced teachers',
    className: styles.edriso,
  },
  {
    title: 'Sekoir Marketplace',
    status: 'Discontinued',
    className: styles.brand,
    headline: 'Buy and sell locally',
    description: 'An exploration of visual identity through form, color, and composition.',
  },
  {
    title: 'Sekoir 2.0',
    status: 'Discontinued',
    headline: 'P2P Crypto Marketplace',
    description: 'Reaching 40k monthly active users.',
  },
  {
    title: 'Sekoir 1.0',
    status: 'Discontinued',
    headline: 'Crypto Classifieds',
    description: 'Reducing scams to 0.3% of transactions.',
  },
  {
    title: 'Khelfallah Consulting',
    status: 'Shipped',
    headline: 'World Class Consulting Agency',
    description: 'Building trust and increasing client acquisition.',
  },
];

export function WorkSection({ showTitle = false }: { showTitle?: boolean }) {
  return (
      <section
        id="selected-work"
        className="work-section"
        aria-label="Selected work"
      >
        {showTitle && <h2 className="landing-section-title">Selected work</h2>}
        <div className="project-list">
          {projects.map((project, index) => {
            const content = <>
              <div className="project-meta">
                <p className="project-name">{project.title}</p>
                <h2>{project.headline}</h2>
                <p className="project-description">{project.description}</p>
              </div>
              {project.image && <div className="project-image">
                <Image
                  src={project.image}
                  alt={project.alt ?? ''}
                  fill
                  sizes="(max-width: 700px) 80vw, (max-width: 1100px) 40vw, 25vw"
                  priority={index === 0}
                />
              </div>}
              <div className={styles.tags}>
                {!project.href && (
                  <span className={styles.statusTag}>Case study coming soon</span>
                )}
                {project.status && (
                  <span className={styles.statusTag}>
                    {project.status}
                    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                      <path d="M3 13 13 3M3 3h10v10" />
                    </svg>
                  </span>
                )}
              </div>
            </>;

            return (
              <article className={`project ${project.className ?? ''}`} key={project.title}>
                {project.href ? (
                  <a className={styles.link} href={project.href} aria-label={`View ${project.title} project`}>
                    {content}
                  </a>
                ) : content}
              </article>
            );
          })}
        </div>
      </section>
  );
}
