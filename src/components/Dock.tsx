import { useState } from 'react'
import aboutImg from '../assets/aboutme_page_01.png'
import experienceImg from '../assets/Cursor.png'
import projectsImg from '../assets/projects_page_01.png'
import skillsImg from '../assets/skills_256x256x32.png'
import educationImg from '../assets/education_page_01.png'
import emailImg from '../assets/email_256x256x32.png'
import tinderImg from '../assets/tinder_256x256x32.png'

interface AppDef
{
  id: string
  icon: string | null
  label: string
  bg: string | null
  img: string | null
}

const APPS: AppDef[] = [
  { id: 'about', icon: null, label: 'About Me', bg: null, img: aboutImg },
  { id: 'experience', icon: null, label: 'Experience', bg: null, img: experienceImg },
  { id: 'projects', icon: null, label: 'Projects', bg: null, img: projectsImg },
  { id: 'skills', icon: null, label: 'Skills', bg: null, img: skillsImg },
  { id: 'education', icon: null, label: 'Education', bg: null, img: educationImg },
]

const UTILITY: AppDef[] = [
  { id: 'contact', icon: null, label: 'Contact', bg: null, img: emailImg },
  { id: 'tinder', icon: null, label: 'Tinder', bg: null, img: tinderImg },
]

interface Props
{
  openWindows: Set<string>
  onOpen: (id: string) => void
}

interface IconProps {
  app: AppDef
  isOpen: boolean
  bouncing: boolean
  onClick: () => void
}

function DockIcon({ app, isOpen, bouncing, onClick }: IconProps)
{
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip */}
      <div style={{
        position: 'absolute', bottom: 'calc(100% + 8px)',
        background: 'rgba(0,0,0,0.8)', color: 'white', fontSize: 12,
        padding: '4px 10px', borderRadius: 6, whiteSpace: 'nowrap',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(12px)',
        pointerEvents: 'none',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.15s',
      }}>
        {app.label}
      </div>

      {/* Icon */}
      <div style={{
        width: 56, height: 56, borderRadius: 14, overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        transform: hovered ? 'translateY(-10px) scale(1.22)' : 'translateY(0) scale(1)',
        transition: 'transform 0.18s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        animation: bouncing ? 'dockBounce 0.55s ease' : 'none',
        background: app.img ? 'transparent' : (app.bg ?? undefined),
        fontSize: 28,
      }}>
        {app.img
          ? <img src={app.img} alt={app.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

export default function Dock({ openWindows, onOpen }: Props)
{
  const [bouncing, setBouncing] = useState<string | null>(null)

  const handleClick = (id: string) =>
  {
    setBouncing(id)
    setTimeout(() => setBouncing(null), 550)
    onOpen(id)
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
      {APPS.map(app => (
        <DockIcon key={app.id} app={app}
          isOpen={openWindows.has(app.id)}
          bouncing={bouncing === app.id}
          onClick={() => handleClick(app.id)} />
      ))}
      <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.20)', margin: '0 4px', alignSelf: 'center' }} />
      {UTILITY.map(app => (
        <DockIcon key={app.id} app={app}
          isOpen={openWindows.has(app.id)}
          bouncing={bouncing === app.id}
          onClick={() => handleClick(app.id)} />
      ))}
    </div>
  )
}
