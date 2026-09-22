/* oxlint-disable next/no-html-link-for-pages */
import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Navigation } from '../../navigation';
import { CaseStudy } from './case-study';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Edriso — Aimed',
  description:
    'Rethinking exam preparation for Algerian students. Edriso is an educational platform designed to make exam preparation easier for Algerian students.',
};

function EdrisoBrand({ priority = false }: { priority?: boolean }) {
  return (
    <div className={styles.brand}>
      <div className={styles.logo}>
        <Image
          className={styles.logoReference}
          src="/optimized/v2/work/edriso-brand-reference.webp"
          alt=""
          width={1462}
          height={786}
          unoptimized
          priority={priority}
        />
      </div>
      <div className={styles.brandCopy}>
        <span className={styles.brandName}>Edriso</span>
        <span className={styles.brandCategory}>Education platform</span>
      </div>
    </div>
  );
}

export default function EdrisoPage() {
  return (
    <main className={styles.page}>
      <Navigation active="work" />
      <article aria-labelledby="edriso-title">
        <header className={styles.header}>
          <EdrisoBrand priority />
          <h1 id="edriso-title" className={styles.title}>
            <span>Rethinking Exam</span>
            <span>Preparation for</span>
            <span>Algerian Students</span>
          </h1>
          <p className={styles.summary}>
            <span>Edriso is an educational platform designed to</span>{' '}
            <span>make exam preparation easier for Algerian students.</span>
          </p>
        </header>

        <section className={styles.resources} aria-labelledby="resources-title">
          <h2 id="resources-title" className={styles.resourcesTitle}>
            <span>Find The Right Resources And</span>{' '}
            <span>Improve Your Grades</span>
          </h2>
          <figure className={styles.resourceCover}>
            <Image
              src="/optimized/v2/work/edriso-homepage.webp"
              alt="Edriso homepage with school-level navigation, an introduction to the exam platform for Algerian students, and a Find an Exam button."
              width={2888}
              height={1468}
              unoptimized
              sizes="(max-width: 700px) 94vw, (max-width: 1600px) 80vw, 1280px"
            />
          </figure>
        </section>

        <CaseStudy />

        <div className={styles.project}>
          <dl className={styles.facts}>
            <div><dt>Discipline</dt><dd>Product Design / UX</dd></div>
            <div><dt>Scope</dt><dd>Product, strategy & brand</dd></div>
            <div><dt>Year</dt><dd>2026</dd></div>
          </dl>

        <footer className={styles.footer}>
          <span>Edriso · 2026</span>
          <a href="/work">Back to all work <ArrowUpRight size={20} aria-hidden="true" /></a>
        </footer>
        </div>
      </article>
    </main>
  );
}
