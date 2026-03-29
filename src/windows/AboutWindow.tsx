import { useWindowColors } from '../context/ThemeContext'

const TAGS = [
  'Flutter', 'Dart', 'React', 'Next.js', 'TypeScript',
  '.NET 8', 'ASP.NET Core', 'Node.js', 'Nest.js',
  'PostgreSQL', 'Kafka', 'Redis', 'Docker', 'AWS', 'GCP',
  'BLE', 'Kotlin',
]

const ABILITIES = [
  { icon: '📱', title: 'Mobile Dev', desc: 'Building Flutter apps that don\'t crash and actually feel smooth. BLoC, platform channels, native BLE — I\'ve wired it all up.' },
  { icon: '🔧', title: 'Backend Systems', desc: 'Designing APIs people enjoy using, event-driven architectures that scale, and data pipelines that keep up with 256 Hz sensors.' },
  { icon: '⚡', title: 'Performance Tuning', desc: 'Three-tier caching, async messaging queues, WebGL rendering — I like finding the bottleneck and making things fast.' },
  { icon: '🛡️', title: 'Security Mindset', desc: 'MSc in Computer Security. I think about attack surfaces, not just happy paths. Side-channel attacks are my academic specialty.' },
]

const HABITS = [
  { emoji: '🌿', text: 'I name branches descriptively. No more "fix2-final-FINAL".' },
  { emoji: '📝', text: 'I write comments for future-me — who will definitely forget why this works.' },
  { emoji: '🐛', text: 'I actually read the error messages. Revolutionary, I know.' },
  { emoji: '📱', text: 'I test on real devices, not just emulators. Simulators lie.' },
  { emoji: '☕', text: 'Best ideas come after the second coffee. First coffee is just boot-up.' },
  { emoji: '🔍', text: 'I over-engineer once, learn from it, then never do it again. Allegedly.' },
]

export default function AboutWindow() {
  const { isDark, text, textDim, textFaint, surface, border, divider } = useWindowColors()

  return (
    <div>
      {/* Hero */}
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 24 }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36,
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          boxShadow: '0 4px 20px rgba(102,126,234,0.5)',
        }}>
          👩‍💻
        </div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: text, lineHeight: 1.2 }}>
            Hi, I'm Dawn 👋
          </div>
          <div style={{ fontSize: 14, color: '#63a0ff', marginTop: 2 }}>Fullstack Software Engineer</div>
          <div style={{ fontSize: 13, color: textFaint, marginTop: 4 }}>📍 Copenhagen, Denmark</div>
        </div>
      </div>

      {/* Human intro */}
      <div style={{
        background: surface,
        border: `1px solid ${border}`,
        borderRadius: 14, padding: '16px 18px', marginBottom: 20,
      }}>
        <p style={{ fontSize: 14, color: textDim, lineHeight: 1.7, margin: 0 }}>
          Born in China, currently building software in Copenhagen. I came here for an MSc in Computer Security
          at DTU, fell in love with the city (and the pastries), and stayed.
        </p>
        <p style={{ fontSize: 14, color: textDim, lineHeight: 1.7, margin: '10px 0 0' }}>
          By day I write Flutter apps and .NET backends. By night I'm either tinkering with
          side projects, reading about distributed systems, or watching way too much Netflix.
          I'm probably over-caffeinated — but the code compiles, so that's fine.
        </p>
      </div>

      {/* Quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
        {[
          { value: '2+', label: 'Years Exp.' },
          { value: 'MSc', label: 'DTU, Denmark' },
          { value: 'AWS', label: 'Certified' },
        ].map(s => (
          <div key={s.label} style={{
            background: surface, border: `1px solid ${border}`,
            borderRadius: 12, padding: '12px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: text }}>{s.value}</div>
            <div style={{ fontSize: 11, color: textFaint, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* What I'm good at */}
      <div style={{ fontSize: 11, fontWeight: 600, color: textFaint, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12 }}>
        What I'm actually good at
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
        {ABILITIES.map(a => (
          <div key={a.title} style={{
            background: surface, border: `1px solid ${border}`,
            borderRadius: 12, padding: '14px',
          }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{a.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: text, marginBottom: 4 }}>{a.title}</div>
            <div style={{ fontSize: 11.5, color: textDim, lineHeight: 1.6 }}>{a.desc}</div>
          </div>
        ))}
      </div>

      {/* Developer habits */}
      <div style={{ height: 1, background: divider, marginBottom: 20 }} />
      <div style={{ fontSize: 11, fontWeight: 600, color: textFaint, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12 }}>
        My developer habits
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        {HABITS.map((h, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <span style={{ fontSize: 16, flexShrink: 0, lineHeight: 1.5 }}>{h.emoji}</span>
            <span style={{ fontSize: 13, color: textDim, lineHeight: 1.6 }}>{h.text}</span>
          </div>
        ))}
      </div>

      {/* Tech stack */}
      <div style={{ height: 1, background: divider, marginBottom: 20 }} />
      <div style={{ fontSize: 11, fontWeight: 600, color: textFaint, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12 }}>
        Technologies I work with
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {TAGS.map(t => (
          <span key={t} style={{
            background: isDark ? 'rgba(99,160,255,0.12)' : 'rgba(99,160,255,0.10)',
            border: `1px solid ${isDark ? 'rgba(99,160,255,0.28)' : 'rgba(99,160,255,0.35)'}`,
            color: '#63a0ff',
            borderRadius: 99, padding: '4px 12px', fontSize: 12,
          }}>
            {t}
          </span>
        ))}
      </div>

      {/* Currently */}
      <div style={{
        marginTop: 20,
        background: isDark ? 'rgba(42,200,64,0.08)' : 'rgba(42,200,64,0.07)',
        border: `1px solid ${isDark ? 'rgba(42,200,64,0.22)' : 'rgba(42,200,64,0.30)'}`,
        borderRadius: 12, padding: '12px 14px',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{ fontSize: 16 }}>💼</span>
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: '#2ac840' }}>● Open to Work</div>
          <div style={{ fontSize: 11.5, color: textDim, marginTop: 2 }}>
            Full Stack · Backend · Frontend · Mobile — Junior Level
          </div>
        </div>
      </div>
    </div>
  )
}
