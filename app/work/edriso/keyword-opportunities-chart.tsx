'use client';

import { useState, type CSSProperties } from 'react';
import styles from './case-study.module.css';

const opportunities = [
  { range: '100K – 1M', count: 4 },
  { range: '10K – 100K', count: 23 },
  { range: '1K – 10K', count: 22 },
];

export function KeywordOpportunitiesChart() {
  const [selectedIndex, setSelectedIndex] = useState(1);

  return (
    <figure className={styles.keywordChart}>
      <figcaption className={styles.keywordChartCaption}>
        <h4>Edriso Keyword Opportunities</h4>
      </figcaption>
      <div className={styles.keywordChartBody}>
        <div className={styles.keywordRanges} aria-hidden="true">
          {opportunities.map((item) => <span key={item.range}>{item.range}</span>)}
        </div>
        <div className={styles.keywordPlot}>
          <div className={styles.keywordGridLines} aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <div className={styles.keywordBars} aria-label="Number of Edriso-related keywords by monthly search volume range">
            {opportunities.map((item, index) => (
              <button
                key={item.range}
                type="button"
                className={`${styles.keywordBarButton}${selectedIndex === index ? ` ${styles.keywordBarSelected}` : ''}`}
                style={{ '--keyword-bar-width': `${(item.count / 25) * 100}%` } as CSSProperties}
                aria-pressed={selectedIndex === index}
                onClick={() => setSelectedIndex(index)}
              >
                <span className={styles.keywordBarFill} />
                <span className={styles.keywordBarValue}>{item.count}</span>
              </button>
            ))}
          </div>
          <div className={styles.keywordTicks} aria-hidden="true">
            {[0, 5, 10, 15, 20, 25].map((tick) => <span key={tick}>{tick}</span>)}
          </div>
        </div>
      </div>
    </figure>
  );
}
