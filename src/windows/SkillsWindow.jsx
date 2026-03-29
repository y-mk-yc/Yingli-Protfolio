import { useEffect, useRef } from 'react'

const CATEGORIES = [
  {
    name: 'Mobile & Frontend',
    color: '#63a0ff',
    skills: [
      { name: 'Flutter / Dart',    pct: 0.92 },
      { name: 'React / Next.js',   pct: 0.86 },
      { name: 'TypeScript',        pct: 0.83 },
      { name: 'React Native',      pct: 0.72 },
    ],
  },
  {
    name: 'Backend',
    color: '#a78bfa',
    skills: [
      { name: '.NET 8 / ASP.NET Core', pct: 0.89 },
      { name: 'Node.js / Nest.js',     pct: 0.83 },
      { name: 'Spring Boot',           pct: 0.65 },
    ],
  },
  {
    name: 'Data & Messaging',
    color: '#34d399',
    skills: [
      { name: 'PostgreSQL', pct: 0.86 },
      { name: 'Redis',      pct: 0.79 },
      { name: 'Kafka',      pct: 0.73 },
      { name: 'RabbitMQ',  pct: 0.70 },
    ],
  },
  {
    name: 'Infrastructure & Cloud',
    color: '#fbbf24',
    skills: [
      { name: 'Docker',        pct: 0.85 },
      { name: 'AWS / GCP',     pct: 0.76 },
      { name: 'Kubernetes',    pct: 0.68 },
      { name: 'CI/CD',         pct: 0.82 },
    ],
  },
]

// Tech badge chips (secondary skills)
const EXTRA = [
  'BLE', 'Kotlin', 'Flutter BLoC', 'Platform Channels',
  'CARP Mobile Sensing', 'YARP', 'NuGet', 'Cypress',
  'Cucumber-JUnit', 'AWS Serverless',
]

export default function SkillsWindow() {
  const containerRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      containerRef.current?.querySelectorAll('.skill-fill').forEach(el => {
        el.classList.add('animated')
      })
    }, 80)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div ref={containerRef}>
      <div className="text-[26px] font-bold text-white mb-1">Skills</div>
      <div className="text-[14px] text-white/50 mb-6">Technical proficiency</div>

      {CATEGORIES.map(cat => (
        <div key={cat.name} className="mb-6">
          <div className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.8px] mb-3">
            {cat.name}
          </div>
          <div className="space-y-2.5">
            {cat.skills.map(s => (
              <div key={s.name} className="flex items-center gap-3">
                <span className="text-[13px] text-white/80 w-36 flex-shrink-0">{s.name}</span>
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="skill-fill h-full rounded-full"
                    style={{
                      '--pct': s.pct,
                      background: `linear-gradient(90deg, ${cat.color}cc, ${cat.color})`,
                    }}
                  />
                </div>
                <span className="text-[12px] text-white/40 w-8 text-right">
                  {Math.round(s.pct * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Secondary skills */}
      <div className="h-px bg-white/10 mb-4" />
      <div className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.8px] mb-3">
        Also worked with
      </div>
      <div className="flex flex-wrap gap-2">
        {EXTRA.map(t => (
          <span key={t}
            className="bg-white/6 border border-white/12 rounded-full
                       px-3 py-1 text-[11.5px] text-white/55">
            {t}
          </span>
        ))}
      </div>

      {/* Certification */}
      <div className="mt-5 flex items-center gap-3 bg-[rgba(251,191,36,0.08)]
                      border border-[rgba(251,191,36,0.25)] rounded-xl px-4 py-3">
        <span className="text-xl">☁️</span>
        <div>
          <div className="text-[12.5px] font-semibold text-[#fbbf24]">AWS Certified Cloud Practitioner</div>
          <div className="text-[11px] text-white/40 mt-0.5">Amazon Web Services</div>
        </div>
      </div>
    </div>
  )
}
