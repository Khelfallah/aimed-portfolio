import Image from 'next/image';
import styles from './design-decision-accordion.module.css';

export function DesignDecisionAccordion() {
  return (
    <div className={styles.phone}>
      <div className={styles.screen}>
        <Image
          src="/work/edriso/discovery-accordion.gif"
          alt="Edriso school-level accordion demonstration showing how students discover relevant exams."
          width={1180}
          height={2556}
          unoptimized
          className={styles.recording}
        />
      </div>
    </div>
  );
}
