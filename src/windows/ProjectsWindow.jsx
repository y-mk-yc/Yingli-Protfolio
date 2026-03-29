import { useState } from 'react'

/* ── Data ───────────────────────────────────────────────────────── */
const publications = [
  {
    id: 'ultracommander',
    title: 'UltraCommander: Ultrasonic Side Channel Attack via Browser Extensions',
    authors: ['Yingli Duan', 'Weizhi Meng', 'Wei-Yang Chiu'],
    venue: 'International Conference on Data Security and Privacy Protection (DSPP 2024)',
    publisher: 'Springer · Lecture Notes in Computer Science',
    year: '2024',
    location: 'Xi\'an, China',
    abstract: 'Explores a novel ultrasonic side-channel attack delivered through browser extensions, demonstrating how high-frequency audio signals can be weaponised to exfiltrate sensitive data. Published at DSPP 2024 in the Springer Lecture Notes in Computer Science series.',
    tags: ['Security', 'Side Channel', 'Browser', 'Ultrasound', 'Privacy'],
    doi: 'https://dl.acm.org/doi/10.1007/978-981-97-8540-7_12',
    type: 'Conference Paper',
    color: 'from-[#3b0764] to-[#1e1b4b]',
    emoji: '🔐',
  },
  {
    id: 'forest',
    title: 'A Parallel-based Air-ground Integration System for Forest Ecological Monitoring',
    authors: ['Yuke Li', 'Yingli Duan', 'Haifu Duan', 'Zhibo Chen'],
    venue: 'IEEE 1st International Conference on Digital Twins and Parallel Intelligence (DTPI 2021)',
    publisher: 'IEEE',
    year: '2021',
    location: 'Beijing, China',
    abstract: 'Presents a monitoring framework combining aerial drones and ground sensor nodes — connected via LoRa — for real-time forest ecological data collection (temperature, humidity, flammable gas). Applies parallel computing principles to achieve wide-area coverage with minimal power. Field-tested with acceptable error and packet-loss rates.',
    tags: ['IoT', 'LoRa', 'UAV', 'Parallel Computing', 'Forest Monitoring', 'Sensors'],
    doi: 'https://doi.org/10.1109/dtpi52967.2021.9540194',
    researchgate: 'https://www.researchgate.net/publication/354769971',
    type: 'Conference Paper',
    color: 'from-[#14532d] to-[#052e16]',
    emoji: '🌲',
  },
]

const projects = [
  {
    title: 'ShopFlow — E-Commerce Platform',
    emoji: '🛍',
    gradient: 'from-[#0f4c75] to-[#1b262c]',
    desc: 'Full-stack marketplace with real-time inventory, Stripe checkout, and an ML recommendation engine.',
    details: `Built with a microservices architecture, ShopFlow handles everything from product catalogues to real-time stock updates via WebSockets. The recommendation engine analyses browsing history and purchase patterns using collaborative filtering trained on 500k+ transactions. Achieved 99.9% uptime with Redis caching and a CDN-backed asset pipeline.`,
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe', 'ML'],
    github: 'https://github.com',
    live: 'https://example.com',
    video: '',
    year: '2024',
    status: 'Live',
  },
  {
    title: 'DataViz Studio',
    emoji: '📊',
    gradient: 'from-[#1a1a2e] to-[#16213e]',
    desc: 'Drag-and-drop dashboard builder that renders millions of rows via WebGL with real-time interaction.',
    details: `DataViz Studio empowers analysts to create complex interactive dashboards without code. The rendering engine uses WebGL via regl to stream and render 10M+ rows in real time. Custom canvas-based zoom/pan interactions and a plugin system allow teams to extend it with proprietary chart types.`,
    tags: ['React', 'D3.js', 'WebGL', 'Python', 'FastAPI'],
    github: 'https://github.com',
    live: 'https://example.com',
    video: '',
    year: '2023',
    status: 'Live',
  },
  {
    title: 'CoSync — Real-time Collab App',
    emoji: '🤝',
    gradient: 'from-[#0d3b2e] to-[#1a1a2e]',
    desc: 'Google-Docs-style collaborative editor using CRDTs, WebRTC presence, and offline-first sync.',
    details: `CoSync implements Yjs CRDTs for conflict-free distributed state and WebRTC for peer-to-peer awareness channels (cursors, selections). The offline-first architecture queues changes in IndexedDB and replays on reconnect. Supports Markdown, rich text, and syntax-highlighted code blocks.`,
    tags: ['TypeScript', 'WebSocket', 'WebRTC', 'CRDT', 'SQLite'],
    github: 'https://github.com',
    live: '',
    video: '',
    year: '2023',
    status: 'Open Source',
  },
  {
    title: 'OpenRoute — AI Travel Planner',
    emoji: '🌐',
    gradient: 'from-[#2d1b5a] to-[#0d1347]',
    desc: 'AI itinerary planner chaining Google Maps, flight APIs and a local LLM for personalised plans in <3s.',
    details: `OpenRoute chains Skyscanner, Google Maps, and OpenWeather APIs and feeds aggregated data to a locally-hosted Mistral 7B model. Achieved sub-3-second plan generation via prompt caching and async fetching. The React Native app supports offline maps and budget tracking.`,
    tags: ['React Native', 'Go', 'LLM', 'Maps API', 'Mistral'],
    github: 'https://github.com',
    live: 'https://example.com',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    year: '2024',
    status: 'Beta',
  },
]

const STATUS = {
  'Live':        { bg:'rgba(42,200,64,0.15)',  text:'#2ac840', border:'rgba(42,200,64,0.3)' },
  'Open Source': { bg:'rgba(99,160,255,0.15)', text:'#63a0ff', border:'rgba(99,160,255,0.3)' },
  'Beta':        { bg:'rgba(254,188,46,0.15)', text:'#febc2e', border:'rgba(254,188,46,0.3)' },
}

/* ── Publication card ───────────────────────────────────────────── */
function PubCard({ pub }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div
      className="bg-white/[0.04] border border-white/10 hover:border-white/20
                 rounded-xl overflow-hidden transition-all duration-200"
    >
      {/* Banner */}
      <div className={`w-full h-20 bg-gradient-to-br ${pub.color}
                        flex items-center gap-4 px-5 border-b border-white/8`}>
        <span style={{ fontSize: 32 }}>{pub.emoji}</span>
        <div>
          <div style={{
            fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px',
            color: 'rgba(255,255,255,0.5)', marginBottom: 3,
          }}>
            {pub.type} · {pub.year}
          </div>
          <div style={{
            fontSize: 11.5, fontWeight: 600, color: 'rgba(255,255,255,0.88)',
            background: 'rgba(99,160,255,0.18)', border: '1px solid rgba(99,160,255,0.3)',
            borderRadius: 99, padding: '1px 8px', display: 'inline-block',
          }}>
            {pub.publisher}
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Title */}
        <div style={{ fontSize: 14, fontWeight: 700, color: 'white', lineHeight: 1.4, marginBottom: 6 }}>
          {pub.title}
        </div>

        {/* Authors */}
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>
          {pub.authors.map((a, i) => (
            <span key={a}>
              {i > 0 && ', '}
              <span style={a === 'Yingli Duan' ? { color: '#a78bfa', fontWeight: 600 } : {}}>
                {a}
              </span>
            </span>
          ))}
        </div>

        {/* Venue */}
        <div style={{ fontSize: 11.5, color: 'rgba(99,160,255,0.8)', fontStyle: 'italic', marginBottom: 10 }}>
          {pub.venue}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {pub.tags.map(t => (
            <span key={t} style={{
              background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.22)',
              color: '#a78bfa', borderRadius: 4, padding: '2px 7px', fontSize: 10.5,
            }}>{t}</span>
          ))}
        </div>

        {/* Abstract toggle */}
        <button
          onClick={() => setExpanded(v => !v)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            color: 'rgba(255,255,255,0.38)', fontSize: 11.5,
            display: 'flex', alignItems: 'center', gap: 4, marginBottom: expanded ? 8 : 0,
            fontFamily: 'inherit', transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.38)'}
        >
          <span style={{ transform: expanded ? 'rotate(90deg)' : 'none', display: 'inline-block', transition: 'transform 0.2s' }}>▶</span>
          {expanded ? 'Hide abstract' : 'Show abstract'}
        </button>

        {expanded && (
          <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, margin: '0 0 10px' }}>
            {pub.abstract}
          </p>
        )}

        {/* Action links */}
        <div style={{ display: 'flex', gap: 8, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <a href={pub.doi} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: 'linear-gradient(135deg,rgba(59,124,246,0.25),rgba(109,76,246,0.25))',
              border: '1px solid rgba(99,160,255,0.35)',
              borderRadius: 8, padding: '6px 14px',
              color: '#63a0ff', fontSize: 12, fontWeight: 600,
              textDecoration: 'none', transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(135deg,rgba(59,124,246,0.4),rgba(109,76,246,0.4))'}
            onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(135deg,rgba(59,124,246,0.25),rgba(109,76,246,0.25))'}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Read Paper
          </a>
          {pub.researchgate && (
            <a href={pub.researchgate} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: 8, padding: '6px 14px',
                color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: 500,
                textDecoration: 'none', transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
            >
              ResearchGate
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Project detail overlay ─────────────────────────────────────── */
function ProjectDetail({ p, onClose }) {
  const sc = STATUS[p.status] || STATUS['Beta']
  return (
    <div className="mac-scroll" style={{
      position:'absolute', inset:0, zIndex:20,
      background:'rgba(18,14,32,0.98)',
      backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)',
      borderRadius:'inherit', overflowY:'auto', padding:'20px 24px',
      fontFamily:'-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif',
    }}>
      <button onClick={onClose} style={{
        background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.13)',
        borderRadius:8, padding:'5px 12px', color:'rgba(255,255,255,0.65)',
        fontSize:12.5, cursor:'pointer', fontFamily:'inherit',
        display:'inline-flex', alignItems:'center', gap:5, marginBottom:18,
      }}>← Back</button>

      <div className={`w-full h-28 rounded-xl mb-5 bg-gradient-to-br ${p.gradient}
                        flex items-center justify-center text-5xl border border-white/10`}>
        {p.emoji}
      </div>

      <div className="flex items-start justify-between gap-3 mb-3">
        <h2 style={{ fontSize:18, fontWeight:700, color:'white', margin:0, lineHeight:1.3 }}>{p.title}</h2>
        <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
          <span style={{ fontSize:10.5, fontWeight:600, padding:'2px 8px', borderRadius:99,
            background:sc.bg, color:sc.text, border:`1px solid ${sc.border}` }}>{p.status}</span>
          <span style={{ fontSize:11, color:'rgba(255,255,255,0.3)' }}>{p.year}</span>
        </div>
      </div>

      <p style={{ fontSize:13.5, color:'rgba(255,255,255,0.58)', lineHeight:1.65, marginBottom:16 }}>{p.desc}</p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {p.tags.map(t => (
          <span key={t} style={{ background:'rgba(251,191,36,0.1)', border:'1px solid rgba(251,191,36,0.28)',
            color:'#fbbf24', borderRadius:6, padding:'3px 9px', fontSize:11.5, fontWeight:500 }}>{t}</span>
        ))}
      </div>

      <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)', marginBottom:16 }} />
      <div style={{ fontSize:10.5, fontWeight:600, color:'rgba(255,255,255,0.3)', textTransform:'uppercase', letterSpacing:'0.7px', marginBottom:8 }}>Deep Dive</div>
      <p style={{ fontSize:13.5, color:'rgba(255,255,255,0.72)', lineHeight:1.7, marginBottom:20 }}>{p.details}</p>

      {p.video && (
        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:10.5, fontWeight:600, color:'rgba(255,255,255,0.3)', textTransform:'uppercase', letterSpacing:'0.7px', marginBottom:8 }}>Demo Video</div>
          <div style={{ borderRadius:10, overflow:'hidden', aspectRatio:'16/9' }}>
            <iframe src={p.video} style={{ width:'100%', height:'100%', border:'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen title={`${p.title} demo`} />
          </div>
        </div>
      )}

      <div className="flex gap-2.5 mt-2">
        {p.github && (
          <a href={p.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[12.5px] font-medium text-white/70
                       hover:text-white/90 bg-white/8 hover:bg-white/13 border border-white/14
                       rounded-lg px-4 py-2 transition-colors" style={{ textDecoration:'none' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            GitHub
          </a>
        )}
        {p.live && (
          <a href={p.live} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[12.5px] font-medium text-[#63a0ff]
                       hover:text-blue-300 bg-[rgba(99,160,255,0.1)] hover:bg-[rgba(99,160,255,0.18)]
                       border border-[rgba(99,160,255,0.3)] rounded-lg px-4 py-2 transition-colors"
            style={{ textDecoration:'none' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Live Demo
          </a>
        )}
      </div>
    </div>
  )
}

/* ── Project card ───────────────────────────────────────────────── */
function ProjectCard({ p, onClick }) {
  const sc = STATUS[p.status] || STATUS['Beta']
  return (
    <div onClick={onClick}
      className="group bg-white/[0.04] hover:bg-white/[0.07] border border-white/10
                 hover:border-[rgba(99,160,255,0.35)] rounded-xl overflow-hidden
                 transition-all duration-200 cursor-pointer">
      <div className={`w-full h-24 bg-gradient-to-br ${p.gradient}
                        flex items-center justify-center text-4xl
                        transition-transform duration-300 group-hover:scale-[1.02]`}>
        {p.emoji}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <span className="text-[14px] font-semibold text-white leading-snug">{p.title}</span>
          <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
            <span style={{ fontSize:9.5, fontWeight:600, padding:'2px 6px', borderRadius:99,
              background:sc.bg, color:sc.text, border:`1px solid ${sc.border}` }}>{p.status}</span>
            <span className="text-[10.5px] text-white/30">{p.year}</span>
          </div>
        </div>
        <p className="text-[12.5px] text-white/55 leading-snug mb-3">{p.desc}</p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {p.tags.map(t => (
            <span key={t} style={{ background:'rgba(251,191,36,0.1)', border:'1px solid rgba(251,191,36,0.22)',
              color:'#d97706', borderRadius:4, padding:'2px 7px', fontSize:10.5, fontWeight:500 }}>{t}</span>
          ))}
        </div>
        <div className="flex items-center gap-4 pt-2 border-t border-white/8">
          {p.github && (
            <span className="flex items-center gap-1 text-[12px] text-[#63a0ff] hover:text-blue-300 transition-colors"
              onClick={e => { e.stopPropagation(); window.open(p.github,'_blank') }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              Code
            </span>
          )}
          {p.live && (
            <span className="flex items-center gap-1 text-[12px] text-[#63a0ff] hover:text-blue-300 transition-colors"
              onClick={e => { e.stopPropagation(); window.open(p.live,'_blank') }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Demo
            </span>
          )}
          <span className="ml-auto text-[11px] text-white/25 group-hover:text-[#63a0ff]/60 transition-colors">
            View details →
          </span>
        </div>
      </div>
    </div>
  )
}

/* ── Main window ────────────────────────────────────────────────── */
export default function ProjectsWindow() {
  const [tab, setTab]           = useState('projects')
  const [selected, setSelected] = useState(null)

  const Tab = ({ id, label, count }) => (
    <button
      onClick={() => { setTab(id); setSelected(null) }}
      style={{
        background: tab === id ? 'rgba(99,160,255,0.18)' : 'transparent',
        border: tab === id ? '1px solid rgba(99,160,255,0.35)' : '1px solid transparent',
        borderRadius: 8, padding: '5px 14px',
        color: tab === id ? '#63a0ff' : 'rgba(255,255,255,0.45)',
        fontSize: 12.5, fontWeight: tab === id ? 600 : 400,
        cursor: 'pointer', fontFamily: 'inherit',
        display: 'flex', alignItems: 'center', gap: 6,
        transition: 'all 0.15s',
      }}
    >
      {label}
      <span style={{
        background: tab === id ? 'rgba(99,160,255,0.25)' : 'rgba(255,255,255,0.1)',
        color: tab === id ? '#63a0ff' : 'rgba(255,255,255,0.4)',
        borderRadius: 99, padding: '0px 6px', fontSize: 10.5, fontWeight: 600,
      }}>{count}</span>
    </button>
  )

  return (
    <div style={{ position: 'relative', minHeight: '100%' }}>
      <div style={{ opacity: selected ? 0 : 1, pointerEvents: selected ? 'none' : 'auto', transition: 'opacity 0.12s' }}>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center
                          bg-gradient-to-br from-amber-400 to-yellow-600
                          shadow-[0_4px_14px_rgba(251,191,36,0.45)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <div>
            <div className="text-[22px] font-bold text-white leading-none">Projects & Research</div>
            <div className="text-[13px] text-white/45 mt-0.5">Work built and published</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
          <Tab id="projects"     label="🚀 Projects"     count={projects.length} />
          <Tab id="publications" label="📄 Publications"  count={publications.length} />
        </div>

        {/* Projects tab */}
        {tab === 'projects' && (
          <div className="flex flex-col gap-4">
            {projects.map(p => <ProjectCard key={p.title} p={p} onClick={() => setSelected(p)} />)}
          </div>
        )}

        {/* Publications tab */}
        {tab === 'publications' && (
          <div className="flex flex-col gap-5">
            {/* Citation count banner */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(99,160,255,0.1), rgba(167,139,250,0.1))',
              border: '1px solid rgba(99,160,255,0.2)',
              borderRadius: 12, padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <span style={{ fontSize: 28 }}>🎓</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>
                  2 peer-reviewed publications
                </div>
                <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
                  Published in IEEE and Springer · 2021–2024
                </div>
              </div>
            </div>

            {publications.map(pub => <PubCard key={pub.id} pub={pub} />)}
          </div>
        )}
      </div>

      {/* Project detail overlay */}
      {selected && <ProjectDetail p={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
