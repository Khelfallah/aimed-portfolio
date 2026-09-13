import Image from 'next/image';
import styles from './case-study.module.css';

export function ExamExperienceExample() {
  return (
    <figure className={styles.relevanceScreen}>
      <div className={styles.relevanceScreenFrame}>
        <Image
          src="/work/edriso/exam-experience.gif"
          alt="Edriso exam viewer showing a PDF alongside download, solution, and related-resource actions."
          width={800}
          height={404}
          unoptimized
          sizes="(max-width: 900px) 90vw, 832px"
        />
      </div>
    </figure>
  );
}
