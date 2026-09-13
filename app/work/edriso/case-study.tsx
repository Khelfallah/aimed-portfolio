import copy from './case-study-copy.json';
import Image from 'next/image';
import { DesignProcess } from './design-process';
import { CompetitiveTable } from './competitive-table';
import { SearchDemandChart } from './search-demand-chart';
import { KeywordOpportunitiesChart } from './keyword-opportunities-chart';
import { EmpathyMap } from './empathy-map';
import { PreparationFlow } from './preparation-flow';
import { InformationArchitectureFlow } from './information-architecture-flow';
import { InformationArchitectureTree, type ArchitectureNode } from './information-architecture-tree';
import { ProductScope, type ScopeColumn } from './product-scope';
import { DesignDecisionAccordion } from './design-decision-accordion';
import { RelevanceExample } from './relevance-example';
import { ExamExperienceExample } from './exam-experience-example';
import { CaseStudyLayout } from './case-study-layout';
import styles from './case-study.module.css';

type CopyBlock =
  | { type: 'paragraph' | 'quote'; text: string }
  | { type: 'heading'; text: string; level?: 2 | 3 }
  | { type: 'list' | 'flow' | 'button-flow'; items: string[] }
  | { type: 'table'; rows: string[][] }
  | { type: 'image'; src: string; alt: string; width?: number; height?: number; size?: 'small' }
  | { type: 'search-demand' }
  | { type: 'keyword-opportunities' }
  | { type: 'empathy-map' }
  | { type: 'information-architecture-flow'; items: string[] }
  | { type: 'information-architecture-tree'; tree: ArchitectureNode }
  | { type: 'product-scope'; columns: ScopeColumn[] };

type Chapter = {
  id: string;
  label: string;
  sections: { title: string; blocks: CopyBlock[] }[];
};

const chapters = copy as Chapter[];
const links = chapters.map(({ id, label }) => ({ id, label }));

function InlineCopy({ text }: { text: string }) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, index) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={index}>{part.slice(2, -2)}</strong>
      : part.startsWith('*') && part.endsWith('*')
        ? <em key={index}>{part.slice(1, -1)}</em>
        : part,
  );
}

function Block({ block }: { block: CopyBlock }) {
  switch (block.type) {
    case 'heading':
      return block.level === 2
        ? <h2><InlineCopy text={block.text} /></h2>
        : <h3><InlineCopy text={block.text} /></h3>;
    case 'quote':
      return <blockquote><p><InlineCopy text={block.text} /></p></blockquote>;
    case 'paragraph':
      return <p><InlineCopy text={block.text} /></p>;
    case 'list':
      return <ul>{block.items.map((item, index) => <li key={index}><InlineCopy text={item} /></li>)}</ul>;
    case 'flow':
      return (
        <ol className={styles.flow}>
          {block.items.map((item, index) => <li key={index}><InlineCopy text={item} /></li>)}
        </ol>
      );
    case 'button-flow':
      return <PreparationFlow items={block.items} />;
    case 'table':
      return <CompetitiveTable rows={block.rows} />;
    case 'image':
      return (
        <figure className={`${styles.caseStudyImage}${block.size === 'small' ? ` ${styles.smallCaseStudyImage}` : ''}`}>
          <Image src={block.src} alt={block.alt} width={block.width ?? 1713} height={block.height ?? 918} sizes={block.size === 'small' ? '(max-width: 360px) 90vw, 320px' : '(max-width: 900px) 100vw, 52rem'} />
        </figure>
      );
    case 'search-demand':
      return <SearchDemandChart />;
    case 'keyword-opportunities':
      return <KeywordOpportunitiesChart />;
    case 'empathy-map':
      return <EmpathyMap />;
    case 'information-architecture-flow':
      return <InformationArchitectureFlow items={block.items} />;
    case 'information-architecture-tree':
      return <InformationArchitectureTree tree={block.tree} />;
    case 'product-scope':
      return <ProductScope columns={block.columns} />;
  }
}

function Goals({ blocks }: { blocks: CopyBlock[] }) {
  const goals: { title: string; content: CopyBlock[] }[] = [];
  for (const block of blocks) {
    if (block.type === 'heading') {
      goals.push({ title: block.text, content: [] });
    } else {
      goals[goals.length - 1]?.content.push(block);
    }
  }

  return (
    <div className={styles.goals}>
      <h2>High-Stakes Goals</h2>
      <ol className={styles.goalsGrid}>
        {goals.map((goal) => (
          <li key={goal.title}>
            <h3>{goal.title}</h3>
            {goal.content.map((block, blockIndex) => <Block key={blockIndex} block={block} />)}
          </li>
        ))}
      </ol>
    </div>
  );
}

function TrustFeatures({ blocks }: { blocks: CopyBlock[] }) {
  const introduction: CopyBlock[] = [];
  const features: { title: string; blocks: CopyBlock[] }[] = [];

  for (const block of blocks) {
    if (block.type === 'heading') {
      features.push({ title: block.text, blocks: [] });
    } else if (features.length) {
      features[features.length - 1].blocks.push(block);
    } else {
      introduction.push(block);
    }
  }

  return (
    <>
      {introduction.map((block, index) => <Block key={index} block={block} />)}
      <div className={styles.trustFeatures}>
        {features.map((feature) => (
          <div key={feature.title} className={styles.trustFeature}>
            {feature.blocks.filter((block) => block.type === 'image').map((block, index) => <Block key={index} block={block} />)}
            <h3>{feature.title}</h3>
            {feature.blocks.filter((block) => block.type !== 'image').map((block, index) => <Block key={index} block={block} />)}
          </div>
        ))}
      </div>
    </>
  );
}

export function CaseStudy() {
  return (
    <CaseStudyLayout chapters={links}>
      {chapters.map((chapter) => (
        <section key={chapter.id} id={chapter.id} className={styles.chapter} aria-labelledby={`${chapter.id}-title`}>
          {chapter.id !== 'research' && <p className={styles.eyebrow}>{chapter.label}</p>}
          {chapter.sections.map((section, index) => (
            <div key={section.title} className={`${styles.subsection}${chapter.id === 'design-decisions' && index < 3 ? ` ${styles.designDecisionSplit}` : ''}${chapter.id === 'design-decisions' && index > 0 && index < 3 ? ` ${styles.desktopDecision}` : ''}`}>
              {section.title === 'High-Stakes Goals' ? <Goals blocks={section.blocks} /> : (
                <>
                  {chapter.id === 'research' && index === 0 && <DesignProcess current="research" />}
                  {chapter.id === 'design-decisions' && index < 3 ? (
                    <>
                      <div className={styles.designDecisionCopy}>
                        <h2 className={styles.decisionTitle} id={index === 0 ? `${chapter.id}-title` : undefined}>{section.title}</h2>
                        {section.blocks.map((block, blockIndex) => <Block key={blockIndex} block={block} />)}
                      </div>
                      {index === 0 ? <DesignDecisionAccordion /> : index === 1 ? <RelevanceExample /> : <ExamExperienceExample />}
                    </>
                  ) : (
                    <>
                      <h2 className={chapter.id === 'design-decisions' && index < 3 ? styles.decisionTitle : undefined} id={index === 0 ? `${chapter.id}-title` : undefined}>{section.title}</h2>
                      {chapter.id === 'design-decisions' && index === 3
                        ? <TrustFeatures blocks={section.blocks} />
                        : section.blocks.map((block, blockIndex) => <Block key={blockIndex} block={block} />)}
                    </>
                  )}
                </>
              )}
            </div>
          ))}
        </section>
      ))}
    </CaseStudyLayout>
  );
}
