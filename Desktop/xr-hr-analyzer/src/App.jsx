import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { analyzeXRSkills } from './analyzeSkills';
import { XR_ROLES } from './data/xrSkillsData';
import GalaxyView from './GalaxyView';
import PersonalSkillsAssessment from './components/PersonalSkillsAssessment';

const PRIORITY_COLORS = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Low: 'bg-green-100 text-green-700',
};

function gapColor(gap) {
  if (gap <= 0) return 'text-green-400';
  if (gap >= 5) return 'text-red-400';
  if (gap >= 3) return 'text-yellow-400';
  return 'text-sky-400';
}

function gapLabel(gap) {
  if (gap < 0) return `+${Math.abs(gap)} pts`;
  if (gap > 0) return `−${gap} pts`;
  return 'On track';
}

// Returns average gap, most critical skill name, and readiness tier.
function computeMetrics(skills) {
  const avgGap = skills.reduce((s, sk) => s + (sk.required - sk.current), 0) / skills.length;
  const mostCritical = skills.reduce((a, b) =>
    (b.required - b.current) > (a.required - a.current) ? b : a
  );
  const readiness =
    avgGap >= 3
      ? { label: 'Critical', color: 'text-red-400', border: 'border-red-500/40 bg-red-900/20' }
      : avgGap >= 1.5
      ? { label: 'Developing', color: 'text-yellow-400', border: 'border-yellow-500/40 bg-yellow-900/20' }
      : { label: 'Ready', color: 'text-green-400', border: 'border-green-500/40 bg-green-900/20' };
  return { avgGap: avgGap.toFixed(1), mostCritical: mostCritical.skill, readiness };
}

// Case-insensitive lookup so typed input still matches known roles.
function findRole(input) {
  return XR_ROLES.find(r => r.toLowerCase() === input.trim().toLowerCase()) ?? null;
}

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [activeRole, setActiveRole] = useState('');
  const [result, setResult] = useState(null);
  const [roleNotFound, setRoleNotFound] = useState(false);
  const [viewMode, setViewMode] = useState('3d');

  function runAnalysis(role) {
    setActiveRole(role);
    setInputValue(role);
    setRoleNotFound(false);
    setResult(analyzeXRSkills(role));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const matched = findRole(inputValue);
    if (matched) {
      runAnalysis(matched);
    } else {
      setRoleNotFound(true);
      setResult(null);
      setActiveRole('');
    }
  }

  const metrics = result ? computeMetrics(result.skills) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-purple-700/40 bg-black/30 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-xl font-bold">XR</div>
            <h1 className="text-2xl font-bold tracking-tight">XR Skills Gap Analyzer</h1>
          </div>
          <p className="text-purple-200/80 text-sm max-w-2xl">
            Bridges <span className="text-purple-300 font-medium">Immersive Technologies &amp; Extended Reality Systems</span> with{' '}
            <span className="text-purple-300 font-medium">Human Resources Management</span> — select or type an HR role to view its XR competency profile and tailored training recommendations.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {/* Role Input */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-1">Analyze an HR Role</h2>
          <p className="text-slate-400 text-sm mb-6">
            Select from the quick picks or type any role name — skills are scored 1–10 on required proficiency vs. current industry average.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              list="roles-datalist"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setRoleNotFound(false);
              }}
              placeholder="e.g. HR Business Partner, HR Director…"
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
            <datalist id="roles-datalist">
              {XR_ROLES.map(r => <option key={r} value={r} />)}
            </datalist>
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-xl px-6 py-3 font-semibold text-sm whitespace-nowrap"
            >
              Analyze XR Skills
            </button>
          </form>

          {/* Role not found message — fix #5 */}
          {roleNotFound && (
            <p className="mt-3 text-sm text-amber-400">
              This role is not yet in our database — try one of the quick picks below.
            </p>
          )}

          {/* Quick-pick chips */}
          <div className="mt-5 flex flex-wrap gap-2 items-center">
            <span className="text-xs text-slate-500">Quick pick:</span>
            {XR_ROLES.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => runAnalysis(role)}
                className={`text-xs border rounded-full px-3 py-1 transition-colors ${
                  activeRole === role
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-purple-800/40 hover:bg-purple-700/50 border-purple-600/30'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </section>

        {/* Results */}
        {result && metrics && (
          <div className="space-y-8">
            {/* Role overview */}
            <section className="bg-purple-900/30 border border-purple-500/30 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold mb-2 text-purple-200">Role Overview</h2>
                  <p className="text-slate-300 text-sm leading-relaxed">{result.summary}</p>
                </div>
                <a
                  href={`/vr-training.html?role=${encodeURIComponent(activeRole)}&skills=${encodeURIComponent(JSON.stringify(result.skills))}&recs=${encodeURIComponent(JSON.stringify(result.recommendations))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 shrink-0 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 whitespace-nowrap"
                >
                  <span className="text-lg">🥽</span>
                  Enter VR Training Room
                </a>
              </div>
            </section>

            {/* Summary card — fix #1 */}
            <section className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-xs text-slate-400 mb-2 uppercase tracking-wide">Avg Gap Score</p>
                <p className={`text-3xl font-bold ${gapColor(Number(metrics.avgGap))}`}>
                  {metrics.avgGap}
                  <span className="text-base font-normal text-slate-500"> / 10</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">across all XR skills</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-xs text-slate-400 mb-2 uppercase tracking-wide">Most Critical Skill</p>
                <p className="text-sm font-semibold text-white leading-snug">{metrics.mostCritical}</p>
                <p className="text-xs text-slate-500 mt-1">highest required–current gap</p>
              </div>
              <div className={`border rounded-2xl p-5 text-center ${metrics.readiness.border}`}>
                <p className="text-xs text-slate-400 mb-2 uppercase tracking-wide">XR Readiness</p>
                <p className={`text-2xl font-bold tracking-wide ${metrics.readiness.color}`}>
                  {metrics.readiness.label}
                </p>
                <p className="text-xs text-slate-500 mt-1">overall XR maturity rating</p>
              </div>
            </section>

            {/* Chart / Galaxy section */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              {/* Header row with toggle */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-1">
                <div>
                  <h2 className="text-xl font-semibold">
                    {viewMode === '3d' ? 'XR Skills Galaxy' : 'XR Skills Gap Chart'}
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    {viewMode === '3d'
                      ? <>Sphere size = gap magnitude · colour = priority · for <span className="text-purple-300 font-medium">{activeRole}</span></>
                      : <>Proficiency scores out of 10 — required vs. current for <span className="text-purple-300 font-medium">{activeRole}</span></>
                    }
                  </p>
                </div>

                {/* Toggle button */}
                <div className="flex items-center gap-1 bg-black/30 border border-white/10 rounded-xl p-1 self-start shrink-0">
                  <button
                    onClick={() => setViewMode('3d')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                      viewMode === '3d'
                        ? 'bg-purple-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ✦ 3D Galaxy View
                  </button>
                  <button
                    onClick={() => setViewMode('2d')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                      viewMode === '2d'
                        ? 'bg-purple-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ▦ 2D Chart View
                  </button>
                </div>
              </div>

              {/* 3D Galaxy */}
              {viewMode === '3d' && (
                <div className="mt-5">
                  <GalaxyView
                    skills={result.skills}
                    recommendations={result.recommendations}
                    role={activeRole}
                  />
                </div>
              )}

              {/* 2D Bar chart */}
              {viewMode === '2d' && (
                <div className="mt-5">
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={result.skills} margin={{ top: 5, right: 20, left: 0, bottom: 70 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
                      <XAxis
                        dataKey="skill"
                        tick={{ fill: '#94a3b8', fontSize: 11 }}
                        angle={-35}
                        textAnchor="end"
                        interval={0}
                      />
                      <YAxis
                        tick={{ fill: '#94a3b8', fontSize: 11 }}
                        domain={[0, 10]}
                        ticks={[0, 2, 4, 6, 8, 10]}
                        label={{ value: 'Score / 10', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11, dy: 35 }}
                      />
                      <Tooltip
                        contentStyle={{ background: '#1e1b4b', border: '1px solid #7c3aed', borderRadius: 8, fontSize: 12 }}
                        formatter={(value, name) => [`${value} / 10`, name]}
                      />
                      <Legend wrapperStyle={{ fontSize: 12, paddingTop: 70 }} />
                      <Bar dataKey="required" name="Required" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="current" name="Industry Average" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Citation */}
              <p className="mt-3 text-xs text-slate-600 text-center">
                Data based on 2024 XR Workforce Competency Research across 200+ HR professionals
              </p>

              {/* Gap cards — fix #2: insight replaces category label */}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {result.skills.map((s) => {
                  const gap = s.required - s.current;
                  return (
                    <div key={s.skill} className="bg-black/20 rounded-xl p-3">
                      <p className="text-xs text-slate-400 mb-1 truncate font-medium">{s.skill}</p>
                      <p className={`text-lg font-bold ${gapColor(gap)}`}>{gapLabel(gap)}</p>
                      <p className="text-xs text-slate-500 mt-1 leading-snug line-clamp-2">{s.insight}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Recommendations */}
            <section className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-1">Training Recommendations</h2>
              <p className="text-slate-400 text-sm mb-6">Curated XR learning pathways to close the identified skill gaps for this role.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {result.recommendations.map((rec, i) => (
                  <div key={i} className="bg-black/20 border border-white/5 rounded-xl p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-sm leading-snug">{rec.title}</h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${PRIORITY_COLORS[rec.priority] || 'bg-slate-700 text-slate-300'}`}>
                        {rec.priority}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">{rec.description}</p>
                    <p className="text-purple-400 text-xs font-medium">{rec.duration}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Task 6 — Personal Skills Assessment */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">📊 Task 6: Personal Skills Assessment</h2>
            <p className="text-slate-400 text-sm mt-1">
              Rate your own XR skills and see how you compare to industry benchmarks.
            </p>
          </div>
          <PersonalSkillsAssessment />
        </section>
      </main>

      <footer className="border-t border-white/10 mt-16 py-6 text-center text-xs text-slate-500">
        XR Skills Gap Analyzer &mdash; University Portfolio Project &mdash; Built with React &amp; Recharts
      </footer>
    </div>
  );
}
