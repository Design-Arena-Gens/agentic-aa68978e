import { patterns } from '../../data/patterns';

export const metadata = {
  title: 'Patterns ? Swing Trading Coach',
};

export default function PatternsPage() {
  return (
    <div className="stack-lg">
      <h1>Pattern Primer</h1>
      <p className="muted">
        Brief overviews of common continuation and reversal patterns used in
        swing trading. Use checklists to filter quality.
      </p>
      <div className="grid">
        {patterns.map((p) => (
          <div key={p.key} className="card">
            <h3>
              {p.name} <span className="badge">{p.type}</span>
            </h3>
            <p>{p.description}</p>
            <ul>
              {p.checklist.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

