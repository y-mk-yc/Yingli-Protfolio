import { useState, useEffect, useCallback, useRef } from 'react'
import MenuBar from './components/MenuBar'
import Dock from './components/Dock'
import Window from './components/Window'
import Notification from './components/Notification'
import FeedbackModal from './components/FeedbackModal'
import HelpWindowContent from './windows/HelpWindowContent'
import TinderModal from './components/TinderModal'
import ControlCenter from './components/ControlCenter'
import LoadingScreen from './components/LoadingScreen'
import { ThemeContext, Theme } from './context/ThemeContext'
import musicSrc from './assets/hans-zimmer-cornfield-chase-nonstop2k.com.mp3'
import wallpaperSrc from './assets/wallpager.jpg'
import AboutWindow from './windows/AboutWindow'
import ExperienceWindow from './windows/ExperienceWindow'
import ProjectsWindow from './windows/ProjectsWindow'
import SkillsWindow from './windows/SkillsWindow'
import EducationWindow from './windows/EducationWindow'
import ContactWindow from './windows/ContactWindow'
import GlassWidget from './components/GlassWidget'
import skillsImg from './assets/skills_256x256x32.png'
import emailImg from './assets/email_256x256x32.png'
import projectsImg from './assets/projects_page_01.png'
import experienceImg from './assets/Cursor.png'
import educationImg from './assets/education_page_01.png'
import finderImg from './assets/aboutme_page_01.png'
import helpImg from './assets/help_page_01.png'
import netImg from './assets/net.png'
import nestImg from './assets/nest.svg'
import nextImg from './assets/next.svg'
import flutterImg from './assets/flutter.svg'
import gcpImg from './assets/gcp.svg'
import awsImg from './assets/aws.svg'
import dbImg from './assets/db.svg'
import uiImg from './assets/ui.svg'

const SEARCH_HISTORY_KEY = 'portfolio_search_history'

interface WindowDef
{
  id: string; title: string
  icon: string; iconBg: string
  img?: string
  defaultPos: { x: number; y: number }
  defaultSize: { w: number; h: number }
  content: React.ReactNode
}

const WINDOWS: WindowDef[] = [
  { id: 'about', title: 'About Me', icon: '👤', iconBg: 'linear-gradient(135deg,#667eea,#764ba2)', img: finderImg, defaultPos: { x: 120, y: 80 }, defaultSize: { w: 520, h: 560 }, content: <AboutWindow /> },
  { id: 'experience', title: 'Work Experience', icon: '💼', iconBg: 'linear-gradient(135deg,#f59e0b,#ef4444)', img: experienceImg, defaultPos: { x: 180, y: 65 }, defaultSize: { w: 580, h: 560 }, content: <ExperienceWindow /> },
  { id: 'projects', title: 'Projects', icon: '🚀', iconBg: 'linear-gradient(135deg,#10b981,#059669)', img: projectsImg, defaultPos: { x: 160, y: 75 }, defaultSize: { w: 560, h: 560 }, content: <ProjectsWindow /> },
  { id: 'skills', title: 'Skills', icon: '⚡', iconBg: 'linear-gradient(135deg,#8b5cf6,#6d28d9)', img: skillsImg, defaultPos: { x: 150, y: 80 }, defaultSize: { w: 490, h: 510 }, content: <SkillsWindow /> },
  { id: 'education', title: 'Education', icon: '🎓', iconBg: 'linear-gradient(135deg,#3b82f6,#1d4ed8)', img: educationImg, defaultPos: { x: 140, y: 90 }, defaultSize: { w: 500, h: 430 }, content: <EducationWindow /> },
  { id: 'contact', title: 'Contact', icon: '📬', iconBg: 'linear-gradient(135deg,#ec4899,#be185d)', img: emailImg, defaultPos: { x: 200, y: 85 }, defaultSize: { w: 460, h: 480 }, content: <ContactWindow /> },
  { id: 'help', title: 'Portfolio Help', icon: '❓', iconBg: 'linear-gradient(135deg,#3b82f6,#6d28d9)', img: helpImg, defaultPos: { x: 260, y: 100 }, defaultSize: { w: 480, h: 520 }, content: <HelpWindowContent /> },
]

/* ─── helpers ────────────────────────────────────────────────── */
interface HistoryEntry { query: string; ts: number }

function saveSearch(query: string)
{
  if (!query.trim()) return
  const prev: HistoryEntry[] = JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY) || '[]')
  const deduped = prev.filter(h => h.query !== query.trim())
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify([{ query: query.trim(), ts: Date.now() }, ...deduped].slice(0, 20)))
}
function loadHistory(): HistoryEntry[]
{
  return JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY) || '[]')
}

/* ─── Matrix rain ────────────────────────────────────────────── */
function MatrixRain({ onDone }: { onDone: () => void })
{
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() =>
  {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    // const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF'
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const colW = 16
    const cols = Math.floor(canvas.width / colW)
    const drops = Array.from({ length: cols }, () => Math.random() * -50)
    const draw = () =>
    {
      ctx.fillStyle = 'rgba(0,0,0,0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#00ff41'
      ctx.font = `${colW - 2}px monospace`
      drops.forEach((y, i) =>
      {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * colW, y * colW)
        drops[i] = y > canvas.height / colW + Math.random() * 50 ? 0 : y + 1
      })
    }
    const id = setInterval(draw, 40)
    const tid = setTimeout(() => { clearInterval(id); onDone() }, 5000)
    return () => { clearInterval(id); clearTimeout(tid) }
  }, [onDone])
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, cursor: 'pointer' }} onClick={onDone}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
      <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', color: 'rgba(0,255,65,0.6)', fontSize: 12, fontFamily: 'monospace' }}>
        click to exit
      </div>
    </div>
  )
}

/* ─── Calendar ───────────────────────────────────────────────── */
function CalendarWidget()
{
  const now = new Date()
  const month = now.toLocaleDateString('en-US', { month: 'long' }).toUpperCase()
  const year = now.getFullYear()
  const today = now.getDate()
  const firstDay = new Date(year, now.getMonth(), 1).getDay()
  const daysInMonth = new Date(year, now.getMonth() + 1, 0).getDate()
  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let i = 1; i <= daysInMonth; i++) cells.push(i)
  return (
    <GlassWidget style={{ width: 218 }}>
      <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: 9, letterSpacing: 1, marginBottom: 6 }}>{month}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '2px 1px' }}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} style={{ color: 'rgba(255,255,255,0.32)', fontSize: 8, textAlign: 'center', paddingBottom: 3 }}>{d}</div>
        ))}
        {cells.map((d, i) => (
          <div key={i} style={{
            textAlign: 'center', fontSize: 9, width: 16, height: 16, margin: '0 auto',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: d === today ? 'white' : d ? 'rgba(255,255,255,0.78)' : 'transparent',
            background: d === today ? '#2d7cf6' : 'transparent',
            fontWeight: d === today ? 600 : 400,
          }}>{d || ''}</div>
        ))}
      </div>
    </GlassWidget>
  )
}

/* ─── Analog Clock ───────────────────────────────────────────── */
function AnalogClock({ timeStr }: { timeStr: string })
{
  const parts = (timeStr || '12:00').split(':')
  const h = parseInt(parts[0]) || 0
  const m = parseInt(parts[1]) || 0
  const minuteDeg = m * 6
  const hourDeg = (h % 12) * 30 + m * 0.5
  const size = 54, cx = size / 2
  const hand = (deg: number, len: number, w: number) =>
  {
    const rad = (deg - 90) * Math.PI / 180
    return <line x1={cx} y1={cx} x2={cx + len * Math.cos(rad)} y2={cx + len * Math.sin(rad)}
      stroke="rgba(255,255,255,0.92)" strokeWidth={w} strokeLinecap="round" />
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cx} r={cx - 1} fill="rgba(28,16,54,0.68)" stroke="rgba(255,255,255,0.17)" strokeWidth="0.8" />
      {Array.from({ length: 12 }, (_, i) =>
      {
        const rad = (i * 30 - 90) * Math.PI / 180, main = i % 3 === 0
        const r1 = cx - 3, r2 = cx - (main ? 7 : 5)
        return <line key={i}
          x1={cx + r1 * Math.cos(rad)} y1={cx + r1 * Math.sin(rad)}
          x2={cx + r2 * Math.cos(rad)} y2={cx + r2 * Math.sin(rad)}
          stroke={main ? 'rgba(255,255,255,0.52)' : 'rgba(255,255,255,0.22)'}
          strokeWidth={main ? 1 : 0.6} />
      })}
      {hand(hourDeg, cx - 14, 1.8)}
      {hand(minuteDeg, cx - 8, 1.2)}
      <circle cx={cx} cy={cx} r={1.8} fill="white" />
    </svg>
  )
}

/* ─── World Clocks ───────────────────────────────────────────── */
const CLOCK_CITIES = [
  { name: 'Local', tz: null },
  { name: 'New York', tz: 'America/New_York' },
  { name: 'London', tz: 'Europe/London' },
  { name: 'Tokyo', tz: 'Asia/Tokyo' },
]

function WorldClocksWidget()
{
  const [times, setTimes] = useState(CLOCK_CITIES.map(() => '12:00'))
  useEffect(() =>
  {
    const tick = () =>
    {
      const now = new Date()
      setTimes(CLOCK_CITIES.map(c =>
      {
        const opts: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false }
        if (c.tz) opts.timeZone = c.tz
        return now.toLocaleTimeString('en-US', opts)
      }))
    }
    tick()
    const id = setInterval(tick, 10000)
    return () => clearInterval(id)
  }, [])
  return (
    <GlassWidget style={{ display: 'flex', gap: 14, flexShrink: 0, alignItems: 'center' }}>
      {CLOCK_CITIES.map((city, i) => (
        <div key={i} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <AnalogClock timeStr={times[i]} />
          <div style={{ color: 'white', fontSize: 9.5, marginTop: 4, fontWeight: 500 }}>{city.name}</div>
          <div style={{ color: 'white', fontSize: 8.5, marginTop: 1 }}>{times[i]}</div>
        </div>
      ))}
    </GlassWidget>
  )
}

/* ─── Spotlight ──────────────────────────────────────────────── */
const QUICK_ICONS = [
  { id: 'about', icon: '👤', tip: 'About Me' },
  { id: 'projects', icon: '🚀', tip: 'Projects' },
  { id: 'skills', icon: '⚡', tip: 'Skills' },
  { id: 'contact', icon: '📬', tip: 'Contact' },
]

function SpotlightSearch({ onOpen, onHelp, onFeedback, onMatrix }: {
  onOpen: (id: string) => void; onHelp: () => void; onFeedback: () => void; onMatrix: () => void
})
{
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [tooltip, setTooltip] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = query
    ? WINDOWS.filter(w => w.title.toLowerCase().includes(query.toLowerCase()))
    : []
  const history = (!query && focused) ? loadHistory().slice(0, 6) : []
  const showDropdown = focused && (filtered.length > 0 || history.length > 0)

  const handleQueryChange = (val: string) =>
  {
    setQuery(val)
    const lower = val.toLowerCase().trim()
    if (lower === 'help') { onHelp(); setQuery(''); return }
    if (lower === 'feedback') { onFeedback(); setQuery(''); return }
    if (lower === 'matrix') { onMatrix(); setQuery(''); return }
  }

  const selectResult = (id: string, q: string) =>
  {
    saveSearch(q || id); onOpen(id); setQuery(''); setFocused(false)
  }

  return (
    <div style={{ position: 'absolute', left: '50%', top: '46%', transform: 'translate(-50%,-50%)', zIndex: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ position: 'relative' }}>
        <div style={{ background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 12, display: 'flex', alignItems: 'center', padding: '7px 14px', width: 280, gap: 8, boxShadow: '0 4px 24px rgba(0,0,0,0.32)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, opacity: 0.7 }}>
            <circle cx="6" cy="6" r="5" stroke="white" strokeWidth="1.5" />
            <line x1="10" y1="10" x2="13" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef} value={query}
            onChange={e => handleQueryChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            onKeyDown={e =>
            {
              if (e.key === 'Enter' && filtered[0]) selectResult(filtered[0].id, query)
              if (e.key === 'Escape') { setQuery(''); setFocused(false) }
            }}
            placeholder="Spotlight Search"
            style={{ background: 'transparent', border: 'none', outline: 'none', color: 'rgba(255,255,255,0.85)', fontSize: 13, width: '100%', fontFamily: 'inherit' }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 14, lineHeight: 1, padding: 0 }}>×</button>
          )}
        </div>

        {showDropdown && (
          <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, width: '100%', background: 'rgba(20,12,42,0.94)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.13)', borderRadius: 12, padding: '4px 0', boxShadow: '0 8px 36px rgba(0,0,0,0.6)', zIndex: 20 }}>
            {history.length > 0 && (
              <>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', padding: '6px 14px 2px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Recent</div>
                {history.map((h, i) => (
                  <div key={i} onMouseDown={() => { setQuery(h.query); inputRef.current?.focus() }}
                    style={{ padding: '7px 14px', color: 'rgba(255,255,255,0.65)', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
                    onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.06)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = 'transparent')}>
                    <span style={{ opacity: 0.4, fontSize: 11 }}>🕐</span><span>{h.query}</span>
                  </div>
                ))}
                {filtered.length > 0 && <div style={{ margin: '4px 10px', borderTop: '1px solid rgba(255,255,255,0.07)' }} />}
              </>
            )}
            {filtered.map(w => (
              <div key={w.id} onMouseDown={() => selectResult(w.id, query)}
                style={{ padding: '8px 14px', color: 'rgba(255,255,255,0.9)', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, transition: 'background 0.1s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.08)')}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = 'transparent')}>
                <span>{w.icon}</span><span>{w.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {QUICK_ICONS.map(app => (
        <div key={app.id} style={{ position: 'relative' }}>
          <div onClick={() => onOpen(app.id)}
            onMouseEnter={() => setTooltip(app.id)}
            onMouseLeave={() => setTooltip(null)}
            style={{
              width: 40, height: 40, borderRadius: '50%',
              background: tooltip === app.id ? 'rgba(255,255,255,0.24)' : 'rgba(255,255,255,0.14)',
              backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: 17,
              boxShadow: '0 2px 10px rgba(0,0,0,0.28)',
              transition: 'background 0.15s, transform 0.15s',
              transform: tooltip === app.id ? 'translateY(-3px) scale(1.1)' : 'none',
            }}>{app.icon}</div>
          {tooltip === app.id && (
            <div style={{ position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)', background: 'rgba(20,20,25,0.92)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 6, padding: '4px 10px', color: 'rgba(255,255,255,0.88)', fontSize: 11.5, whiteSpace: 'nowrap', pointerEvents: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.5)', zIndex: 30 }}>
              {app.tip}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ─── Status Widget ──────────────────────────────────────────── */
const STATUS_SKILLS = [
  { icon: null, img: netImg, label: '.Net' },
  { icon: null, img: nestImg, label: 'Nest' },
  { icon: null, img: nextImg, label: 'Next' },
  { icon: null, img: flutterImg, label: 'Flutter' },
  { icon: null, img: gcpImg, label: 'GCP' },
  { icon: null, img: awsImg, label: 'AWS' },
  { icon: null, img: dbImg, label: 'DB' },
  { icon: null, img: uiImg, label: 'UI' },
]

function StatusWidget()
{
  return (
    <GlassWidget>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ color: 'rgba(42,200,64,0.9)', fontSize: 11, fontWeight: 600, letterSpacing: '0.3px' }}>● Open to Work</div>
          <div style={{ color: 'white', fontSize: 22, fontWeight: 600, lineHeight: 1.2, marginTop: 3 }}>Full Stack</div>
          <div style={{ color: 'white', fontSize: 10.5, marginTop: 3, lineHeight: 1.5 }}>
            Backend · Frontend · Mobile<br />
            <span style={{ color: 'white' }}>Junior Level</span>
          </div>
        </div>
        <span style={{ fontSize: 22, marginTop: 2 }}>💼</span>
      </div>
      <div style={{
        marginTop: 12, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 10,
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px 4px',
      }}>
        {STATUS_SKILLS.map((s, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <img src={s.img} alt={s.label} style={{ width: 20, height: 20, objectFit: 'contain' }} />
            <span style={{ color: 'white', fontSize: 10 }}>{s.label}</span>
          </div>
        ))}
      </div>
    </GlassWidget>
  )
}

/* ─── Mini widgets ───────────────────────────────────────────── */
function LatestProjectWidget()
{
  return (
    <GlassWidget style={{ cursor: 'pointer', width: 104 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg,#10b981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🚀</div>
        <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 8 }}>Latest</span>
      </div>
      <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 8.5, marginBottom: 2 }}>AI Dashboard</div>
      <div style={{ color: 'white', fontSize: 10.5, fontWeight: 500, lineHeight: 1.3 }}>View Projects</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6, color: 'rgba(255,255,255,0.48)', fontSize: 8.5 }}>
        <span>▶</span><span>React · AI</span>
      </div>
    </GlassWidget>
  )
}

function SayHelloWidget()
{
  return (
    <GlassWidget style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', width: 104, alignItems: 'center', justifyContent: 'center', gap: 6 }}>
      <span style={{ fontSize: 26 }}>😊</span>
      <span style={{ color: 'white', fontSize: 11, fontWeight: 500 }}>Say Hello!</span>
    </GlassWidget>
  )
}

/* ─── App ────────────────────────────────────────────────────── */
export default function App()
{
  const [loading, setLoading] = useState(true)
  const [openWindows, setOpenWindows] = useState(new Set<string>())
  const [zMap, setZMap] = useState<Record<string, number>>({})
  const [zCounter, setZCounter] = useState(1000)
  const [notifShow, setNotifShow] = useState(false)
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [tinderOpen, setTinderOpen] = useState(false)
  const [matrixOn, setMatrixOn] = useState(false)
  const [ccOpen, setCcOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>('light')

  // ── Audio ──
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolRaw] = useState(0.6)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [canPlay, setCanPlay] = useState(true)

  useEffect(() =>
  {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  // Autoplay once loading screen is gone (window.load already fired by then)
  useEffect(() =>
  {
    if (!loading && audioRef.current) {
      audioRef.current.play().catch(() => setIsPlaying(false))
    }
  }, [loading])

  const audioControls = {
    isPlaying, volume, currentTime, duration, canPlay,
    setVolume: (v: number) => setVolRaw(v),
    toggle: () =>
    {
      const a = audioRef.current
      if (!a || !canPlay) return
      if (isPlaying) { a.pause(); setIsPlaying(false) }
      else { a.play().then(() => setIsPlaying(true)).catch(() => { }) }
    },
    seek: (t: number) =>
    {
      const a = audioRef.current
      if (!a || !duration) return
      a.currentTime = Math.max(0, Math.min(t, duration))
    },
  }

  useEffect(() =>
  {
    const t1 = setTimeout(() => setNotifShow(true), 900)
    const t2 = setTimeout(() => setNotifShow(false), 5400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const openWindow = useCallback((id: string) =>
  {
    setOpenWindows(prev => { const n = new Set(prev); n.add(id); return n })
    bringToFront(id)
  }, [])

  const closeWindow = useCallback((id: string) =>
  {
    setOpenWindows(prev => { const n = new Set(prev); n.delete(id); return n })
  }, [])

  const bringToFront = useCallback((id: string) =>
  {
    setZCounter(z =>
    {
      const next = z + 1
      setZMap(m => ({ ...m, [id]: next }))
      return next
    })
  }, [])

  // Build background style based on theme
  const bgStyle: React.CSSProperties = {
    backgroundImage: `url(${wallpaperSrc})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="w-screen h-screen overflow-hidden relative select-none" style={bgStyle}>

        <audio ref={audioRef} src={musicSrc} loop
          onCanPlay={() => setCanPlay(true)}
          onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
          onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => setCanPlay(false)}
        />

        {theme === 'dark' && <div className="aurora-layer" />}
        {theme === 'light' && <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }} />}

        {matrixOn && <MatrixRain onDone={() => setMatrixOn(false)} />}

        <MenuBar onOpen={openWindow} onHelp={() => openWindow('help')} onFeedback={() => setFeedbackOpen(true)} onToggleCC={() => setCcOpen(v => !v)} ccOpen={ccOpen} isPlaying={isPlaying} />

        <ControlCenter show={ccOpen} onClose={() => setCcOpen(false)} audioControls={audioControls} theme={theme} onThemeChange={setTheme} />

        {/* Top-left widgets */}
        <div style={{ position: 'absolute', left: 20, top: 40, display: 'flex', gap: 12, zIndex: 10 }}>
          <CalendarWidget />
          <WorldClocksWidget />
        </div>

        <SpotlightSearch onOpen={openWindow} onHelp={() => openWindow('help')} onFeedback={() => setFeedbackOpen(true)} onMatrix={() => setMatrixOn(true)} />

        {/* Bottom-left widgets */}
        <div style={{ position: 'absolute', left: 20, bottom: 96, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <StatusWidget />
          <div style={{ display: 'flex', gap: 10 }}>
            <LatestProjectWidget />
            <SayHelloWidget />
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

        <Dock openWindows={openWindows} onOpen={(id) =>
        {
          if (id === 'tinder') { setTinderOpen(true); return }
          openWindow(id)
        }} />

        <Notification show={notifShow} icon="👋" app="Portfolio" title="Welcome!"
          body="Click dock icons or type in Spotlight to explore. Try typing 'help'." />

        {feedbackOpen && <FeedbackModal onClose={() => setFeedbackOpen(false)} />}
        {tinderOpen && <TinderModal onClose={() => setTinderOpen(false)} />}
      </div>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
    </ThemeContext.Provider>
  )
}
