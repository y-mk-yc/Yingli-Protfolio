import { useRef, useState, useEffect, useCallback } from 'react'
import { useTheme } from '../context/ThemeContext'

interface Props {
  id: string
  title: string
  children: React.ReactNode
  initialPos: { x: number; y: number }
  initialSize: { w: number; h: number }
  isOpen: boolean
  onClose: (id: string) => void
  zIndex: number
  onFocus: (id: string) => void
}

export default function Window({
  id, title, children,
  initialPos, initialSize,
  isOpen, onClose, zIndex, onFocus,
}: Props) {
  const { theme } = useTheme()
  const isDark = theme !== 'light'

  const winRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(initialPos)
  const [size, setSize] = useState(initialSize)
  const [closing, setClosing] = useState(false)
  const [maximized, setMaximized] = useState(false)
  const dragging = useRef(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const resizing = useRef(false)
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 })
  const savedState = useRef({ pos: initialPos, size: initialSize })

  // Theme-aware colours
  const windowBg    = isDark ? 'rgba(28,28,30,0.93)'    : 'rgba(248,248,252,0.97)'
  const titlebarBg  = isDark ? 'rgba(40,40,44,0.6)'     : 'rgba(236,236,240,0.9)'
  const titlebarBdr = isDark ? 'rgba(255,255,255,0.08)'  : 'rgba(0,0,0,0.08)'
  const borderClr   = isDark ? 'rgba(255,255,255,0.14)'  : 'rgba(0,0,0,0.10)'
  const titleText   = isDark ? 'rgba(255,255,255,0.82)'  : 'rgba(20,20,22,0.80)'
  const scrollThumb = isDark ? 'rgba(255,255,255,0.15)'  : 'rgba(0,0,0,0.15)'
  const resizeClr   = isDark ? 'rgba(255,255,255,0.20)'  : 'rgba(0,0,0,0.18)'
  const contentClr  = isDark ? 'rgba(255,255,255,0.88)'  : 'rgba(20,20,22,0.88)'

  const handleClose = () => {
    setMaximized(false)
    setClosing(true)
    setTimeout(() => { setClosing(false); onClose(id) }, 180)
  }

  const handleMaximize = () => {
    if (!maximized) {
      savedState.current = { pos, size }
      setMaximized(true)
    } else {
      setMaximized(false)
      setPos(savedState.current.pos)
      setSize(savedState.current.size)
    }
    onFocus(id)
  }

  const onTitleMouseDown = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.dataset.btn) return
    if (maximized) return
    dragging.current = true
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y }
    onFocus(id)
    e.preventDefault()
  }, [pos, id, onFocus, maximized])

  const onResizeMouseDown = useCallback((e: React.MouseEvent) => {
    if (maximized) return
    resizing.current = true
    resizeStart.current = { x: e.clientX, y: e.clientY, w: size.w, h: size.h }
    e.preventDefault()
    e.stopPropagation()
  }, [size, maximized])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dragging.current) {
        let nx = e.clientX - dragOffset.current.x
        let ny = e.clientY - dragOffset.current.y
        nx = Math.max(0, Math.min(nx, window.innerWidth - (winRef.current?.offsetWidth || 400)))
        ny = Math.max(28, Math.min(ny, window.innerHeight - 60))
        setPos({ x: nx, y: ny })
      }
      if (resizing.current) {
        const nw = Math.max(340, resizeStart.current.w + (e.clientX - resizeStart.current.x))
        const nh = Math.max(260, resizeStart.current.h + (e.clientY - resizeStart.current.y))
        setSize({ w: nw, h: nh })
      }
    }
    const onUp = () => { dragging.current = false; resizing.current = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [])

  if (!isOpen && !closing) return null

  const maxStyle = maximized ? {
    left: 0, top: 28,
    width: '100vw',
    height: 'calc(100vh - 28px - 72px)',
    borderRadius: 0,
    transition: 'left 0.22s, top 0.22s, width 0.22s, height 0.22s, border-radius 0.22s',
  } : {
    left: pos.x, top: pos.y,
    width: size.w, height: size.h,
    transition: 'none',
  }

  return (
    <div
      ref={winRef}
      onMouseDown={() => onFocus(id)}
      style={{
        ...maxStyle,
        zIndex,
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: maximized ? 0 : 14,
        background: windowBg,
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        border: `1px solid ${borderClr}`,
        boxShadow: isDark
          ? '0 24px 80px rgba(0,0,0,0.65), 0 1px 0 rgba(255,255,255,0.06) inset'
          : '0 12px 48px rgba(0,0,0,0.18), 0 1px 0 rgba(255,255,255,0.7) inset',
        opacity: closing ? 0 : 1,
        transform: closing ? 'scale(0.9)' : 'scale(1)',
        ...(closing ? { transition: 'opacity 0.18s, transform 0.18s' } : {}),
      }}
      className="animate-window-open"
    >
      {/* Title bar */}
      <div
        onMouseDown={onTitleMouseDown}
        style={{
          height: 44,
          display: 'flex', alignItems: 'center',
          padding: '0 14px', gap: 8, flexShrink: 0,
          borderBottom: `1px solid ${titlebarBdr}`,
          background: titlebarBg,
          backdropFilter: 'blur(8px)',
          cursor: maximized ? 'default' : 'grab',
          userSelect: 'none',
        }}
      >
        {/* Red – close */}
        <button
          data-btn="close"
          onClick={handleClose}
          style={{
            width: 14, height: 14, borderRadius: '50%',
            background: '#ff5f57', border: 'none', cursor: 'pointer', flexShrink: 0,
            transition: 'filter 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.2)')}
          onMouseLeave={e => (e.currentTarget.style.filter = 'none')}
        />
        {/* Yellow – maximize */}
        <button
          data-btn="max"
          onClick={handleMaximize}
          title={maximized ? 'Restore' : 'Maximise'}
          style={{
            width: 14, height: 14, borderRadius: '50%',
            background: '#febc2e', border: 'none', cursor: 'pointer', flexShrink: 0,
            transition: 'filter 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.2)')}
          onMouseLeave={e => (e.currentTarget.style.filter = 'none')}
        />
        {/* Green */}
        <button
          data-btn="fs"
          onClick={handleMaximize}
          style={{
            width: 14, height: 14, borderRadius: '50%',
            background: '#2ac840', border: 'none', cursor: 'pointer', flexShrink: 0,
            transition: 'filter 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.2)')}
          onMouseLeave={e => (e.currentTarget.style.filter = 'none')}
        />

        <span style={{
          flex: 1, textAlign: 'center',
          fontSize: 13, fontWeight: 500,
          color: titleText, marginRight: 32,
        }}>
          {title}
        </span>
      </div>

      {/* Content */}
      <div
        className="mac-scroll"
        style={{
          flex: 1, overflowY: 'auto', overflowX: 'hidden',
          padding: 24,
          color: contentClr,
          '--scrollbar-thumb': scrollThumb,
        } as React.CSSProperties}
      >
        {children}
      </div>

      {/* Resize handle */}
      {!maximized && (
        <div
          onMouseDown={onResizeMouseDown}
          style={{
            position: 'absolute', right: 0, bottom: 0,
            width: 16, height: 16,
            cursor: 'se-resize', zIndex: 10,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10"
            style={{ position: 'absolute', right: 3, bottom: 3 }}>
            <line x1="2" y1="10" x2="10" y2="2" stroke={resizeClr} strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="6" y1="10" x2="10" y2="6" stroke={resizeClr} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      )}
    </div>
  )
}
