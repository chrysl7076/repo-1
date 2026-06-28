import { useState, useMemo } from 'react';
import { ALL_XR_SKILLS, SKILL_BENCHMARKS } from '../data/xrSkillsData';

const INITIAL_RATINGS = Object.fromEntries(ALL_XR_SKILLS.map(s => [s.skill, 5]));

export default function PersonalSkillsAssessment() {
  const [ratings, setRatings] = useState(INITIAL_RATINGS);

  const grouped = useMemo(() =>
    ALL_XR_SKILLS.reduce((acc, { skill, category }) => {
      (acc[category] ??= []).push(skill);
      return acc;
    }, {}),
  []);

  function update(skill, val) {
    setRatings(prev => ({ ...prev, [skill]: val }));
  }

  function benchmarkStatus(skill, rating) {
    const ref = SKILL_BENCHMARKS[skill]?.benchmark ?? 5;
    const delta = rating - ref;
    if (delta > 1)  return { label: `+${delta} Above`, color: '#16a34a' };
    if (delta >= 0) return { label: delta === 0 ? 'At benchmark' : `+${delta} Above`, color: '#ca8a04' };
    if (delta >= -1) return { label: 'At benchmark', color: '#ca8a04' };
    return { label: `${delta} Below`, color: '#dc2626' };
  }

  const summary = useMemo(() => {
    const entries = ALL_XR_SKILLS.map(({ skill }) => {
      const ref = SKILL_BENCHMARKS[skill]?.benchmark ?? 5;
      return { skill, rating: ratings[skill], ref, delta: ratings[skill] - ref };
    });
    const avgRating    = entries.reduce((t, e) => t + e.rating, 0) / entries.length;
    const avgBenchmark = entries.reduce((t, e) => t + e.ref,    0) / entries.length;
    const readiness    = Math.round((avgRating / avgBenchmark) * 100);
    const strongest    = entries.reduce((b, e) => e.delta > b.delta ? e : b);
    const biggest      = entries.reduce((b, e) => e.delta < b.delta ? e : b);
    return { readiness, avgRating, avgBenchmark, strongest, biggest };
  }, [ratings]);

  return (
    <div style={s.page}>
      <h2 style={s.title}>Personal Skills Assessment</h2>
      <p style={s.sub}>Rate your current proficiency in each XR skill (0 = none, 10 = expert).</p>

      <div style={s.summaryRow}>
        {/* Overall Readiness */}
        <div style={s.statCard}>
          <div style={s.statLabel}>Overall Readiness</div>
          <div style={{ ...s.statValue, color: summary.readiness >= 90 ? '#4ade80' : summary.readiness >= 70 ? '#facc15' : '#f87171' }}>
            {summary.readiness}%
          </div>
          <div style={s.statSub}>
            avg {summary.avgRating.toFixed(1)} / {summary.avgBenchmark.toFixed(1)} benchmark
          </div>
        </div>

        {/* Strongest Skill */}
        <div style={s.statCard}>
          <div style={s.statLabel}>Strongest Skill</div>
          <div style={{ ...s.statValue, fontSize: 16 }}>{summary.strongest.skill}</div>
          <div style={{ ...s.statSub, color: summary.strongest.delta >= 0 ? '#4ade80' : '#94a3b8' }}>
            {summary.strongest.delta > 0
              ? `+${summary.strongest.delta} above benchmark`
              : summary.strongest.delta === 0
                ? 'At benchmark'
                : `${summary.strongest.delta} vs benchmark`}
          </div>
        </div>

        {/* Biggest Gap */}
        <div style={s.statCard}>
          <div style={s.statLabel}>Biggest Gap</div>
          <div style={{ ...s.statValue, fontSize: 16 }}>{summary.biggest.skill}</div>
          <div style={{ ...s.statSub, color: summary.biggest.delta < 0 ? '#f87171' : '#4ade80' }}>
            {summary.biggest.delta < 0
              ? `${summary.biggest.delta} below benchmark`
              : 'No gaps — all skills at or above'}
          </div>
        </div>
      </div>

      <div style={s.grid}>
        {Object.entries(grouped).map(([category, skills]) => (
          <section key={category} style={s.section}>
            <h3 style={s.catHead}>{category}</h3>
            {skills.map(skill => (
              <div key={skill} style={s.row}>
                <span style={s.label}>{skill}</span>
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  value={ratings[skill]}
                  onChange={e => update(skill, +e.target.value)}
                  style={s.slider}
                />
                <span style={s.val}>{ratings[skill]}</span>
                {(() => {
                  const { label, color } = benchmarkStatus(skill, ratings[skill]);
                  return (
                    <span style={{ ...s.badge, color, borderColor: color }}>
                      {label}
                    </span>
                  );
                })()}
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}

const s = {
  page: {
    padding: '28px 32px',
    maxWidth: 960,
    margin: '0 auto',
    fontFamily: 'system-ui, sans-serif',
  },
  title: {
    fontSize: 26,
    fontWeight: 700,
    marginBottom: 6,
    color: '#1e1b4b',
  },
  sub: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 28,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
    gap: 20,
  },
  section: {
    background: '#f9fafb',
    borderRadius: 12,
    padding: '16px 20px',
    border: '1px solid #e5e7eb',
  },
  catHead: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.10em',
    color: '#7c3aed',
    marginTop: 0,
    marginBottom: 14,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  label: {
    flex: 1,
    fontSize: 13,
    color: '#374151',
    minWidth: 0,
  },
  slider: {
    flex: '0 0 110px',
    accentColor: '#7c3aed',
  },
  val: {
    width: 20,
    textAlign: 'right',
    fontSize: 13,
    fontWeight: 700,
    color: '#1e1b4b',
  },
  summaryRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 16,
    marginBottom: 28,
  },
  statCard: {
    background: '#0f0f1a',
    borderRadius: 12,
    padding: '18px 22px',
    border: '1px solid rgba(124,58,237,0.35)',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.10em',
    color: '#7c3aed',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 26,
    fontWeight: 700,
    color: '#ede9fe',
    marginBottom: 6,
    lineHeight: 1.15,
  },
  statSub: {
    fontSize: 12,
    color: '#6b7280',
  },
  badge: {
    flexShrink: 0,
    fontSize: 11,
    fontWeight: 700,
    padding: '2px 7px',
    borderRadius: 999,
    border: '1px solid',
    whiteSpace: 'nowrap',
    minWidth: 80,
    textAlign: 'center',
  },
};
