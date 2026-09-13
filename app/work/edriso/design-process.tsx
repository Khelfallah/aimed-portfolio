'use client';

import { useId, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import styles from './case-study.module.css';

const processSteps = [
  { label: 'Empathize', target: 'research' },
  { label: 'Define', target: 'define' },
  { label: 'Ideate', target: 'prioritization' },
  { label: 'Design', target: 'design-decisions' },
  { label: 'Build', target: 'building-the-product' },
  { label: 'Measure', target: 'validation' },
];

const loopLabels = [
  { x: 205, y: 65, width: 168, lines: ['Learn more', 'about users'] },
  { x: 605, y: 34, width: 172, lines: ['Explore more ideas'] },
  { x: 814, y: 109, width: 112, lines: ['Test early'] },
  { x: 1040, y: 64, width: 220, lines: ['Validate with real users'] },
  { x: 387, y: 322, width: 177, lines: ['Refine problem', 'statement'] },
  { x: 633, y: 317, width: 193, lines: ['Iterate on solutions'] },
  { x: 982, y: 373, width: 172, lines: ['Learn and improve'] },
  { x: 180, y: 373, width: 153, lines: ['Revisit insights'] },
];

function NonLinearProcess({ current, markerId }: { current?: string; markerId: string }) {
  return (
    // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Allow keyboard scrolling of the detailed process diagram.
    <section className={styles.nonLinearScroll} aria-label="Non-linear process with feedback loops" tabIndex={0}>
      <div className={styles.nonLinearCanvas}>
        <svg className={styles.nonLinearConnections} viewBox="0 0 1200 420" aria-hidden="true">
          <defs>
            <marker id={markerId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 1 1 L 8 5 L 1 9" fill="none" stroke="#a29e9b" strokeWidth="1.4" />
            </marker>
          </defs>
          <g fill="none" stroke="#a29e9b" strokeWidth="1.7" strokeDasharray="5 5" markerEnd={`url(#${markerId})`}>
            <path d="M 290 184 C 340 25 42 10 42 184" markerStart={`url(#${markerId})`} />
            <path d="M 690 180 C 738 37 483 -35 483 184" />
            <path d="M 758 183 C 783 101 880 100 893 183" />
            <path d="M 940 183 C 858 -10 1118 10 1118 183" />
            <path d="M 490 270 C 487 356 289 365 289 270" />
            <path d="M 708 270 C 702 356 550 359 527 270" markerStart={`url(#${markerId})`} />
            <path d="M 1118 273 C 1114 352 1064 380 991 390 C 812 420 340 420 182 390 C 74 369 72 309 72 273" />
          </g>
          <g fill="none" stroke="#c1bdb9" strokeWidth="1.5" markerEnd={`url(#${markerId})`}>
            {[0, 1, 2, 3, 4].map(index => <path key={index} d={`M ${170 + index * 206} 225 H ${199 + index * 206}`} />)}
          </g>
          {loopLabels.map(label => (
            <g key={label.lines[0]}>
              <rect x={label.x - label.width / 2} y={label.y - (label.lines.length === 2 ? 27 : 20)} width={label.width} height={label.lines.length === 2 ? 54 : 40} rx="20" fill="#e5e1de" />
              <text x={label.x} y={label.y} textAnchor="middle" fill="#66615e" fontSize="19" fontFamily="inherit">
                {label.lines.map((line, index) => <tspan key={line} x={label.x} dy={index === 0 ? (label.lines.length === 2 ? -3 : 6) : 23}>{line}</tspan>)}
              </text>
            </g>
          ))}
        </svg>
        <nav aria-label="Explore the non-linear design process">
          <ol className={styles.nonLinearSteps}>
            {processSteps.map((step, index) => (
              <li key={step.target} className={styles.nonLinearStep} style={{ left: `${(1 + index * 206) / 12}%` }}>
                {current === step.target && <span className={styles.processMarker}>You are here</span>}
                <Button
                  variant="outline"
                  nativeButton={false}
                  className={styles.processButton}
                  render={<a href={`#${step.target}`} aria-current={current === step.target ? 'step' : undefined} aria-label={`${step.label}: jump to section`} />}
                >
                  {step.label}
                </Button>
              </li>
            ))}
          </ol>
        </nav>
        <span className="sr-only">Learn more about users. Explore more ideas. Test early. Validate with real users. Refine the problem statement. Iterate on solutions. Learn and improve. Revisit insights.</span>
      </div>
    </section>
  );
}

export function DesignProcess({ current }: { current?: string }) {
  const [nonLinear, setNonLinear] = useState(false);
  const id = useId().replace(/:/g, '');
  const markerId = `${id}-arrow`;

  return (
    <div className={`${styles.process}${nonLinear ? ` ${styles.processNonLinear}` : ''}`}>
      <div className={styles.processControls}>
        <label htmlFor={`${id}-toggle`}>Show non-linear process</label>
        <Switch size="default" id={`${id}-toggle`} className={styles.processToggle} checked={nonLinear} onCheckedChange={setNonLinear} />
      </div>
      {nonLinear ? <NonLinearProcess current={current} markerId={markerId} /> : (
        <nav aria-label="Explore the design process" className={styles.processNavigation}>
          <ol className={styles.processSteps}>
            {processSteps.map((step, index) => (
              <li key={step.target} className={styles.processStep}>
                {current === step.target && <span className={styles.processMarker}>You are here</span>}
                <Button
                  variant="outline"
                  nativeButton={false}
                  className={styles.processButton}
                  render={(
                    <a
                      href={`#${step.target}`}
                      aria-current={current === step.target ? 'step' : undefined}
                      aria-label={`${step.label}: jump to section`}
                    />
                  )}
                >
                  {step.label}
                </Button>
                {index < processSteps.length - 1 && <ArrowRight className={styles.processArrow} aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </nav>
      )}
    </div>
  );
}
