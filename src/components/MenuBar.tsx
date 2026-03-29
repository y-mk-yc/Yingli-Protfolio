import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'
import logoSrc from '../assets/logo.svg'

interface MenuItem {
  label?: string
  action?: () => void
  shortcut?: string
  disabled?: boolean
  sep?: true
}

interface Menu {
  id: string
  label: string
  items: MenuItem[]
}

interface Props {
  onOpen: (id: string) => void
  onHelp: () => void
  onFeedback: () => void
  onToggleCC: () => void
  ccOpen: boolean
  isPlaying: boolean
}

export default function MenuBar({ onOpen, onHelp, onFeedback, onToggleCC, ccOpen, isPlaying }: Props) {
  const { theme } = useTheme()
  const isDark = theme !== 'light'
  const [time, setTime] = useState('')
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const date = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      const t = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      setTime(`${date}  ${t}`)
    }
    tick()
    const id = setInterval(tick, 10000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node
      if (barRef.current && !barRef.current.contains(target)) setActiveMenu(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const MENUS: Menu[] = [
    {
      id: 'file', label: 'File',
      items: [
        { label: 'New Window', disabled: true },
        { label: 'Close Window', disabled: true, shortcut: '⌘W' },
        { sep: true },
        { label: 'Download Résumé', action: () => window.open('/resume.pdf', '_blank') },
        { sep: true },
        { label: 'Get Info', disabled: true, shortcut: '⌘I' },
      ],
    },
    {
      id: 'view', label: 'View',
      items: [
        { label: 'About Me', action: () => onOpen('about') },
        { label: 'Work Experience', action: () => onOpen('experience') },
        { label: 'Projects', action: () => onOpen('projects') },
        { sep: true },
        { label: 'Zoom In', disabled: true, shortcut: '⌘+' },
        { label: 'Zoom Out', disabled: true, shortcut: '⌘−' },
        { sep: true },
        { label: 'Enter Full Screen', disabled: true, shortcut: '⌃⌘F' },
      ],
    },
    {
      id: 'window', label: 'Window',
      items: [
        { label: 'Minimize', disabled: true, shortcut: '⌘M' },
        { label: 'Zoom', disabled: true },
        { sep: true },
        { label: '👤  About Me', action: () => onOpen('about') },
        { label: '💼  Work Experience', action: () => onOpen('experience') },
        { label: '🚀  Projects', action: () => onOpen('projects') },
        { label: '⚡  Skills', action: () => onOpen('skills') },
        { label: '🎓  Education', action: () => onOpen('education') },
        { label: '📬  Contact', action: () => onOpen('contact') },
      ],
    },
    {
      id: 'help', label: 'Help',
      items: [
        { label: 'Portfolio Help', action: () => onHelp(), shortcut: '⌘?' },
        { sep: true },
        { label: 'Send Feedback', action: () => onFeedback() },
        { sep: true },
        { label: 'About Portfolio', action: () => onOpen('about') },
      ],
    },
  ]

  const handleItemClick = (item: MenuItem) => {
    if (item.disabled || !item.action) return
    item.action()
    setActiveMenu(null)
  }

  // Theme-aware menu bar colours
  const barBg      = isDark ? 'rgba(0,0,0,0.55)'       : 'rgba(220,220,228,0.88)'
  const barBorder  = isDark ? 'rgba(255,255,255,0.10)'  : 'rgba(0,0,0,0.10)'
  const textColor  = isDark ? 'white'                    : 'rgba(20,20,22,0.90)'
  const hoverBg    = isDark ? 'rgba(255,255,255,0.14)'   : 'rgba(0,0,0,0.10)'
  const dropBg     = isDark ? 'rgba(30,30,32,0.97)'     : 'rgba(250,250,252,0.98)'
  const dropBorder = isDark ? 'rgba(255,255,255,0.13)'  : 'rgba(0,0,0,0.12)'
  const sepColor   = isDark ? 'rgba(255,255,255,0.10)'  : 'rgba(0,0,0,0.08)'
  const itemActive = isDark ? 'rgba(255,255,255,0.88)'  : 'rgba(20,20,22,0.90)'
  const itemDim    = isDark ? 'rgba(255,255,255,0.28)'  : 'rgba(0,0,0,0.28)'
  const itemHover  = isDark ? 'rgba(99,160,255,0.22)'   : 'rgba(99,160,255,0.18)'

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 28,
        zIndex: 9999, display: 'flex', alignItems: 'center',
        padding: '0 12px', gap: 2,
        fontSize: 13, userSelect: 'none',
        background: barBg, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${barBorder}`,
        color: textColor,
      }}
    >
      {/* Logo */}
      <span style={{
        padding: '2px 8px', borderRadius: 4,
        cursor: 'default', transition: 'background 0.15s',
        display: 'flex', alignItems: 'center',
      }}
        onMouseEnter={e => (e.currentTarget.style.background = hoverBg)}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        <img
          src={logoSrc}
          alt="Logo"
          style={{
            width: 20, height: 20,
            filter: isDark ? 'invert(1)' : 'invert(0)',
          }}
        />
      </span>
      <span style={{
        fontWeight: 600, padding: '2px 8px', borderRadius: 4,
        cursor: 'default', transition: 'background 0.15s',
      }}
        onMouseEnter={e => (e.currentTarget.style.background = hoverBg)}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >Portfolio</span>

      {/* Menus */}
      {MENUS.map(menu => (
        <div key={menu.id} style={{ position: 'relative' }}>
          <span
            style={{
              cursor: 'default', padding: '2px 8px', borderRadius: 4,
              transition: 'background 0.1s',
              background: activeMenu === menu.id ? hoverBg : 'transparent',
              opacity: activeMenu !== null && activeMenu !== menu.id ? 0.75 : 1,
            }}
            onMouseDown={e => { e.stopPropagation(); setActiveMenu(activeMenu === menu.id ? null : menu.id) }}
            onMouseEnter={() => activeMenu !== null && setActiveMenu(menu.id)}
          >
            {menu.label}
          </span>

          {activeMenu === menu.id && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 1px)', left: 0, minWidth: 200, zIndex: 10000,
              background: dropBg, backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
              border: `1px solid ${dropBorder}`, borderRadius: 10, padding: '4px 0',
              boxShadow: isDark
                ? '0 16px 60px rgba(0,0,0,0.7)'
                : '0 8px 36px rgba(0,0,0,0.18)',
              color: textColor,
            }}>
              {menu.items.map((item, i) =>
                item.sep ? (
                  <div key={i} style={{ margin: '3px 8px', borderTop: `1px solid ${sepColor}` }} />
                ) : (
                  <div
                    key={i}
                    onMouseDown={() => handleItemClick(item)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '5px 12px', margin: '0 3px', borderRadius: 6,
                      fontSize: 13,
                      color: item.disabled ? itemDim : itemActive,
                      cursor: item.disabled ? 'default' : 'pointer',
                      transition: 'background 0.08s',
                    }}
                    onMouseEnter={e => { if (!item.disabled) (e.currentTarget as HTMLDivElement).style.background = itemHover }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}
                  >
                    <span>{item.label}</span>
                    {item.shortcut && (
                      <span style={{ fontSize: 12, opacity: 0.4, marginLeft: 32 }}>{item.shortcut}</span>
                    )}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      ))}

      {/* Right side */}
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center', fontSize: 12 }}>
        {isPlaying && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, opacity: 0.65, marginRight: 4 }}>
            <span style={{ display: 'inline-flex', gap: 2, alignItems: 'flex-end', height: 12 }}>
              {([1, 2, 3] as const).map(i => (
                <span key={i} style={{
                  display: 'inline-block', width: 2, borderRadius: 1,
                  background: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)',
                  animation: `barBounce${i} 0.7s ease-in-out infinite alternate`,
                  height: `${[8, 12, 6][i - 1]}px`,
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
            background: ccOpen ? hoverBg : 'transparent',
            border: 'none', borderRadius: 5, cursor: 'pointer',
            padding: '2px 5px', display: 'flex', alignItems: 'center',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => { if (!ccOpen) e.currentTarget.style.background = hoverBg }}
          onMouseLeave={e => { if (!ccOpen) e.currentTarget.style.background = 'transparent' }}
        >
          <svg width="16" height="12" viewBox="0 0 16 12" fill={isDark ? 'white' : 'rgba(20,20,22,0.75)'} opacity="0.9">
            <rect x="0" y="0" width="6" height="5" rx="1.5" opacity="0.9" />
            <rect x="10" y="0" width="6" height="5" rx="1.5" opacity="0.5" />
            <rect x="0" y="7" width="6" height="5" rx="1.5" opacity="0.5" />
            <rect x="10" y="7" width="6" height="5" rx="1.5" opacity="0.9" />
          </svg>
        </button>
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{time}</span>
      </div>
    </div>
  )
}
