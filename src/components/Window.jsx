import { useRef, useState, useEffect, useCallback } from 'react'

export default function Window({
  id, title, children,
  initialPos, initialSize,
  isOpen, onClose, zIndex, onFocus
}) {
  const winRef   = useRef(null)
  const [pos,    setPos]    = useState(initialPos)
  const [size,   setSize]   = useState(initialSize)
  const [closing,  setClosing]   = useState(false)
  const [maximized,setMaximized] = useState(false)
  const dragging     = useRef(false)
  const dragOffset   = useRef({ x: 0, y: 0 })
  const resizing     = useRef(false)
  const resizeStart  = useRef({ x: 0, y: 0, w: 0, h: 0 })
  // Save pre-maximise state so we can restore it
  const savedState   = useRef({ pos: initialPos, size: initialSize })

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

  const onTitleMouseDown = useCallback((e) => {
    if (e.target.dataset.btn) return
    if (maximized) return          // can't drag a maximised window
    dragging.current = true
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y }
    onFocus(id)
    e.preventDefault()
  }, [pos, id, onFocus, maximized])

  const onResizeMouseDown = useCallback((e) => {
    if (maximized) return
    resizing.current = true
    resizeStart.current = { x: e.clientX, y: e.clientY, w: size.w, h: size.h }
    e.preventDefault()
    e.stopPropagation()
  }, [size, maximized])

  useEffect(() => {
    const onMove = (e) => {
      if (dragging.current) {
        let nx = e.clientX - dragOffset.current.x
        let ny = e.clientY - dragOffset.current.y
        nx = Math.max(0, Math.min(nx, window.innerWidth  - (winRef.current?.offsetWidth  || 400)))
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
    window.addEventListener('mouseup',   onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [])

  if (!isOpen && !closing) return null

  // Maximised geometry: full width, from below menu bar to just above dock
  const maxStyle = maximized ? {
    left: 0, top: 28,
    width:  '100vw',
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
        opacity:   closing ? 0 : 1,
        transform: closing ? 'scale(0.9)' : 'scale(1)',
        ...(closing ? { transition: 'opacity 0.18s, transform 0.18s' } : {}),
      }}
      className="fixed flex flex-col overflow-hidden rounded-2xl
                 bg-[rgba(28,28,30,0.92)] backdrop-blur-2xl
                 border border-white/15 animate-window-open
                 shadow-[0_24px_80px_rgba(0,0,0,0.7)]"
    >
      {/* Title bar */}
      <div
        onMouseDown={onTitleMouseDown}
        className="h-11 flex items-center px-3.5 gap-2 flex-shrink-0
                   border-b border-white/8 select-none"
        style={{ cursor: maximized ? 'default' : 'grab' }}
      >
        {/* Red – close */}
        <button data-btn="close" onClick={handleClose}
          className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] border-none cursor-pointer
                     hover:brightness-125 transition-all flex-shrink-0" />

        {/* Yellow – maximize / restore */}
        <button
          data-btn="max"
          onClick={handleMaximize}
          title={maximized ? 'Restore' : 'Maximise'}
          className="w-3.5 h-3.5 rounded-full bg-[#febc2e] border-none cursor-pointer
                     hover:brightness-125 transition-all flex-shrink-0"
        />

        {/* Green – full-screen (decorative, same action) */}
        <button
          data-btn="fs"
          onClick={handleMaximize}
          className="w-3.5 h-3.5 rounded-full bg-[#2ac840] border-none cursor-pointer
                     hover:brightness-125 transition-all flex-shrink-0"
        />

        <span className="flex-1 text-center text-[13px] font-medium text-white/85 mr-8">
          {title}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 text-white/88 mac-scroll">
        {children}
      </div>

      {/* Resize handle (hidden when maximised) */}
      {!maximized && (
        <div
          onMouseDown={onResizeMouseDown}
          className="absolute right-0 bottom-0 w-4 h-4 cursor-se-resize z-10
                     after:content-[''] after:absolute after:right-1 after:bottom-1
                     after:w-2 after:h-2 after:border-r-2 after:border-b-2
                     after:border-white/20 after:rounded-br"
        />
      )}
    </div>
  )
}
