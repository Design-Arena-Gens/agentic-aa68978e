/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { useMemo, useState } from 'react';

export default function RiskCalculatorPage() {
  const [account, setAccount] = useState(20000);
  const [riskPct, setRiskPct] = useState(1);
  const [entry, setEntry] = useState(50);
  const [stop, setStop] = useState(48);

  const perTradeRisk = useMemo(
    () => (account * riskPct) / 100,
    [account, riskPct]
  );
  const riskPerShare = useMemo(() => Math.max(entry - stop, 0), [entry, stop]);
  const shares = useMemo(() => {
    if (riskPerShare <= 0) return 0;
    return Math.floor(perTradeRisk / riskPerShare);
  }, [perTradeRisk, riskPerShare]);
  const positionCost = useMemo(() => shares * entry, [shares, entry]);
  const rMultipleToTarget = useMemo(() => {
    const target = entry + (entry - stop) * 2;
    const potential = shares * (target - entry);
    return riskPerShare > 0 && shares > 0 && perTradeRisk > 0
      ? +(potential / perTradeRisk).toFixed(2)
      : 0;
  }, [entry, stop, shares, perTradeRisk, riskPerShare]);

  return (
    <div className="stack-lg">
      <h1>Risk Calculator</h1>
      <p className="muted">
        Size positions from risk, not conviction. Use technical invalidation for
        stops and keep risk per trade consistent.
      </p>

      <div className="card">
        <div className="fields">
          <div className="field">
            <label>Account Size ($)</label>
            <input
              type="number"
              value={account}
              min={1000}
              onChange={(e) => setAccount(Number(e.target.value))}
            />
          </div>
          <div className="field">
            <label>Risk per Trade (%)</label>
            <input
              type="number"
              value={riskPct}
              step={0.1}
              min={0.1}
              onChange={(e) => setRiskPct(Number(e.target.value))}
            />
          </div>
          <div className="field">
            <label>Entry Price ($)</label>
            <input
              type="number"
              value={entry}
              step={0.01}
              min={0}
              onChange={(e) => setEntry(Number(e.target.value))}
            />
          </div>
          <div className="field">
            <label>Stop Price ($)</label>
            <input
              type="number"
              value={stop}
              step={0.01}
              min={0}
              onChange={(e) => setStop(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="grid">
        <div className="card">
          <h3>Per-Trade Risk</h3>
          <p>${perTradeRisk.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Risk per Share</h3>
          <p>${riskPerShare.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Max Shares</h3>
          <p>{shares}</p>
        </div>
        <div className="card">
          <h3>Position Cost</h3>
          <p>${positionCost.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3>Target (2R) R-Multiple</h3>
          <p>{rMultipleToTarget} R</p>
        </div>
      </div>
    </div>
  );
}

