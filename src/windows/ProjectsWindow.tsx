import { useState } from 'react'
import { useWindowColors } from '../context/ThemeContext'

interface Publication {
  id: string; title: string; authors: string[]
  venue: string; publisher: string; year: string
  location: string; abstract: string; tags: string[]
  doi: string; researchgate?: string
  type: string; color: string; emoji: string
}

interface Project {
  title: string; emoji: string; gradient: string
  desc: string; details: string; tags: string[]
  github: string; live: string; video: string
  year: string; status: 'Live' | 'Open Source' | 'Beta'
}

const publications: Publication[] = [
  {
    id: 'ultracommander',
    title: 'UltraCommander: Ultrasonic Side Channel Attack via Browser Extensions',
    authors: ['Yingli Duan', 'Weizhi Meng', 'Wei-Yang Chiu'],
    venue: 'International Conference on Data Security and Privacy Protection (DSPP 2024)',
    publisher: 'Springer · Lecture Notes in Computer Science',
    year: '2024', location: "Xi'an, China",
    abstract: 'Explores a novel ultrasonic side-channel attack delivered through browser extensions, demonstrating how high-frequency audio signals can be weaponised to exfiltrate sensitive data. Published at DSPP 2024 in the Springer Lecture Notes in Computer Science series.',
    tags: ['Security', 'Side Channel', 'Browser', 'Ultrasound', 'Privacy'],
    doi: 'https://dl.acm.org/doi/10.1007/978-981-97-8540-7_12',
    type: 'Conference Paper', color: 'from-[#3b0764] to-[#1e1b4b]', emoji: '🔐',
  },
  {
    id: 'forest',
    title: 'A Parallel-based Air-ground Integration System for Forest Ecological Monitoring',
    authors: ['Yuke Li', 'Yingli Duan', 'Haifu Duan', 'Zhibo Chen'],
    venue: 'IEEE 1st International Conference on Digital Twins and Parallel Intelligence (DTPI 2021)',
    publisher: 'IEEE', year: '2021', location: 'Beijing, China',
    abstract: 'Presents a monitoring framework combining aerial drones and ground sensor nodes — connected via LoRa — for real-time forest ecological data collection. Applies parallel computing principles to achieve wide-area coverage with minimal power.',
    tags: ['IoT', 'LoRa', 'UAV', 'Parallel Computing', 'Forest Monitoring', 'Sensors'],
    doi: 'https://doi.org/10.1109/dtpi52967.2021.9540194',
    researchgate: 'https://www.researchgate.net/publication/354769971',
    type: 'Conference Paper', color: 'from-[#14532d] to-[#052e16]', emoji: '🌲',
  },
]

const projects: Project[] = [
  {
    title: 'ShopFlow — E-Commerce Platform', emoji: '🛍',
    gradient: 'from-[#0f4c75] to-[#1b262c]',
    desc: 'Full-stack marketplace with real-time inventory, Stripe checkout, and an ML recommendation engine.',
    details: 'Built with a microservices architecture, ShopFlow handles everything from product catalogues to real-time stock updates via WebSockets. The recommendation engine analyses browsing history and purchase patterns using collaborative filtering trained on 500k+ transactions.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe', 'ML'],
    github: 'https://github.com', live: 'https://example.com', video: '', year: '2024', status: 'Live',
  },
  {
    title: 'DataViz Studio', emoji: '📊',
    gradient: 'from-[#1a1a2e] to-[#16213e]',
    desc: 'Drag-and-drop dashboard builder that renders millions of rows via WebGL with real-time interaction.',
    details: 'DataViz Studio empowers analysts to create complex interactive dashboards without code. The rendering engine uses WebGL via regl to stream and render 10M+ rows in real time.',
    tags: ['React', 'D3.js', 'WebGL', 'Python', 'FastAPI'],
    github: 'https://github.com', live: 'https://example.com', video: '', year: '2023', status: 'Live',
  },
  {
    title: 'CoSync — Real-time Collab App', emoji: '🤝',
    gradient: 'from-[#0d3b2e] to-[#1a1a2e]',
    desc: 'Google-Docs-style collaborative editor using CRDTs, WebRTC presence, and offline-first sync.',
    details: 'CoSync implements Yjs CRDTs for conflict-free distributed state and WebRTC for peer-to-peer awareness channels. The offline-first architecture queues changes in IndexedDB and replays on reconnect.',
    tags: ['TypeScript', 'WebSocket', 'WebRTC', 'CRDT', 'SQLite'],
    github: 'https://github.com', live: '', video: '', year: '2023', status: 'Open Source',
  },
  {
    title: 'OpenRoute — AI Travel Planner', emoji: '🌐',
    gradient: 'from-[#2d1b5a] to-[#0d1347]',
    desc: 'AI itinerary planner chaining Google Maps, flight APIs and a local LLM for personalised plans in <3s.',
    details: 'OpenRoute chains Skyscanner, Google Maps, and OpenWeather APIs and feeds aggregated data to a locally-hosted Mistral 7B model. Achieved sub-3-second plan generation via prompt caching and async fetching.',
    tags: ['React Native', 'Go', 'LLM', 'Maps API', 'Mistral'],
    github: 'https://github.com', live: 'https://example.com',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', year: '2024', status: 'Beta',
  },
]

const STATUS_STYLE = {
  'Live':        { bg: 'rgba(42,200,64,0.15)',  text: '#2ac840', border: 'rgba(42,200,64,0.3)' },
  'Open Source': { bg: 'rgba(99,160,255,0.15)', text: '#63a0ff', border: 'rgba(99,160,255,0.3)' },
  'Beta':        { bg: 'rgba(254,188,46,0.15)', text: '#febc2e', border: 'rgba(254,188,46,0.3)' },
}

function PubCard({ pub }: { pub: Publication }) {
  const [expanded, setExpanded] = useState(false)
  const { text, textDim, textFaint, surface, border } = useWindowColors()
  return (
    <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, overflow: 'hidden' }}>
      <div className={`w-full bg-gradient-to-br ${pub.color}`}
        style={{ height: 80, display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px', borderBottom: `1px solid rgba(255,255,255,0.08)` }}>
        <span style={{ fontSize: 32 }}>{pub.emoji}</span>
        <div>
          <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.5)', marginBottom: 3 }}>
            {pub.type} · {pub.year}
          </div>
          <div style={{ fontSize: 11.5, fontWeight: 600, color: 'rgba(255,255,255,0.88)', background: 'rgba(99,160,255,0.18)', border: '1px solid rgba(99,160,255,0.3)', borderRadius: 99, padding: '1px 8px', display: 'inline-block' }}>
            {pub.publisher}
          </div>
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: text, lineHeight: 1.4, marginBottom: 6 }}>{pub.title}</div>
        <div style={{ fontSize: 12, color: textDim, marginBottom: 2 }}>
          {pub.authors.map((a, i) => (
            <span key={a}>
              {i > 0 && ', '}
              <span style={a === 'Yingli Duan' ? { color: '#a78bfa', fontWeight: 600 } : {}}>{a}</span>
            </span>
          ))}
        </div>
        <div style={{ fontSize: 11.5, color: '#63a0ff', fontStyle: 'italic', marginBottom: 10 }}>{pub.venue}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
          {pub.tags.map(t => (
            <span key={t} style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.22)', color: '#a78bfa', borderRadius: 4, padding: '2px 7px', fontSize: 10.5 }}>{t}</span>
          ))}
        </div>
        <button onClick={() => setExpanded(v => !v)} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          color: textFaint, fontSize: 11.5, display: 'flex', alignItems: 'center', gap: 4,
          marginBottom: expanded ? 8 : 0, fontFamily: 'inherit',
        }}>
          <span style={{ transform: expanded ? 'rotate(90deg)' : 'none', display: 'inline-block', transition: 'transform 0.2s' }}>▶</span>
          {expanded ? 'Hide abstract' : 'Show abstract'}
        </button>
        {expanded && (
          <p style={{ fontSize: 12.5, color: textDim, lineHeight: 1.65, margin: '0 0 10px' }}>{pub.abstract}</p>
        )}
        <div style={{ display: 'flex', gap: 8, paddingTop: 10, borderTop: `1px solid rgba(255,255,255,0.07)` }}>
          <a href={pub.doi} target="_blank" rel="noopener noreferrer" style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: 'linear-gradient(135deg,rgba(59,124,246,0.25),rgba(109,76,246,0.25))',
            border: '1px solid rgba(99,160,255,0.35)', borderRadius: 8, padding: '6px 14px',
            color: '#63a0ff', fontSize: 12, fontWeight: 600, textDecoration: 'none',
          }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Read Paper
          </a>
          {pub.researchgate && (
            <a href={pub.researchgate} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: 8, padding: '6px 14px',
              color: textDim, fontSize: 12, fontWeight: 500, textDecoration: 'none',
            }}>ResearchGate</a>
          )}
        </div>
      </div>
    </div>
  )
}

function ProjectDetail({ p, onClose }: { p: Project; onClose: () => void }) {
  const sc = STATUS_STYLE[p.status]
  return (
    <div className="mac-scroll" style={{
      position: 'absolute', inset: 0, zIndex: 20,
      background: 'rgba(18,14,32,0.98)', backdropFilter: 'blur(12px)',
      borderRadius: 'inherit', overflowY: 'auto', padding: '20px 24px',
    }}>
      <button onClick={onClose} style={{
        background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)',
        borderRadius: 8, padding: '5px 12px', color: 'rgba(255,255,255,0.65)',
        fontSize: 12.5, cursor: 'pointer', fontFamily: 'inherit',
        display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: 18,
      }}>← Back</button>
      <div className={`w-full bg-gradient-to-br ${p.gradient}`}
        style={{ height: 110, borderRadius: 12, marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, border: '1px solid rgba(255,255,255,0.1)' }}>
        {p.emoji}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'white', margin: 0, lineHeight: 1.3 }}>{p.title}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: 10.5, fontWeight: 600, padding: '2px 8px', borderRadius: 99, background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}>{p.status}</span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{p.year}</span>
        </div>
      </div>
      <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.58)', lineHeight: 1.65, marginBottom: 16 }}>{p.desc}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
        {p.tags.map(t => (
          <span key={t} style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.28)', color: '#fbbf24', borderRadius: 6, padding: '3px 9px', fontSize: 11.5, fontWeight: 500 }}>{t}</span>
        ))}
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginBottom: 16 }} />
      <div style={{ fontSize: 10.5, fontWeight: 600, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: 8 }}>Deep Dive</div>
      <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, marginBottom: 20 }}>{p.details}</p>
      {p.video && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10.5, fontWeight: 600, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: 8 }}>Demo Video</div>
          <div style={{ borderRadius: 10, overflow: 'hidden', aspectRatio: '16/9' }}>
            <iframe src={p.video} style={{ width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen title={`${p.title} demo`} />
          </div>
        </div>
      )}
      <div style={{ display: 'flex', gap: 10 }}>
        {p.github && (
          <a href={p.github} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 500, color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 9, padding: '8px 16px', textDecoration: 'none' }}>
            GitHub
          </a>
        )}
        {p.live && (
          <a href={p.live} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 500, color: '#63a0ff', background: 'rgba(99,160,255,0.1)', border: '1px solid rgba(99,160,255,0.3)', borderRadius: 9, padding: '8px 16px', textDecoration: 'none' }}>
            Live Demo
          </a>
        )}
      </div>
    </div>
  )
}

function ProjectCard({ p, onClick }: { p: Project; onClick: () => void }) {
  const sc = STATUS_STYLE[p.status]
  const { text, textDim, textFaint, surface, border } = useWindowColors()
  return (
    <div onClick={onClick} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(99,160,255,0.35)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = border }}>
      <div className={`w-full bg-gradient-to-br ${p.gradient}`}
        style={{ height: 96, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>
        {p.emoji}
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: text, lineHeight: 1.3 }}>{p.title}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <span style={{ fontSize: 9.5, fontWeight: 600, padding: '2px 6px', borderRadius: 99, background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}>{p.status}</span>
            <span style={{ fontSize: 10.5, color: textFaint }}>{p.year}</span>
          </div>
        </div>
        <p style={{ fontSize: 12.5, color: textDim, lineHeight: 1.5, marginBottom: 10 }}>{p.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
          {p.tags.map(t => (
            <span key={t} style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.22)', color: '#d97706', borderRadius: 4, padding: '2px 7px', fontSize: 10.5, fontWeight: 500 }}>{t}</span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 8, borderTop: `1px solid ${border}` }}>
          {p.github && (
            <span style={{ fontSize: 12, color: '#63a0ff', cursor: 'pointer' }}
              onClick={e => { e.stopPropagation(); window.open(p.github, '_blank') }}>Code</span>
          )}
          {p.live && (
            <span style={{ fontSize: 12, color: '#63a0ff', cursor: 'pointer' }}
              onClick={e => { e.stopPropagation(); window.open(p.live, '_blank') }}>Demo</span>
          )}
          <span style={{ marginLeft: 'auto', fontSize: 11, color: textFaint }}>View details →</span>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsWindow() {
  const [tab, setTab] = useState<'projects' | 'publications'>('projects')
  const [selected, setSelected] = useState<Project | null>(null)
  const { text, textFaint } = useWindowColors()

  const tabStyle = (id: string): React.CSSProperties => ({
    background: tab === id ? 'rgba(99,160,255,0.18)' : 'transparent',
    border: tab === id ? '1px solid rgba(99,160,255,0.35)' : '1px solid transparent',
    borderRadius: 8, padding: '5px 14px',
    color: tab === id ? '#63a0ff' : textFaint,
    fontSize: 12.5, fontWeight: tab === id ? 600 : 400,
    cursor: 'pointer', fontFamily: 'inherit',
    display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.15s',
  })

  return (
    <div style={{ position: 'relative', minHeight: '100%' }}>
      <div style={{ opacity: selected ? 0 : 1, pointerEvents: selected ? 'none' : 'auto', transition: 'opacity 0.12s' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, #fbbf24, #d97706)',
            boxShadow: '0 4px 14px rgba(251,191,36,0.45)',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: text, lineHeight: 1 }}>Projects & Research</div>
            <div style={{ fontSize: 13, color: textFaint, marginTop: 3 }}>Work built and published</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
          <button style={tabStyle('projects')} onClick={() => { setTab('projects'); setSelected(null) }}>
            🚀 Projects <span style={{ background: tab === 'projects' ? 'rgba(99,160,255,0.25)' : 'rgba(255,255,255,0.1)', color: tab === 'projects' ? '#63a0ff' : textFaint, borderRadius: 99, padding: '0 6px', fontSize: 10.5, fontWeight: 600 }}>{projects.length}</span>
          </button>
          <button style={tabStyle('publications')} onClick={() => { setTab('publications'); setSelected(null) }}>
            📄 Publications <span style={{ background: tab === 'publications' ? 'rgba(99,160,255,0.25)' : 'rgba(255,255,255,0.1)', color: tab === 'publications' ? '#63a0ff' : textFaint, borderRadius: 99, padding: '0 6px', fontSize: 10.5, fontWeight: 600 }}>{publications.length}</span>
          </button>
        </div>

        {tab === 'projects' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {projects.map(p => <ProjectCard key={p.title} p={p} onClick={() => setSelected(p)} />)}
          </div>
        )}
        {tab === 'publications' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(99,160,255,0.1), rgba(167,139,250,0.1))',
              border: '1px solid rgba(99,160,255,0.2)', borderRadius: 12, padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <span style={{ fontSize: 28 }}>🎓</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: text }}>2 peer-reviewed publications</div>
                <div style={{ fontSize: 11.5, color: textFaint, marginTop: 2 }}>Published in IEEE and Springer · 2021–2024</div>
              </div>
            </div>
            {publications.map(pub => <PubCard key={pub.id} pub={pub} />)}
          </div>
        )}
      </div>
      {selected && <ProjectDetail p={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
