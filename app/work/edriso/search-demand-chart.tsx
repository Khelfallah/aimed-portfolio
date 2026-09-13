'use client';

import { useState, type CSSProperties } from 'react';
import styles from './case-study.module.css';

const searchDemand = [
  { label: 'YouTube', value: 7.48 },
  { label: 'Google Translation', value: 6.12 },
  { label: 'Instagram', value: 5.0 },
  { label: 'ChatGPT', value: 4.09 },
  { label: 'dz exam', value: 2.24 },
  { label: 'TikTok', value: 1.22 },
];

export function SearchDemandChart() {
  const [selectedIndex, setSelectedIndex] = useState(4);

  return (
    <figure className={styles.demandChart}>
      <figcaption className={styles.demandCaption}>
        <h4>Search Demand in Algeria</h4>
      </figcaption>
      <div className={styles.chartBody}>
        <div className={styles.yAxis} aria-hidden="true">
          <span>8M</span><span>6M</span><span>4M</span><span>2M</span><span>0M</span>
        </div>
        <div className={styles.plot}>
          <div className={styles.gridLines} aria-hidden="true">
            <i /><i /><i /><i /><i />
          </div>
          <div className={styles.bars} aria-label="Monthly search volume by query">
            {searchDemand.map((item, index) => (
              <button
                key={item.label}
                type="button"
                className={`${styles.barButton}${selectedIndex === index ? ` ${styles.barSelected}` : ''}`}
                style={{ '--bar-height': `${(item.value / 8) * 100}%` } as CSSProperties}
                aria-pressed={selectedIndex === index}
                onClick={() => setSelectedIndex(index)}
              >
                <span className={styles.barValue}>{item.value.toFixed(2)}M</span>
                <span className={styles.barFill} />
                <span className={styles.barLabel}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </figure>
  );
}
