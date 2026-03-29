import { useWindowColors } from '../context/ThemeContext'

interface Degree {
  school: string; degree: string; period: string
  gpa: string; location: string; emoji: string
  color: string; courses: string
}
interface Cert { icon: string; name: string; issuer: string; color: string }

const degrees: Degree[] = [
  {
    school: 'Technical University of Denmark (DTU)',
    degree: 'MSc Computer Science — Computer Security',
    period: '2022 – 2025',
    gpa: '8.4 / 12',
    location: 'Kongens Lyngby, Denmark',
    emoji: '🏛️',
    color: 'linear-gradient(135deg, #c00200, #7b0000)',
    courses: 'Network Security, Cryptography, Distributed Systems, Advanced Algorithms, Machine Learning',
  },
  {
    school: 'Beijing Forestry University',
    degree: 'BSc Computer Science — Internet of Things',
    period: '2018 – 2022',
    gpa: '89 / 100',
    location: 'Beijing, China',
    emoji: '🌿',
    color: 'linear-gradient(135deg, #166534, #14532d)',
    courses: 'IoT Protocols, Embedded Systems, Data Structures & Algorithms, Operating Systems, Database Theory',
  },
]

const certs: Cert[] = [
  { icon: '☁️', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', color: '#fbbf24' },
]

export default function EducationWindow() {
  const { text, textDim, textFaint, surface, border, divider } = useWindowColors()

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          boxShadow: '0 4px 14px rgba(59,130,246,0.45)',
        }}>🎓</div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: text, lineHeight: 1 }}>Education</div>
          <div style={{ fontSize: 13, color: textFaint, marginTop: 3 }}>Academic background</div>
        </div>
      </div>

      {degrees.map((d, i) => (
        <div key={d.school}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
              background: d.color,
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}>{d.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15.5, fontWeight: 600, color: text }}>{d.school}</div>
              <div style={{ fontSize: 13, color: '#63a0ff', margin: '3px 0' }}>{d.degree}</div>
              <div style={{ display: 'flex', gap: 12, fontSize: 11.5, color: textFaint, marginBottom: 8, flexWrap: 'wrap' }}>
                <span>📅 {d.period}</span>
                <span>📍 {d.location}</span>
                <span>⭐ GPA {d.gpa}</span>
              </div>
              <div style={{ fontSize: 12.5, color: textDim, lineHeight: 1.6 }}>
                <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: textFaint, marginRight: 6 }}>Courses:</span>
                {d.courses}
              </div>
            </div>
          </div>
          {i < degrees.length - 1 && <div style={{ height: 1, background: divider, marginBottom: 24 }} />}
        </div>
      ))}

      <div style={{ height: 1, background: divider, marginBottom: 20 }} />

      {/* Certifications */}
      <div style={{ fontSize: 11, fontWeight: 600, color: textFaint, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 16 }}>
        Certifications
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {certs.map(c => (
          <div key={c.name} style={{
            display: 'flex', alignItems: 'center', gap: 16,
            background: surface, border: `1px solid ${border}`,
            borderRadius: 12, padding: '12px 16px',
          }}>
            <span style={{ fontSize: 24 }}>{c.icon}</span>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: c.color }}>{c.name}</div>
              <div style={{ fontSize: 11.5, color: textFaint, marginTop: 2 }}>{c.issuer}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Languages */}
      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: textFaint, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12 }}>
          Languages
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { lang: 'Mandarin', level: 'Native',       pct: 1.0 },
            { lang: 'English',  level: 'Fluent',        pct: 0.92 },
            { lang: 'Danish',   level: 'Intermediate',  pct: 0.55 },
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
    </div>
  )
}
