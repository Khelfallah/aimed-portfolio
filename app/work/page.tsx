import { Navigation } from '../navigation';
import { WorkSection } from './work-section';

export default function WorkPage() {
  return (
    <main className="work-page">
      <Navigation active="work" />
      <WorkSection />
    </main>
  );
}
