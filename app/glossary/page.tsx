import { glossary } from '../../data/glossary';

export const metadata = {
  title: 'Glossary ? Swing Trading Coach',
};

export default function GlossaryPage() {
  return (
    <div className="stack-lg">
      <h1>Glossary</h1>
      <p className="muted">
        Key terms you will encounter across the lessons and quizzes.
      </p>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Term</th>
              <th>Definition</th>
            </tr>
          </thead>
          <tbody>
            {glossary.map((g) => (
              <tr key={g.term}>
                <td>
                  <strong>{g.term}</strong>
                </td>
                <td>{g.definition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

