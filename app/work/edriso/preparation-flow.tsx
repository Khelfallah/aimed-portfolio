'use client';

import { useState, type CSSProperties } from 'react';
import styles from './preparation-flow.module.css';

export function PreparationFlow({ items }: { items: string[] }) {
  const [selected, setSelected] = useState<number | null>(3);

  return (
    <div className={styles.wrapper}>
      <ol className={styles.steps} aria-label="Exam preparation journey">
        {items.map((item, index) => (
          <li
            key={item}
            className={styles.step}
            style={{
              '--step-column': Math.floor(index / 3) % 2 === 0 ? index % 3 + 1 : 3 - index % 3,
              '--step-row': Math.floor(index / 3) + 1,
            } as CSSProperties}
          >
            <button type="button" className={styles.button} aria-pressed={selected === index}
              onClick={() => setSelected(selected === index ? null : index)}>
              <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
              <span>{item.replace(/\*\*/g, '')}</span>
            </button>
            {index < items.length - 1 && (
              <span
                className={`${styles.connector} ${index % 3 === 2 ? styles.down : Math.floor(index / 3) % 2 === 1 ? styles.left : ''}`}
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
