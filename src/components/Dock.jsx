import { useState } from 'react'
import tinkerTool from '../assets/TinkerTool__Liquid_Glass__256x256x32.png'
import previewImg from '../assets/Preview_256x256x32.png'
import firefoxImg from '../assets/Firefox_256x256x32.png'
import tinderImg from '../assets/tinder_256x256x32.png'
import skillsImg from '../assets/skills_256x256x32.png'
import emailImg from '../assets/email_256x256x32.png'
import projectsImg from '../assets/projects_page_01.png'
import experienceImg from '../assets/Cursor.png'
import educationImg from '../assets/education_page_01.png'
import finderImg from '../assets/aboutme_page_01.png'

const APPS = [
  { id: 'about', icon: '👤', label: 'About Me', bg: 'linear-gradient(135deg,#667eea,#764ba2)', img: finderImg },
  { id: 'experience', icon: '💼', label: 'Experience', bg: 'linear-gradient(135deg,#f59e0b,#ef4444)', img: experienceImg },
  { id: 'projects', icon: null, label: 'Projects', bg: null, img: projectsImg },
  { id: 'skills', icon: '⚡', label: 'Skills', bg: 'linear-gradient(135deg,#8b5cf6,#6d28d9)', img: skillsImg },
  { id: 'education', icon: null, label: 'Education', bg: null, img: educationImg },
]

const UTILITY = [
  { id: 'contact', icon: null, label: 'Contact', bg: null, img: emailImg },
  { id: 'tinder', icon: null, label: 'Tinder', bg: null, img: tinderImg },
]

export default function Dock({ openWindows, onOpen })
{
  const [bouncing, setBouncing] = useState(null)

  const handleClick = (id) =>
  {
    setBouncing(id)
    setTimeout(() => setBouncing(null), 550)
    onOpen(id)
  }

  const DockIcon = ({ app }) =>
  {
    const isOpen = openWindows.has(app.id)
    return (
      <div
        className="relative flex flex-col items-center cursor-pointer group"
        onClick={() => handleClick(app.id)}
      >
        {/* Tooltip */}
        <div className="absolute bottom-full mb-8 bg-black/80 text-white text-xs
                        px-2.5 py-1 rounded-md whitespace-nowrap
                        opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
                        backdrop-blur-md border border-white/10">
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
          style={app.img ? {} : { background: app.bg }}
        >
          {app.img
            ? <img src={app.img} alt={app.label} className="w-full h-full object-cover" />
            : app.icon}
        </div>

        {/* Open dot */}
        <div className={`mt-1 w-1 h-1 rounded-full bg-white/70 transition-opacity
                         ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    )
  }

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2
                    flex items-end gap-1.5 px-3.5 py-2
                    bg-white/12 backdrop-blur-xl
                    border border-white/20 rounded-[18px]
                    shadow-[0_8px_32px_rgba(0,0,0,0.4),0_1px_0_rgba(255,255,255,0.1)_inset]
                    z-[9998] select-none">
      {APPS.map(app => <DockIcon key={app.id} app={app} />)}
      <div className="w-px h-10 bg-white/20 mx-1 self-center" />
      {UTILITY.map(app => <DockIcon key={app.id} app={app} />)}
    </div>
  )
}
