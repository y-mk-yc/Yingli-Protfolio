import { useEffect, useRef } from 'react'
import { useWindowColors } from '../context/ThemeContext'

interface Skill { name: string; pct: number }
interface Category { name: string; color: string; skills: Skill[] }

const CATEGORIES: Category[] = [
  {
    name: 'Mobile & Frontend',
    color: '#63a0ff',
    skills: [
      { name: 'Flutter / Dart', pct: 0.92 },
      { name: 'React / Next.js', pct: 0.86 },
      { name: 'TypeScript', pct: 0.83 },
      { name: 'React Native', pct: 0.72 },
    ],
  },
  {
    name: 'Backend',
    color: '#a78bfa',
    skills: [
      { name: '.NET 8 / ASP.NET Core', pct: 0.89 },
      { name: 'Node.js / Nest.js', pct: 0.83 },
      { name: 'Spring Boot', pct: 0.45 },
    ],
  },
  {
    name: 'Data & Messaging',
    color: '#34d399',
    skills: [
      { name: 'PostgreSQL', pct: 0.86 },
      { name: 'Redis', pct: 0.79 },
      { name: 'Kafka', pct: 0.73 },
      { name: 'RabbitMQ', pct: 0.70 },
    ],
  },
  {
    name: 'Infrastructure & Cloud',
    color: '#fbbf24',
    skills: [
      { name: 'Docker', pct: 0.85 },
      { name: 'AWS / GCP', pct: 0.76 },
      { name: 'Kubernetes', pct: 0.68 },
      { name: 'CI/CD', pct: 0.82 },
    ],
  },
]

const EXTRA = [
  'BLE', 'Kotlin', 'Flutter BLoC', 'Flutter Platform Channels',
  'NuGet', 'Cypress',
  'Cucumber-JUnit', 'AWS Serverless',
]

export default function SkillsWindow()
{
  const { text, textDim, textFaint, surface, border, divider } = useWindowColors()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() =>
  {
    const timer = setTimeout(() =>
    {
      containerRef.current?.querySelectorAll('.skill-fill').forEach(el =>
      {
        el.classList.add('animated')
      })
    }, 80)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div ref={containerRef}>
      <div style={{ fontSize: 26, fontWeight: 700, color: text, marginBottom: 4 }}>Skills</div>
      <div style={{ fontSize: 14, color: textFaint, marginBottom: 24 }}>Technical proficiency</div>

      {CATEGORIES.map(cat => (
        <div key={cat.name} style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: textFaint, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12 }}>
            {cat.name}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {cat.skills.map(s => (
              <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 13, color: textDim, width: 144, flexShrink: 0 }}>{s.name}</span>
                <div style={{ flex: 1, height: 6, background: border, borderRadius: 99, overflow: 'hidden' }}>
                  <div
                    className="skill-fill"
                    style={{
                      '--pct': s.pct,
                      background: `linear-gradient(90deg, ${cat.color}cc, ${cat.color})`,
                    } as React.CSSProperties & { '--pct': number }}
                  />
                </div>
                <span style={{ fontSize: 12, color: textFaint, width: 32, textAlign: 'right' }}>
                  {Math.round(s.pct * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{ height: 1, background: divider, marginBottom: 16 }} />
      <div style={{ fontSize: 11, fontWeight: 600, color: textFaint, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12 }}>
        Also worked with
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {EXTRA.map(t => (
          <span key={t} style={{
            background: surface, border: `1px solid ${border}`,
            borderRadius: 99, padding: '4px 12px', fontSize: 11.5, color: textDim,
          }}>
            {t}
          </span>
        ))}
      </div>

      {/* Languages */}
      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: textFaint, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12 }}>
          Languages
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { lang: 'Mandarin', level: 'Native', pct: 1.0 },
            { lang: 'English', level: 'Fluent', pct: 0.92 },
            { lang: 'Danish', level: 'Intermediate', pct: 0.55 },
          ].map(l => (
            <div key={l.lang} style={{
              flex: 1, background: surface, border: `1px solid ${border}`,
              borderRadius: 12, padding: 12, textAlign: 'center',
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: text }}>{l.lang}</div>
              <div style={{ fontSize: 10.5, color: textFaint, margin: '3px 0 8px' }}>{l.level}</div>
              <div style={{ height: 6, background: border, borderRadius: 99, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 99,
                  background: 'linear-gradient(90deg, #63a0ff, #a78bfa)',
                  width: `${l.pct * 100}%`,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certification */}
      <div style={{ fontSize: 11, fontWeight: 600, color: textFaint, textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: 16 }}>
        Certifications
      </div>
      <div style={{
        marginTop: 10,
        background: 'rgba(251,191,36,0.08)',
        border: '1px solid rgba(251,191,36,0.25)',
        borderRadius: 12, padding: '12px 16px',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ fontSize: 20 }}>☁️</span>
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: '#fbbf24' }}>AWS Certified Cloud Practitioner</div>
          <div style={{ fontSize: 11, color: textFaint, marginTop: 2 }}>Amazon Web Services</div>
        </div>
      </div>


    </div>
  )
}
