import { useState, useEffect, useCallback, useRef } from 'react'
import MenuBar from './components/MenuBar'
import Dock from './components/Dock'
import Window from './components/Window'
import Notification from './components/Notification'
import FeedbackModal from './components/FeedbackModal'
import HelpWindowContent from './windows/HelpWindowContent'
import TinderModal from './components/TinderModal'
import ControlCenter from './components/ControlCenter'
import musicSrc from './assets/Hans Zimmer - Cornfield Chase.mgg'
import wallpaperSrc from './assets/wallpager.jpg'
import AboutWindow from './windows/AboutWindow'
import ExperienceWindow from './windows/ExperienceWindow'
import ProjectsWindow from './windows/ProjectsWindow'
import SkillsWindow from './windows/SkillsWindow'
import EducationWindow from './windows/EducationWindow'
import ContactWindow from './windows/ContactWindow'

const SEARCH_HISTORY_KEY = 'portfolio_search_history'

const WINDOWS = [
  {
    id: 'about', title: 'About Me',
    icon: '👤', iconBg: 'linear-gradient(135deg,#667eea,#764ba2)',
    defaultPos: { x: 120, y: 80 }, defaultSize: { w: 520, h: 510 },
    content: <AboutWindow />,
  },
  {
    id: 'experience', title: 'Work Experience',
    icon: '💼', iconBg: 'linear-gradient(135deg,#f59e0b,#ef4444)',
    defaultPos: { x: 180, y: 65 }, defaultSize: { w: 580, h: 560 },
    content: <ExperienceWindow />,
  },
  {
    id: 'projects', title: 'Projects',
    icon: '🚀', iconBg: 'linear-gradient(135deg,#10b981,#059669)',
    defaultPos: { x: 160, y: 75 }, defaultSize: { w: 560, h: 560 },
    content: <ProjectsWindow />,
  },
  {
    id: 'skills', title: 'Skills',
    icon: '⚡', iconBg: 'linear-gradient(135deg,#8b5cf6,#6d28d9)',
    defaultPos: { x: 150, y: 80 }, defaultSize: { w: 490, h: 510 },
    content: <SkillsWindow />,
  },
  {
    id: 'education', title: 'Education',
    icon: '🎓', iconBg: 'linear-gradient(135deg,#3b82f6,#1d4ed8)',
    defaultPos: { x: 140, y: 90 }, defaultSize: { w: 500, h: 400 },
    content: <EducationWindow />,
  },
  {
    id: 'contact', title: 'Contact',
    icon: '📬', iconBg: 'linear-gradient(135deg,#ec4899,#be185d)',
    defaultPos: { x: 200, y: 85 }, defaultSize: { w: 460, h: 420 },
    content: <ContactWindow />,
  },
  {
    id: 'help', title: 'Portfolio Help',
    icon: '❓', iconBg: 'linear-gradient(135deg,#3b82f6,#6d28d9)',
    defaultPos: { x: 260, y: 100 }, defaultSize: { w: 480, h: 520 },
    content: <HelpWindowContent />,
  },
]

const DESKTOP_ICONS = ['about', 'experience', 'projects', 'education']

/* ─── helpers ───────────────────────────────────────────────────── */
function saveSearch(query) {
  if (!query.trim()) return
  const prev = JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY) || '[]')
  const deduped = prev.filter(h => h.query !== query.trim())
  const next = [{ query: query.trim(), ts: Date.now() }, ...deduped].slice(0, 20)
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(next))
}

function loadHistory() {
  return JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY) || '[]')
}

/* ─── Matrix rain easter egg ────────────────────────────────────── */
function MatrixRain({ onDone }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF'
    const colW  = 16
    const cols  = Math.floor(canvas.width / colW)
    const drops = Array.from({ length: cols }, () => Math.random() * -50)

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#00ff41'
      ctx.font = `${colW - 2}px monospace`
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(ch, i * colW, y * colW)
        drops[i] = y > canvas.height / colW + Math.random() * 50 ? 0 : y + 1
      })
    }

    const id = setInterval(draw, 40)
    const tid = setTimeout(() => { clearInterval(id); onDone() }, 5000)
    return () => { clearInterval(id); clearTimeout(tid) }
  }, [onDone])

  return (
    <div
      style={{ position:'fixed', inset:0, zIndex:99999, cursor:'pointer' }}
      onClick={onDone}
    >
      <canvas ref={canvasRef} style={{ display:'block' }} />
      <div style={{
        position:'absolute', bottom: 40, left:'50%', transform:'translateX(-50%)',
        color:'rgba(0,255,65,0.6)', fontSize:12, fontFamily:'monospace',
      }}>
        click to exit
      </div>
    </div>
  )
}

/* ─── Calendar Widget ───────────────────────────────────────────── */
function CalendarWidget() {
  const now   = new Date()
  const month = now.toLocaleDateString('en-US', { month: 'long' }).toUpperCase()
  const year  = now.getFullYear()
  const today = now.getDate()
  const firstDay    = new Date(year, now.getMonth(), 1).getDay()
  const daysInMonth = new Date(year, now.getMonth() + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let i = 1; i <= daysInMonth; i++) cells.push(i)

  return (
    <div style={{
      background:'rgba(26,16,50,0.62)',
      backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
      border:'1px solid rgba(255,255,255,0.11)',
      borderRadius:14, padding:'10px 12px', width:140, flexShrink:0,
    }}>
      <div style={{ color:'rgba(255,255,255,0.42)', fontSize:9, letterSpacing:1, marginBottom:6 }}>{month}</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:'2px 1px' }}>
        {['S','M','T','W','T','F','S'].map((d,i) => (
          <div key={i} style={{ color:'rgba(255,255,255,0.32)', fontSize:8, textAlign:'center', paddingBottom:3 }}>{d}</div>
        ))}
        {cells.map((d,i) => (
          <div key={i} style={{
            textAlign:'center', fontSize:9,
            width:16, height:16, margin:'0 auto', borderRadius:'50%',
            display:'flex', alignItems:'center', justifyContent:'center',
            color: d===today ? 'white' : d ? 'rgba(255,255,255,0.78)' : 'transparent',
            background: d===today ? '#2d7cf6' : 'transparent',
            fontWeight: d===today ? 600 : 400,
          }}>{d||''}</div>
        ))}
      </div>
    </div>
  )
}

/* ─── Analog Clock ──────────────────────────────────────────────── */
function AnalogClock({ timeStr }) {
  const parts = (timeStr||'12:00').split(':')
  const h = parseInt(parts[0])||0
  const m = parseInt(parts[1])||0
  const minuteDeg = m * 6
  const hourDeg   = (h%12)*30 + m*0.5
  const size = 54, cx = size/2

  const hand = (deg,len,w) => {
    const rad = (deg-90)*Math.PI/180
    return <line x1={cx} y1={cx}
      x2={cx+len*Math.cos(rad)} y2={cx+len*Math.sin(rad)}
      stroke="rgba(255,255,255,0.92)" strokeWidth={w} strokeLinecap="round"/>
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cx} r={cx-1} fill="rgba(28,16,54,0.68)" stroke="rgba(255,255,255,0.17)" strokeWidth="0.8"/>
      {Array.from({length:12},(_,i)=>{
        const rad=(i*30-90)*Math.PI/180, main=i%3===0
        const r1=cx-3, r2=cx-(main?7:5)
        return <line key={i}
          x1={cx+r1*Math.cos(rad)} y1={cx+r1*Math.sin(rad)}
          x2={cx+r2*Math.cos(rad)} y2={cx+r2*Math.sin(rad)}
          stroke={main?'rgba(255,255,255,0.52)':'rgba(255,255,255,0.22)'}
          strokeWidth={main?1:0.6}/>
      })}
      {hand(hourDeg,   cx-14, 1.8)}
      {hand(minuteDeg, cx-8,  1.2)}
      <circle cx={cx} cy={cx} r={1.8} fill="white"/>
    </svg>
  )
}

/* ─── World Clocks Widget ───────────────────────────────────────── */
const CLOCK_CITIES = [
  { name:'Local',    tz:null },
  { name:'New York', tz:'America/New_York' },
  { name:'London',   tz:'Europe/London' },
  { name:'Tokyo',    tz:'Asia/Tokyo' },
]

function WorldClocksWidget() {
  const [times, setTimes] = useState(CLOCK_CITIES.map(()=>'12:00'))

  useEffect(()=>{
    const tick=()=>{
      const now=new Date()
      setTimes(CLOCK_CITIES.map(c=>{
        const opts={hour:'2-digit',minute:'2-digit',hour12:false}
        if(c.tz) opts.timeZone=c.tz
        return now.toLocaleTimeString('en-US',opts)
      }))
    }
    tick()
    const id=setInterval(tick,10000)
    return ()=>clearInterval(id)
  },[])

  return (
    <div style={{
      background:'rgba(26,16,50,0.62)',
      backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
      border:'1px solid rgba(255,255,255,0.11)',
      borderRadius:14, padding:'10px 16px',
      display:'flex', gap:14, flexShrink:0,
    }}>
      {CLOCK_CITIES.map((city,i)=>(
        <div key={i} style={{textAlign:'center',display:'flex',flexDirection:'column',alignItems:'center'}}>
          <AnalogClock timeStr={times[i]}/>
          <div style={{color:'rgba(255,255,255,0.88)',fontSize:9.5,marginTop:4,fontWeight:500}}>{city.name}</div>
          <div style={{color:'rgba(255,255,255,0.42)',fontSize:8.5,marginTop:1}}>{times[i]}</div>
        </div>
      ))}
    </div>
  )
}

/* ─── Spotlight Search ──────────────────────────────────────────── */
const QUICK_ICONS = [
  { id:'about',    icon:'👤', tip:'About Me' },
  { id:'projects', icon:'🚀', tip:'Projects' },
  { id:'skills',   icon:'⚡', tip:'Skills' },
  { id:'contact',  icon:'📬', tip:'Contact' },
]

function SpotlightSearch({ onOpen, onHelp, onFeedback, onMatrix }) {
  const [query,   setQuery]   = useState('')
  const [focused, setFocused] = useState(false)
  const [tooltip, setTooltip] = useState(null)   // icon id with active tooltip
  const inputRef = useRef(null)

  const filtered = query
    ? WINDOWS.filter(w => w.title.toLowerCase().includes(query.toLowerCase()))
    : []

  const history = (!query && focused) ? loadHistory().slice(0, 6) : []

  const handleQueryChange = (val) => {
    setQuery(val)
    const lower = val.toLowerCase().trim()
    if (lower === 'help')     { onHelp?.();     setQuery(''); return }
    if (lower === 'feedback') { onFeedback?.(); setQuery(''); return }
    if (lower === 'matrix')   { onMatrix?.();   setQuery(''); return }
  }

  const selectResult = (id, q) => {
    saveSearch(q || id)
    onOpen(id)
    setQuery('')
    setFocused(false)
  }

  const showDropdown = focused && (filtered.length > 0 || history.length > 0)

  return (
    <div style={{
      position:'absolute', left:'50%', top:'46%',
      transform:'translate(-50%,-50%)', zIndex:10,
      display:'flex', alignItems:'center', gap:10,
    }}>
      {/* Search bar — position relative so dropdown is absolute under it */}
      <div style={{ position:'relative' }}>
        <div style={{
          background:'rgba(255,255,255,0.16)',
          backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)',
          border:'1px solid rgba(255,255,255,0.22)',
          borderRadius:12, display:'flex', alignItems:'center',
          padding:'7px 14px', width:280, gap:8,
          boxShadow:'0 4px 24px rgba(0,0,0,0.32)',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{flexShrink:0,opacity:0.7}}>
            <circle cx="6" cy="6" r="5" stroke="white" strokeWidth="1.5"/>
            <line x1="10" y1="10" x2="13" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => handleQueryChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            onKeyDown={e => {
              if (e.key === 'Enter' && filtered[0]) selectResult(filtered[0].id, query)
              if (e.key === 'Escape') { setQuery(''); setFocused(false) }
            }}
            placeholder="Spotlight Search"
            style={{
              background:'transparent', border:'none', outline:'none',
              color:'rgba(255,255,255,0.85)', fontSize:13,
              width:'100%', fontFamily:'inherit',
            }}
          />
          {query && (
            <button onClick={() => setQuery('')}
              style={{ background:'none', border:'none', color:'rgba(255,255,255,0.4)', cursor:'pointer', fontSize:14, lineHeight:1, padding:0 }}>
              ×
            </button>
          )}
        </div>

        {/* Dropdown — absolutely positioned so bar never moves */}
        {showDropdown && (
          <div style={{
            position:'absolute', top:'calc(100% + 8px)', left:0, width:'100%',
            background:'rgba(20,12,42,0.94)',
            backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
            border:'1px solid rgba(255,255,255,0.13)',
            borderRadius:12, padding:'4px 0',
            boxShadow:'0 8px 36px rgba(0,0,0,0.6)',
            zIndex:20,
          }}>
            {/* Recent history */}
            {history.length > 0 && (
              <>
                <div style={{ fontSize:10, color:'rgba(255,255,255,0.3)', padding:'6px 14px 2px', textTransform:'uppercase', letterSpacing:'0.5px' }}>
                  Recent
                </div>
                {history.map((h,i) => (
                  <div key={i}
                    onMouseDown={() => { setQuery(h.query); inputRef.current?.focus() }}
                    onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.06)'}
                    onMouseLeave={e => e.currentTarget.style.background='transparent'}
                    style={{
                      padding:'7px 14px', color:'rgba(255,255,255,0.65)',
                      fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:8,
                    }}>
                    <span style={{ opacity:0.4, fontSize:11 }}>🕐</span>
                    <span>{h.query}</span>
                  </div>
                ))}
                {filtered.length > 0 && <div style={{ margin:'4px 10px', borderTop:'1px solid rgba(255,255,255,0.07)' }}/>}
              </>
            )}

            {/* Search results */}
            {filtered.map(w => (
              <div key={w.id}
                onMouseDown={() => selectResult(w.id, query)}
                onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background='transparent'}
                style={{
                  padding:'8px 14px', color:'rgba(255,255,255,0.9)',
                  fontSize:13, cursor:'pointer',
                  display:'flex', alignItems:'center', gap:10,
                  transition:'background 0.1s',
                }}>
                <span>{w.icon}</span><span>{w.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick-launch icon circles with tooltips */}
      {QUICK_ICONS.map(app => (
        <div key={app.id} style={{ position:'relative' }}>
          <div
            onClick={() => onOpen(app.id)}
            onMouseEnter={() => setTooltip(app.id)}
            onMouseLeave={() => setTooltip(null)}
            style={{
              width:40, height:40, borderRadius:'50%',
              background: tooltip===app.id ? 'rgba(255,255,255,0.24)' : 'rgba(255,255,255,0.14)',
              backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)',
              border:'1px solid rgba(255,255,255,0.2)',
              display:'flex', alignItems:'center', justifyContent:'center',
              cursor:'pointer', fontSize:17,
              boxShadow:'0 2px 10px rgba(0,0,0,0.28)',
              transition:'background 0.15s, transform 0.15s',
              transform: tooltip===app.id ? 'translateY(-3px) scale(1.1)' : 'none',
            }}
          >{app.icon}</div>

          {/* Tooltip */}
          {tooltip === app.id && (
            <div style={{
              position:'absolute', bottom:'calc(100% + 8px)',
              left:'50%', transform:'translateX(-50%)',
              background:'rgba(20,20,25,0.92)',
              backdropFilter:'blur(12px)',
              border:'1px solid rgba(255,255,255,0.14)',
              borderRadius:6, padding:'4px 10px',
              color:'rgba(255,255,255,0.88)', fontSize:11.5,
              whiteSpace:'nowrap', pointerEvents:'none',
              boxShadow:'0 4px 16px rgba(0,0,0,0.5)',
              zIndex:30,
            }}>
              {app.tip}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ─── Status Widget ─────────────────────────────────────────────── */
const STATUS_SKILLS = [
  {icon:'⚛️',label:'React'}, {icon:'🟢',label:'Node'},
  {icon:'🐍',label:'Python'}, {icon:'☁️',label:'AWS'},
  {icon:'🗄️',label:'DB'}, {icon:'🎨',label:'UI'},
]

function StatusWidget() {
  return (
    <div style={{
      background:'rgba(26,16,50,0.62)',
      backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
      border:'1px solid rgba(255,255,255,0.11)',
      borderRadius:16, padding:'14px 16px', width:218,
    }}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
        <div>
          <div style={{color:'rgba(42,200,64,0.9)',fontSize:11,fontWeight:600,letterSpacing:'0.3px'}}>● Open to Work</div>
          <div style={{color:'white',fontSize:22,fontWeight:600,lineHeight:1.2,marginTop:3}}>Full Stack</div>
          <div style={{color:'rgba(255,255,255,0.55)',fontSize:10.5,marginTop:3,lineHeight:1.5}}>
            Backend · Frontend · Mobile<br/>
            <span style={{color:'rgba(99,160,255,0.85)'}}>Junior Level</span>
          </div>
        </div>
        <span style={{fontSize:22,marginTop:2}}>💼</span>
      </div>
      <div style={{marginTop:12,borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:10,display:'flex',justifyContent:'space-between'}}>
        {STATUS_SKILLS.map((s,i)=>(
          <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>
            <span style={{fontSize:14}}>{s.icon}</span>
            <span style={{color:'rgba(255,255,255,0.38)',fontSize:8}}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Mini widgets ──────────────────────────────────────────────── */
function LatestProjectWidget({ onOpen }) {
  return (
    <div onClick={()=>onOpen('projects')} style={{
      background:'rgba(26,16,50,0.62)',
      backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
      border:'1px solid rgba(255,255,255,0.11)',
      borderRadius:16, padding:'10px 12px', width:104, cursor:'pointer',
    }}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
        <div style={{width:36,height:36,borderRadius:8,background:'linear-gradient(135deg,#10b981,#059669)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>🚀</div>
        <span style={{color:'rgba(255,255,255,0.35)',fontSize:8}}>Latest</span>
      </div>
      <div style={{color:'rgba(255,255,255,0.55)',fontSize:8.5,marginBottom:2}}>AI Dashboard</div>
      <div style={{color:'white',fontSize:10.5,fontWeight:500,lineHeight:1.3}}>View Projects</div>
      <div style={{display:'flex',alignItems:'center',gap:4,marginTop:6,color:'rgba(255,255,255,0.48)',fontSize:8.5}}>
        <span>▶</span><span>React · AI</span>
      </div>
    </div>
  )
}

function SayHelloWidget({ onOpen }) {
  return (
    <div onClick={()=>onOpen('contact')} style={{
      background:'rgba(26,16,50,0.62)',
      backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
      border:'1px solid rgba(255,255,255,0.11)',
      borderRadius:16, padding:'10px 12px', width:104,
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center', gap:6, cursor:'pointer',
    }}>
      <span style={{fontSize:26}}>😊</span>
      <span style={{color:'white',fontSize:11,fontWeight:500}}>Say Hello!</span>
    </div>
  )
}

/* ─── App ───────────────────────────────────────────────────────── */
export default function App() {
  const [openWindows, setOpenWindows] = useState(new Set())
  const [zMap,        setZMap]        = useState({})
  const [zCounter,    setZCounter]    = useState(1000)
  const [notifShow,   setNotifShow]   = useState(false)
  // help is now a regular window — no separate modal state needed
  const [feedbackOpen,setFeedbackOpen]= useState(false)
  const [tinderOpen,  setTinderOpen]  = useState(false)
  const [matrixOn,    setMatrixOn]    = useState(false)
  const [ccOpen,      setCcOpen]      = useState(false)
  const [theme,       setTheme]       = useState('dark')   // 'dark' | 'light' | 'wallpaper'

  // ── Audio ──────────────────────────────────────────────────────
  const audioRef    = useRef(null)
  const [isPlaying,  setIsPlaying]  = useState(false)
  const [volume,     setVolRaw]     = useState(0.6)
  const [currentTime,setCurrentTime]= useState(0)
  const [duration,   setDuration]   = useState(0)
  const [canPlay,    setCanPlay]    = useState(false)

  // Sync volume to audio element
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  const audioControls = {
    isPlaying, volume, currentTime, duration, canPlay,
    setVolume: (v) => setVolRaw(v),
    toggle: () => {
      const a = audioRef.current
      if (!a || !canPlay) return
      if (isPlaying) { a.pause(); setIsPlaying(false) }
      else           { a.play().then(() => setIsPlaying(true)).catch(() => {}) }
    },
    seek: (t) => {
      const a = audioRef.current
      if (!a || !duration) return
      a.currentTime = Math.max(0, Math.min(t, duration))
    },
  }

  useEffect(() => {
    const t1 = setTimeout(() => setNotifShow(true),  900)
    const t2 = setTimeout(() => setNotifShow(false), 5400)
    const t3 = setTimeout(() => openWindow('about'), 1300)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  const openWindow = useCallback((id) => {
    setOpenWindows(prev => { const n=new Set(prev); n.add(id); return n })
    bringToFront(id)
  }, [])

  const closeWindow = useCallback((id) => {
    setOpenWindows(prev => { const n=new Set(prev); n.delete(id); return n })
  }, [])

  const bringToFront = useCallback((id) => {
    setZCounter(z => {
      const next=z+1
      setZMap(m=>({...m,[id]:next}))
      return next
    })
  }, [])

  return (
    <div
      className={`w-screen h-screen overflow-hidden relative select-none ${
        theme === 'light'
          ? 'bg-gradient-to-br from-[#c8d8f0] via-[#e8eef8] to-[#f0f5ff]'
          : theme === 'wallpaper'
          ? ''
          : 'bg-gradient-to-br from-[#180830] via-[#0d1248] to-[#060a26]'
      }`}
      style={theme === 'wallpaper' ? {
        backgroundImage: `url(${wallpaperSrc})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
      } : {}}
    >

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={musicSrc}
        loop
        onCanPlay={() => setCanPlay(true)}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setCanPlay(false)}
      />

      {theme === 'dark' && <div className="aurora-layer" />}
      {theme === 'wallpaper' && <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.18)', pointerEvents:'none' }} />}

      {/* Matrix easter egg */}
      {matrixOn && <MatrixRain onDone={() => setMatrixOn(false)} />}

      {/* Menu bar */}
      <MenuBar
        onOpen={openWindow}
        onHelp={() => openWindow('help')}
        onFeedback={() => setFeedbackOpen(true)}
        onToggleCC={() => setCcOpen(v => !v)}
        ccOpen={ccOpen}
        isPlaying={isPlaying}
      />

      {/* Control Center */}
      <ControlCenter
        show={ccOpen}
        onClose={() => setCcOpen(false)}
        audioControls={audioControls}
        theme={theme}
        onThemeChange={setTheme}
      />

      {/* Top-left: Calendar + World Clocks */}
      <div style={{ position:'absolute', left:20, top:40, display:'flex', gap:12, zIndex:10 }}>
        <CalendarWidget />
        <WorldClocksWidget />
      </div>

      {/* Desktop icons — right side */}
      <div className="absolute right-5 top-14 flex flex-col gap-2 z-10">
        {DESKTOP_ICONS.map(id => {
          const win = WINDOWS.find(w => w.id === id)
          if (!win) return null
          return (
            <div key={id} onClick={() => openWindow(id)}
              className="flex flex-col items-center gap-1.5 w-20 px-1 py-2 rounded-lg
                         cursor-pointer hover:bg-white/12 active:bg-white/20 transition-colors">
              <div className="w-14 h-14 rounded-[14px] flex items-center justify-center text-3xl
                             shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition-transform hover:scale-105"
                style={{ background: win.iconBg }}>
                {win.icon}
              </div>
              <span className="text-white text-[12px] text-center leading-tight
                               [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
                {win.title}
              </span>
            </div>
          )
        })}
      </div>

      {/* Spotlight */}
      <SpotlightSearch
        onOpen={openWindow}
        onHelp={() => openWindow('help')}
        onFeedback={() => setFeedbackOpen(true)}
        onMatrix={() => setMatrixOn(true)}
      />

      {/* Bottom-left: Status + mini-widgets */}
      <div style={{ position:'absolute', left:20, bottom:96, zIndex:10, display:'flex', flexDirection:'column', gap:10 }}>
        <StatusWidget />
        <div style={{ display:'flex', gap:10 }}>
          <LatestProjectWidget onOpen={openWindow} />
          <SayHelloWidget onOpen={openWindow} />
        </div>
      </div>

      {/* Windows */}
      {WINDOWS.map(win => (
        <Window key={win.id} id={win.id} title={win.title}
          initialPos={win.defaultPos} initialSize={win.defaultSize}
          isOpen={openWindows.has(win.id)} onClose={closeWindow}
          zIndex={zMap[win.id] || 1000} onFocus={bringToFront}>
          {win.content}
        </Window>
      ))}

      {/* Dock */}
      <Dock openWindows={openWindows} onOpen={(id) => {
        if (id === 'tinder') { setTinderOpen(true); return }
        openWindow(id)
      }} />

      {/* Notification */}
      <Notification show={notifShow} icon="👋" app="Portfolio" title="Welcome!"
        body="Click dock icons or type in Spotlight to explore. Try typing 'help'." />

      {/* Modals */}
      {feedbackOpen && <FeedbackModal onClose={() => setFeedbackOpen(false)} />}
      {tinderOpen   && <TinderModal   onClose={() => setTinderOpen(false)} />}
    </div>
  )
}
