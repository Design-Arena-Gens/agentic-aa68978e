import { notFound } from 'next/navigation';
import Link from 'next/link';
import { lessons } from '../../../data/lessons';

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.slug }));
}

export default function LessonPage({ params }: Props) {
  const lesson = lessons.find((l) => l.slug === params.slug);
  if (!lesson) return notFound();
  const idx = lessons.findIndex((l) => l.slug === lesson.slug);
  const prev = idx > 0 ? lessons[idx - 1] : null;
  const next = idx < lessons.length - 1 ? lessons[idx + 1] : null;

  return (
    <article className="stack-lg">
      <header className="stack-lg">
        <div className="row gap-sm">
          <Link className="button" href="/lessons">
            ? All lessons
          </Link>
          <span className="badge">{lesson.level}</span>
        </div>
        <h1>{lesson.title}</h1>
        <p className="muted">{lesson.summary}</p>
      </header>

      <section className="stack-lg">
        {lesson.content.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {lesson.bullets && (
          <ul>
            {lesson.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        )}
      </section>

      <nav className="row gap-sm">
        {prev && (
          <Link className="button" href={`/lessons/${prev.slug}`}>
            ? {prev.title}
          </Link>
        )}
        {next && (
          <Link className="button" href={`/lessons/${next.slug}`}>
            {next.title} ?
          </Link>
        )}
      </nav>
    </article>
  );
}

