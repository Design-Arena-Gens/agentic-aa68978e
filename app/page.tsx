import Link from 'next/link';
import { lessons } from '../data/lessons';

export default function HomePage() {
  return (
    <div className="stack-lg">
      <section className="hero">
        <h1>Master Swing Trading Foundations</h1>
        <p>
          Structured lessons, pattern primers, interactive quizzes, and a risk
          calculator to help you practice disciplined swing trading.
        </p>
        <div className="row gap-sm">
          <Link className="button primary" href="/lessons">
            Start Lessons
          </Link>
          <Link className="button" href="/quiz">
            Take a Quiz
          </Link>
        </div>
      </section>

      <section>
        <h2>Curriculum Overview</h2>
        <div className="grid">
          {lessons.map((l) => (
            <Link key={l.slug} className="card" href={`/lessons/${l.slug}`}>
              <h3>{l.title}</h3>
              <p>{l.summary}</p>
              <span className="muted">{l.level}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="row gap-sm">
        <Link className="button" href="/patterns">
          Explore Patterns
        </Link>
        <Link className="button" href="/tools/risk">
          Use Risk Calculator
        </Link>
        <Link className="button" href="/glossary">
          Review Glossary
        </Link>
      </section>
    </div>
  );
}

