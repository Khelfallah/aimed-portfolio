/* oxlint-disable next/no-html-link-for-pages */
import Image, { type StaticImageData } from 'next/image';
import styles from './work-section.module.css';

type Project = {
  title: string;
  headline: string;
  description: string;
  image: string | StaticImageData;
  alt: string;
  href?: string;
  className?: string;
};

const projects: Project[] = [
  {
    title: 'Edriso',
    href: '/work/edriso',
    headline: 'A clearer path to exam preparation',
    description: 'Helping Algerian students find, evaluate, and practice with relevant exams.',
    image: '/work/edriso-homepage.png',
    alt: 'Edriso homepage with school navigation and an exam platform for Algerian students, built by experienced teachers',
    className: styles.edriso,
  },
  {
    title: 'Project 02',
    headline: 'Brand Identity',
    description: 'An exploration of visual identity through form, color, and composition.',
    image: '/work/project-02.png',
    alt: 'Red editorial still life of abstract brand identity materials',
  },
  {
    title: 'Project 03',
    headline: 'Creative Direction',
    description: 'An exploration of materials, light, and composition.',
    image: '/work/project-03.png',
    alt: 'Dark art-directed studio scene with chrome, translucent fabric, and stone',
  },
];

export function WorkSection() {
  return (
      <section
        id="selected-work"
        className="work-section"
        aria-label="Selected work"
      >
        <div className="project-list">
          {projects.map((project, index) => {
            const content = <>
              <div className="project-meta">
                <p className="project-name">{project.title}</p>
                <h2>{project.headline}</h2>
                <p className="project-description">{project.description}</p>
              </div>
              <div className="project-image">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 700px) 80vw, (max-width: 1100px) 40vw, 25vw"
                  priority={index === 0}
                />
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
