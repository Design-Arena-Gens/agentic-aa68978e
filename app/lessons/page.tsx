import Link from 'next/link';
import { lessons } from '../../data/lessons';

export const metadata = {
  title: 'Lessons ? Swing Trading Coach',
};

export default function LessonsIndex() {
  return (
    <div className="stack-lg">
      <h1>Lessons</h1>
      <p className="muted">
        Concise, original explanations inspired by classic swing trading
        material. No quotes; focused on actionable understanding.
      </p>
      <div className="grid">
        {lessons.map((l) => (
          <Link key={l.slug} className="card" href={`/lessons/${l.slug}`}>
            <h3>{l.title}</h3>
            <p>{l.summary}</p>
            <span className="badge">{l.level}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

