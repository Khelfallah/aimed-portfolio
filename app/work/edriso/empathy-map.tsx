'use client';

import { useId, useState } from 'react';
import { Users, X } from 'lucide-react';
import styles from './empathy-map.module.css';

const quadrants = [
  { label: 'Says', tone: 'says', notes: [
    { text: 'Need exams that match my level and stream', finding: 'Finding a PDF still leaves students checking whether it fits their academic context.', implication: 'Organize discovery around level, subject, stream, and year.' },
    { text: 'Need solutions to understand my mistakes', finding: 'The existing findings identify solutions as essential to independent practice.', implication: 'Keep the exam and its solution together.' },
    { text: 'Need to know where I lost marks', finding: 'Students need more than a correct answer to evaluate their reasoning.', implication: 'Pair solutions with clear grading guidance.' },
  ] },
  { label: 'Thinks', tone: 'thinks', notes: [
    { text: 'Does this exam fit the curriculum?', finding: 'Resource quality and relevance vary across the available material.', implication: 'Show academic context and resource details before opening an exam.' },
    { text: 'Am I ready for the real exam?', finding: 'Completing practice alone does not provide a reliable picture of readiness.', implication: 'Build toward meaningful self-evaluation and progress tracking.' },
    { text: 'What should I practice next?', finding: 'Existing platforms offer limited guidance on the next practice activity.', implication: 'Structure resources to support future recommendations.' },
  ] },
  { label: 'Does', tone: 'does', notes: [
    { text: 'Searches and checks exam PDFs', finding: 'Students spend additional effort checking level, subject, stream, and preparation needs.', implication: 'Make relevant resources easier to narrow down.' },
    { text: 'Practices and compares answers', finding: 'Independent practice depends on comparing reasoning with an expected solution.', implication: 'Support a connected exam-to-solution journey.' },
    { text: 'Tries to evaluate performance', finding: 'Without grading guidance, identifying weaknesses and calculating a score is difficult.', implication: 'Provide a clearer path from answers to self-assessment.' },
  ] },
  { label: 'Feels', tone: 'feels', notes: [
    { text: 'Frustrated by scattered resources', finding: 'Interpretation of the discovery friction described in the case study.', implication: 'Reduce repeated searching with consistent classification.' },
    { text: 'Unsure which resources to trust', finding: 'Interpretation of the finding that resource quality is inconsistent.', implication: 'Make quality and curriculum relevance easier to assess.' },
    { text: 'Uncertain about readiness', finding: 'Interpretation of the difficulty students face in evaluating their performance.', implication: 'Help students understand mistakes and choose a useful next step.' },
  ] },
];

export function EmpathyMap() {
  const id = useId();
  const [selected, setSelected] = useState<{ quadrant: number; note: number } | null>(null);
  const group = selected === null ? null : quadrants[selected.quadrant];
  const note = selected === null ? null : group?.notes[selected.note];

  return (
    <figure className={styles.map} aria-labelledby={`${id}-title`}>
      <figcaption className={styles.caption}>
        <h4 id={`${id}-title`}>Aggregated Empathy Map</h4>
        <span>Exam preparation · Algerian students</span>
      </figcaption>
      <p className={styles.context}>Synthesis of the case-study findings. Notes are paraphrased; thoughts and feelings are interpretations.</p>
      <div className={styles.board}>
        {quadrants.map((quadrant, quadrantIndex) => (
          <section key={quadrant.label} className={`${styles.quadrant} ${styles[quadrant.tone]}`} aria-labelledby={`${id}-${quadrant.tone}`}>
            <h5 id={`${id}-${quadrant.tone}`}>{quadrant.label}</h5>
            <div className={styles.notes}>
              {quadrant.notes.map((item, noteIndex) => {
                const active = selected?.quadrant === quadrantIndex && selected.note === noteIndex;
                return (
                  <button key={item.text} type="button" className={styles.note}
                    aria-pressed={active} aria-controls={`${id}-detail`}
                    onClick={() => setSelected(active ? null : { quadrant: quadrantIndex, note: noteIndex })}>
                    {item.text}
                  </button>
                );
              })}
            </div>
          </section>
        ))}
        <div className={styles.person} aria-hidden="true"><Users size={24} /><span>Students</span></div>
      </div>
      <div id={`${id}-detail`} className={styles.detail} aria-live="polite">
        {note && group ? (
          <>
            <div className={styles.detailHeading}><strong>{group.label} · {note.text}</strong><button type="button" aria-label="Close note details" onClick={() => setSelected(null)}><X size={18} /></button></div>
            <p className={styles.explanation}>{note.finding}</p>
            <p className={styles.implication}><strong>Design implication</strong>{note.implication}</p>
          </>
        ) : <p className={styles.hint}>Select a note to explore the finding and its design implication.</p>}
      </div>
    </figure>
  );
}
