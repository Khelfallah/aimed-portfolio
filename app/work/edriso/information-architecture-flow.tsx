import styles from './information-architecture-flow.module.css';

export function InformationArchitectureFlow({ items }: { items: string[] }) {
  return (
    <ol className={styles.flow} aria-label="Edriso information architecture">
      {items.map((item, index) => (
        <li key={item} className={styles.step}>
          <div className={styles.node}>
            <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
            <span>{item.replace(/\*\*/g, '')}</span>
          </div>
          {index < items.length - 1 && <span className={styles.connector} aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}
