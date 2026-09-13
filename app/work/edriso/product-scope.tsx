import styles from './product-scope.module.css';

export type ScopeColumn = {
  phase: string;
  title: string;
  summary: string;
  items: { title: string; description: string }[];
};

export function ProductScope({ columns }: { columns: ScopeColumn[] }) {
  return (
    <div className={styles.scope}>
      <div className={styles.columns}>
        {columns.map((column, index) => (
          <section
            key={column.title}
            className={`${styles.column} ${index > 0 ? styles.later : ''}`}
            aria-labelledby={`scope-${index}-title`}
          >
            <header className={styles.header}>
              <span className={styles.phase}>{column.phase}</span>
              <h3 id={`scope-${index}-title`}>{column.title}</h3>
              <p>{column.summary}</p>
            </header>
            <ol className={styles.features}>
              {column.items.map((item, itemIndex) => (
                <li key={item.title}>
                  <span className={styles.number} aria-hidden="true">
                    {String(itemIndex + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.rule} aria-hidden="true" />
                  <div className={styles.feature}>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
