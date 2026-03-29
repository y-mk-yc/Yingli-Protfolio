import { useState } from 'react'
import tinkerTool from '../assets/TinkerTool__Liquid_Glass__256x256x32.png'
import previewImg from '../assets/Preview_256x256x32.png'
import tinderImg  from '../assets/tinder_256x256x32.png'
import emailImg   from '../assets/email_256x256x32.png'

interface AppDef {
  id: string
  icon: string | null
  label: string
  bg: string | null
  img: string | null
}

const APPS: AppDef[] = [
  { id: 'about',      icon: '👤', label: 'About Me',   bg: 'linear-gradient(135deg,#667eea,#764ba2)', img: null },
  { id: 'experience', icon: '💼', label: 'Experience', bg: 'linear-gradient(135deg,#f59e0b,#ef4444)', img: null },
  { id: 'projects',   icon: null, label: 'Projects',   bg: null, img: tinkerTool },
  { id: 'skills',     icon: '⚡', label: 'Skills',     bg: 'linear-gradient(135deg,#8b5cf6,#6d28d9)', img: null },
  { id: 'education',  icon: null, label: 'Education',  bg: null, img: previewImg },
]

const UTILITY: AppDef[] = [
  { id: 'contact', icon: null, label: 'Contact', bg: null, img: emailImg  },
  { id: 'tinder',  icon: null, label: 'Tinder',  bg: null, img: tinderImg },
]

interface Props {
  openWindows: Set<string>
  onOpen: (id: string) => void
}

export default function Dock({ openWindows, onOpen }: Props) {
  const [bouncing, setBouncing] = useState<string | null>(null)

  const handleClick = (id: string) => {
    setBouncing(id)
    setTimeout(() => setBouncing(null), 550)
    onOpen(id)
  }

  function DockIcon({ app }: { app: AppDef }) {
    const isOpen = openWindows.has(app.id)
    return (
      <div
        style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
        className="group"
        onClick={() => handleClick(app.id)}
      >
        {/* Tooltip */}
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 8px)',
          background: 'rgba(0,0,0,0.8)', color: 'white', fontSize: 12,
          padding: '4px 10px', borderRadius: 6, whiteSpace: 'nowrap',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(12px)',
          pointerEvents: 'none',
        }}
          className="opacity-0 group-hover:opacity-100 transition-opacity">
          {app.label}
        </div>

        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-[14px] flex items-center justify-center
                      shadow-[0_4px_12px_rgba(0,0,0,0.4)]
                      transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                      group-hover:-translate-y-3 group-hover:scale-125
                      ${bouncing === app.id ? 'animate-dock-bounce' : ''}
                      ${app.img ? 'overflow-hidden bg-transparent' : 'text-3xl'}`}
          style={app.img ? {} : { background: app.bg ?? undefined }}
        >
          {app.img
            ? <img src={app.img} alt={app.label} className="w-full h-full object-cover" />
            : app.icon}
        </div>

        {/* Open indicator dot */}
        <div style={{
          marginTop: 4, width: 4, height: 4, borderRadius: '50%',
          background: 'rgba(255,255,255,0.7)',
          opacity: isOpen ? 1 : 0, transition: 'opacity 0.2s',
        }} />
      </div>
    )
  }

  return (
    <div style={{
      position: 'fixed', bottom: 12, left: '50%', transform: 'translateX(-50%)',
      display: 'flex', alignItems: 'flex-end', gap: 6, padding: '8px 14px',
      background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
      border: '1px solid rgba(255,255,255,0.20)', borderRadius: 18,
      boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.1) inset',
      zIndex: 9998, userSelect: 'none',
    }}>
      {APPS.map(app => <DockIcon key={app.id} app={app} />)}
      <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.20)', margin: '0 4px', alignSelf: 'center' }} />
      {UTILITY.map(app => <DockIcon key={app.id} app={app} />)}
    </div>
  )
}
