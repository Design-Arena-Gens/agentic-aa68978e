import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Swing Trading Coach',
  description:
    'Learn swing trading concepts, patterns, and risk management inspired by classic texts.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container header-inner">
            <Link className="brand" href="/">
              Swing Trading Coach
            </Link>
            <nav className="nav">
              <Link href="/lessons">Lessons</Link>
              <Link href="/patterns">Patterns</Link>
              <Link href="/quiz">Quiz</Link>
              <Link href="/tools/risk">Risk</Link>
              <Link href="/glossary">Glossary</Link>
            </nav>
          </div>
        </header>
        <main className="container main">{children}</main>
        <footer className="site-footer">
          <div className="container">
            <p>
              Educational content, summaries, and original explanations inspired
              by well-known trading literature. Not financial advice.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

