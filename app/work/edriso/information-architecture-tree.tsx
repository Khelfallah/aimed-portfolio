import styles from './information-architecture-tree.module.css';

export type ArchitectureNode = {
  title: string;
  children?: ArchitectureNode[];
};

const toneByTitle: Record<string, string> = {
  'Education Level': styles.education,
  Primary: styles.primary,
  Middle: styles.middle,
  High: styles.high,
  Grade: styles.grade,
  'Stream / Speciality': styles.stream,
  Subject: styles.subject,
  'Resource Library': styles.library,
  Exams: styles.exams,
  Tests: styles.exams,
  Exercises: styles.exercises,
  Summaries: styles.summaries,
  'Resource Page': styles.resourcePage,
  Preview: styles.preview,
  Solution: styles.solution,
  Download: styles.download,
  'Related Resources': styles.related,
};

function Pill({ title, note, root = false }: { title: string; note?: string; root?: boolean }) {
  return (
    <div className={`${styles.node} ${root ? styles.root : toneByTitle[title] ?? ''}${note ? ` ${styles.withNote}` : ''}`}>
      <span>{title}</span>
      {note && <small>{note}</small>}
    </div>
  );
}

function Branch({ items }: { items: string[] }) {
  return (
    <div className={`${styles.branchRow}${items.length === 2 ? ` ${styles.twoItems}` : ''}`}>
      {items.map((item) => <Pill key={item} title={item} />)}
      <span className={styles.branchBottomLine} aria-hidden="true" />
    </div>
  );
}

export function InformationArchitectureTree({ tree }: { tree: ArchitectureNode }) {
  return (
    <div className={styles.tree} aria-label="Edriso information architecture">
      <h3 className={styles.title}>Information Architecture</h3>
      <div className={styles.flow}>
        <Pill title={tree.title} root />
        <span className={styles.verticalConnector} aria-hidden="true" />
        <Pill title="Education Level" />
        <span className={styles.verticalConnector} aria-hidden="true" />
        <Branch items={['Primary', 'Middle', 'High']} />
        <span className={styles.verticalConnector} aria-hidden="true" />
        <Pill title="Grade" />
        <span className={styles.verticalConnector} aria-hidden="true" />
        <Pill title="Stream / Speciality" note="(when applicable)" />
        <span className={styles.verticalConnector} aria-hidden="true" />
        <Pill title="Subject" />
        <span className={styles.verticalConnector} aria-hidden="true" />
        <Pill title="Resource Library" />
        <span className={styles.verticalConnector} aria-hidden="true" />
        <Branch items={['Exams', 'Tests']} />
        <span className={styles.verticalConnector} aria-hidden="true" />
        <Pill title="Resource Page" />
        <span className={styles.verticalConnector} aria-hidden="true" />
        <Branch items={['Preview', 'Solution', 'Download']} />
        <span className={styles.verticalConnector} aria-hidden="true" />
        <Pill title="Related Resources" />
      </div>
    </div>
  );
}
