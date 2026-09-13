'use client';

import { useId, useState } from 'react';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import styles from './case-study.module.css';

export function RelevanceExample() {
  const [showIndicators, setShowIndicators] = useState(false);
  const id = useId();

  return (
    <figure className={styles.relevanceScreen}>
      <div className={styles.indicatorControls}>
        <label htmlFor={id}>Show indicators</label>
        <Switch
          id={id}
          className={styles.processToggle}
          checked={showIndicators}
          onCheckedChange={setShowIndicators}
          aria-controls={`${id}-screen`}
        />
      </div>
      <div id={`${id}-screen`} className={styles.relevanceScreenFrame}>
        <Image
          src={showIndicators ? '/work/edriso/physics-exam-indicators.png' : '/work/edriso/physics-exam-library.png'}
          alt={showIndicators
            ? 'Annotated Edriso Physics exam library with orange callouts identifying semester, year, difficulty, views, and downloads.'
            : 'Edriso 3AS Physics exam library with year, semester, and difficulty filters, and exam cards displaying views, downloads, and View buttons.'}
          width={showIndicators ? 1331 : 1476}
          height={showIndicators ? 1181 : 1310}
          sizes="(max-width: 900px) 90vw, 832px"
        />
      </div>
    </figure>
  );
}
