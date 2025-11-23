/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { useMemo, useState } from 'react';
import { quizBank } from '../../data/quizzes';

export default function QuizPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    if (!submitted) return 0;
    return quizBank.reduce((acc, q) => {
      return acc + ((answers[q.id] ?? -1) === q.correctIndex ? 1 : 0);
    }, 0);
  }, [answers, submitted]);

  function selectAnswer(id: string, idx: number) {
    if (submitted) return;
    setAnswers((a) => ({ ...a, [id]: idx }));
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <div className="stack-lg">
      <h1>Swing Trading Quiz</h1>
      <p className="muted">
        Test your understanding of trends, patterns, and risk. Answers include
        explanations for quick learning.
      </p>

      <div className="stack-lg">
        {quizBank.map((q) => {
          const picked = answers[q.id];
          const isCorrect = submitted && picked === q.correctIndex;
          const isWrong = submitted && picked !== q.correctIndex;
          return (
            <div key={q.id} className="card">
              <div className="row gap-sm">
                <span className="badge">{q.topic}</span>
              </div>
              <h3>{q.question}</h3>
              <div className="stack-lg">
                {q.choices.map((c, idx) => {
                  const chosen = picked === idx;
                  const correctChoice = submitted && q.correctIndex === idx;
                  const wrongChoice =
                    submitted && chosen && q.correctIndex !== idx;
                  return (
                    <button
                      key={idx}
                      className="button"
                      style={{
                        borderColor: chosen ? 'var(--primary)' : undefined,
                        color: chosen ? 'var(--primary)' : undefined,
                        background: correctChoice
                          ? '#123e2d'
                          : wrongChoice
                          ? '#3a1212'
                          : undefined,
                      }}
                      onClick={() => selectAnswer(q.id, idx)}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <p
                  style={{
                    color: isCorrect ? 'var(--accent)' : 'var(--danger)',
                  }}
                >
                  {isCorrect ? 'Correct ? ' : 'Review ? '}
                  {q.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <button
          className="button primary"
          onClick={() => setSubmitted(true)}
          disabled={Object.keys(answers).length < quizBank.length}
          title={
            Object.keys(answers).length < quizBank.length
              ? 'Answer all questions to submit'
              : 'Submit'
          }
        >
          Submit
        </button>
      ) : (
        <div className="row gap-sm">
          <div className="card">
            <strong>
              Score: {score} / {quizBank.length}
            </strong>
          </div>
          <button className="button" onClick={reset}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

