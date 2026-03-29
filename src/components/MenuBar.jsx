import { useState, useEffect, useRef } from 'react'

export default function MenuBar({ onOpen, onHelp, onFeedback, onToggleCC, ccOpen, isPlaying }) {
  const [time, setTime] = useState('')
  const [activeMenu, setActiveMenu] = useState(null)
  const barRef = useRef(null)

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const date = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      const t    = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      setTime(`${date}  ${t}`)
    }
    tick()
    const id = setInterval(tick, 10000)
    return () => clearInterval(id)
  }, [])

  // Close on outside click
  useEffect(() => {
    const handler = e => {
      if (barRef.current && !barRef.current.contains(e.target)) setActiveMenu(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const MENUS = [
    {
      id: 'file', label: 'File',
      items: [
        { label: 'New Window',      disabled: true },
        { label: 'Close Window',    disabled: true,  shortcut: '⌘W' },
        { sep: true },
        { label: 'Download Résumé', action: () => window.open('/resume.pdf', '_blank') },
        { sep: true },
        { label: 'Get Info',        disabled: true, shortcut: '⌘I' },
      ],
    },
    {
      id: 'view', label: 'View',
      items: [
        { label: 'About Me',        action: () => onOpen?.('about') },
        { label: 'Work Experience', action: () => onOpen?.('experience') },
        { label: 'Projects',        action: () => onOpen?.('projects') },
        { sep: true },
        { label: 'Zoom In',  disabled: true, shortcut: '⌘+' },
        { label: 'Zoom Out', disabled: true, shortcut: '⌘−' },
        { sep: true },
        { label: 'Enter Full Screen', disabled: true, shortcut: '⌃⌘F' },
      ],
    },
    {
      id: 'window', label: 'Window',
      items: [
        { label: 'Minimize', disabled: true, shortcut: '⌘M' },
        { label: 'Zoom',     disabled: true },
        { sep: true },
        { label: '👤  About Me',        action: () => onOpen?.('about') },
        { label: '💼  Work Experience', action: () => onOpen?.('experience') },
        { label: '🚀  Projects',        action: () => onOpen?.('projects') },
        { label: '⚡  Skills',          action: () => onOpen?.('skills') },
        { label: '🎓  Education',       action: () => onOpen?.('education') },
        { label: '📬  Contact',         action: () => onOpen?.('contact') },
      ],
    },
    {
      id: 'help', label: 'Help',
      items: [
        { label: 'Portfolio Help',   action: () => onHelp?.(),     shortcut: '⌘?' },
        { sep: true },
        { label: 'Send Feedback',    action: () => onFeedback?.() },
        { sep: true },
        { label: 'About Portfolio',  action: () => onOpen?.('about') },
      ],
    },
  ]

  const handleItemClick = (item) => {
    if (item.disabled || !item.action) return
    item.action()
    setActiveMenu(null)
  }

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-7 z-[9999] flex items-center px-3 gap-0.5
                 text-white text-[13px] select-none
                 bg-black/55 backdrop-blur-xl border-b border-white/10"
    >
      {/* Apple logo */}
      <span className="text-base px-2 py-0.5 rounded hover:bg-white/15 cursor-default transition-colors">
        &#63743;
      </span>
      <span className="font-semibold px-2 py-0.5 rounded hover:bg-white/15 cursor-default transition-colors">
        Portfolio
      </span>

      {/* Menus */}
      {MENUS.map(menu => (
        <div key={menu.id} className="relative">
          <span
            className={`cursor-default px-2 py-0.5 rounded transition-colors
              ${activeMenu === menu.id ? 'bg-white/22 text-white' : 'opacity-85 hover:bg-white/10'}`}
            onMouseDown={e => { e.stopPropagation(); setActiveMenu(activeMenu === menu.id ? null : menu.id) }}
            onMouseEnter={() => activeMenu !== null && setActiveMenu(menu.id)}
          >
            {menu.label}
          </span>

          {activeMenu === menu.id && (
            <div
              className="absolute top-full left-0 mt-0.5 min-w-[200px] z-[10000]
                         bg-[rgba(30,30,32,0.96)] backdrop-blur-2xl
                         border border-white/14 rounded-lg py-1.5
                         shadow-[0_16px_60px_rgba(0,0,0,0.7)]"
            >
              {menu.items.map((item, i) =>
                item.sep ? (
                  <div key={i} className="my-1 mx-2 border-t border-white/10" />
                ) : (
                  <div
                    key={i}
                    onMouseDown={() => handleItemClick(item)}
                    className={`flex items-center justify-between px-3 py-[5px] mx-1 rounded text-[13px]
                      ${item.disabled
                        ? 'text-white/28 cursor-default'
                        : 'text-white/88 cursor-pointer hover:bg-[rgba(99,160,255,0.22)] hover:text-white'
                      }`}
                  >
                    <span>{item.label}</span>
                    {item.shortcut && (
                      <span className="text-white/35 text-[12px] ml-8">{item.shortcut}</span>
                    )}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      ))}

      {/* Right side */}
      <div className="ml-auto flex gap-2 items-center text-[12px] opacity-90">
        {/* Now playing indicator */}
        {isPlaying && (
          <span className="flex items-center gap-1 text-[11px] text-white/60 mr-1">
            <span className="inline-flex gap-[2px] items-end h-3">
              {[1,2,3].map(i => (
                <span key={i} style={{
                  display:'inline-block', width:2, borderRadius:1,
                  background:'rgba(255,255,255,0.6)',
                  animation:`barBounce${i} 0.7s ease-in-out infinite alternate`,
                  height: `${[8,12,6][i-1]}px`,
                }} />
              ))}
            </span>
          </span>
        )}
        <span>🔋 100%</span>
        <span>📶</span>
        {/* Control Centre toggle */}
        <button
          data-cc="1"
          onClick={onToggleCC}
          title="Control Centre"
          style={{
            background: ccOpen ? 'rgba(255,255,255,0.22)' : 'transparent',
            border: 'none', borderRadius: 5, cursor: 'pointer',
            padding: '2px 5px', display:'flex', alignItems:'center',
            transition:'background 0.15s',
          }}
          onMouseEnter={e => { if(!ccOpen) e.currentTarget.style.background='rgba(255,255,255,0.12)' }}
          onMouseLeave={e => { if(!ccOpen) e.currentTarget.style.background='transparent' }}
        >
          {/* Control Centre icon (two rows of two toggles) */}
          <svg width="16" height="12" viewBox="0 0 16 12" fill="white" opacity="0.9">
            <rect x="0" y="0" width="6" height="5" rx="1.5" opacity="0.9"/>
            <rect x="10" y="0" width="6" height="5" rx="1.5" opacity="0.5"/>
            <rect x="0" y="7" width="6" height="5" rx="1.5" opacity="0.5"/>
            <rect x="10" y="7" width="6" height="5" rx="1.5" opacity="0.9"/>
          </svg>
        </button>
        <span className="tabular-nums">{time}</span>
      </div>
    </div>
  )
}
