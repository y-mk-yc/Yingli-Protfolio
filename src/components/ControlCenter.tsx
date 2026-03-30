import { useState, useRef, useCallback, useEffect } from 'react'
import { Theme } from '../context/ThemeContext'

interface AudioControls
{
  isPlaying: boolean
  volume: number
  currentTime: number
  duration: number
  canPlay: boolean
  setVolume: (v: number) => void
  toggle: () => void
  seek: (t: number) => void
}

interface Props
{
  show: boolean
  onClose: () => void
  audioControls: AudioControls
  theme: Theme
  onThemeChange?: (t: Theme) => void
}

function Tile({ icon, label, active, onToggle, wide }: {
  icon: string; label: string; active: boolean; onToggle: () => void; wide?: boolean
})
{
  return (
    <div onClick={onToggle} style={{
      background: active ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.1)',
      border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12,
      padding: wide ? '10px 14px' : '10px 12px', cursor: 'pointer', userSelect: 'none',
      transition: 'background 0.18s', display: 'flex',
      flexDirection: wide ? 'row' : 'column',
      alignItems: wide ? 'center' : 'flex-start', gap: wide ? 8 : 4,
      flex: wide ? 1 : undefined,
    }}>
      <span style={{ fontSize: 18, lineHeight: 1, filter: active ? 'none' : 'brightness(2)' }}>{icon}</span>
      <span style={{ fontSize: 10.5, fontWeight: 600, color: active ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.75)', lineHeight: 1.2 }}>
        {label}
      </span>
    </div>
  )
}

function Slider({ value, onChange, icon, color = '#63a0ff' }: {
  value: number; onChange: (v: number) => void; icon: string; color?: string
})
{
  const trackRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const getValueFromEvent = useCallback((e: MouseEvent) =>
  {
    const track = trackRef.current
    if (!track) return value
    const rect = track.getBoundingClientRect()
    return Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
  }, [value])

  const onMouseDown = (e: React.MouseEvent) =>
  {
    dragging.current = true
    onChange(getValueFromEvent(e.nativeEvent))
    e.preventDefault()
  }

  useEffect(() =>
  {
    const onMove = (e: MouseEvent) => { if (dragging.current) onChange(getValueFromEvent(e)) }
    const onUp = () => { dragging.current = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [getValueFromEvent, onChange])

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 15, flexShrink: 0, opacity: 0.8 }}>{icon}</span>
      <div ref={trackRef} onMouseDown={onMouseDown} style={{
        flex: 1, height: 5, borderRadius: 99,
        background: 'rgba(255,255,255,0.12)', cursor: 'ew-resize', position: 'relative',
      }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${value * 100}%`, borderRadius: 99, background: color, pointerEvents: 'none' }} />
        <div style={{
          position: 'absolute', top: '50%', left: `${value * 100}%`,
          transform: 'translate(-50%, -50%)',
          width: 14, height: 14, borderRadius: '50%', background: 'white',
          boxShadow: '0 1px 4px rgba(0,0,0,0.5)', pointerEvents: 'none',
        }} />
      </div>
      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)', width: 24, textAlign: 'right' }}>
        {Math.round(value * 100)}
      </span>
    </div>
  )
}

function ProgressBar({ current, duration, onSeek }: { current: number; duration: number; onSeek: (t: number) => void })
{
  const trackRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const getTime = useCallback((e: MouseEvent) =>
  {
    const track = trackRef.current
    if (!track || !duration) return 0
    const rect = track.getBoundingClientRect()
    return Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * duration
  }, [duration])

  const onMouseDown = (e: React.MouseEvent) =>
  {
    dragging.current = true
    onSeek(getTime(e.nativeEvent))
    e.preventDefault()
  }

  useEffect(() =>
  {
    const onMove = (e: MouseEvent) => { if (dragging.current) onSeek(getTime(e)) }
    const onUp = () => { dragging.current = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [getTime, onSeek])

  const pct = duration ? (current / duration) * 100 : 0
  const fmt = (s: number) =>
  {
    if (!s || isNaN(s)) return '0:00'
    return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`
  }

  return (
    <div>
      <div ref={trackRef} onMouseDown={onMouseDown}
        style={{ height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.15)', cursor: 'pointer', position: 'relative', margin: '2px 0 4px' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${pct}%`, borderRadius: 99, background: 'rgba(255,255,255,0.85)' }} />
        <div style={{ position: 'absolute', top: '50%', left: `${pct}%`, transform: 'translate(-50%,-50%)', width: 10, height: 10, borderRadius: '50%', background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.4)' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, color: 'rgba(255,255,255,0.38)' }}>
        <span>{fmt(current)}</span><span>{fmt(duration)}</span>
      </div>
    </div>
  )
}

export default function ControlCenter({ show, onClose, audioControls, theme, onThemeChange }: Props)
{
  const [wifi, setWifi] = useState(true)
  const [bluetooth, setBluetooth] = useState(true)
  const [airdrop, setAirdrop] = useState(false)
  const [doNotDist, setDoNotDist] = useState(false)
  const [airplay, setAirplay] = useState(false)
  const [brightness, setBrightness] = useState(0.85)

  const { isPlaying, volume, currentTime, duration, setVolume, toggle, seek, canPlay } = audioControls

  useEffect(() =>
  {
    if (!show) return
    const handler = (e: MouseEvent) =>
    {
      const target = e.target as Element
      if (!target.closest('[data-cc]')) onClose()
    }
    setTimeout(() => document.addEventListener('mousedown', handler), 0)
    return () => document.removeEventListener('mousedown', handler)
  }, [show, onClose])

  if (!show) return null

  return (
    <div data-cc="1" style={{
      position: 'fixed', top: 36, right: 12, width: 262, zIndex: 9997,
      background: 'rgba(22,18,38,0.88)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
      border: '1px solid rgba(255,255,255,0.14)', borderRadius: 18, padding: '14px 14px 16px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.06) inset',
      color: 'white', fontFamily: '-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif',
      display: 'flex', flexDirection: 'column', gap: 12,
      animation: 'ccOpen 0.2s cubic-bezier(0.34,1.4,0.64,1)',
    }}>
      {/* Network 2×2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <Tile icon="📶" label="Wi-Fi" active={wifi} onToggle={() => setWifi(v => !v)} />
        <Tile icon="🔵" label="Bluetooth" active={bluetooth} onToggle={() => setBluetooth(v => !v)} />
        <Tile icon="🔁" label="AirDrop" active={airdrop} onToggle={() => setAirdrop(v => !v)} />
        <Tile icon="🎯" label="Focus" active={doNotDist} onToggle={() => setDoNotDist(v => !v)} />
      </div>

      {/* Wide tiles */}
      <div style={{ display: 'flex', gap: 8 }}>
        <Tile icon="📺" label="AirPlay" active={airplay} onToggle={() => setAirplay(v => !v)} wide />
        <Tile icon="🪞" label="Mirror" active={false} onToggle={() => { }} wide />
      </div>

      {/* Theme switcher */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {([
          { id: 'dark' as Theme, icon: '🌙', label: 'Dark' },
          { id: 'light' as Theme, icon: '☀️', label: 'Light' },
        ]).map(t => (
          <Tile key={t.id} icon={t.icon} label={t.label}
            active={theme === t.id}
            onToggle={() => onThemeChange?.(t.id)} />
        ))}
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />

      {/* Music player */}
      <div style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '10px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ width: 42, height: 42, borderRadius: 8, flexShrink: 0, background: 'linear-gradient(135deg,#1e3a5f,#2d1b5a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>🎵</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Cornfield Chase</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 1 }}>Hans Zimmer</div>
          </div>
        </div>

        <ProgressBar current={currentTime} duration={duration} onSeek={seek} />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 22, marginTop: 10 }}>
          <button onClick={() => seek(0)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'rgba(255,255,255,0.75)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" /></svg>
          </button>
          <button onClick={toggle} style={{
            width: 38, height: 38, borderRadius: '50%',
            background: canPlay ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.25)',
            border: 'none', cursor: canPlay ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#111', boxShadow: '0 2px 8px rgba(0,0,0,0.4)', transition: 'transform 0.1s',
          }}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.9)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6zm8-14v14h4V5z" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            )}
          </button>
          <button onClick={() => seek(duration || 0)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'rgba(255,255,255,0.75)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zm2.5-6 5.5 4V8z M16 6h2v12h-2z" /></svg>
          </button>
        </div>
      </div>

      <Slider value={volume} onChange={setVolume} icon={volume === 0 ? '🔇' : volume < 0.4 ? '🔈' : volume < 0.8 ? '🔉' : '🔊'} color="#a78bfa" />
      <Slider value={brightness} onChange={setBrightness} icon="☀️" color="#febc2e" />

      {!canPlay && (
        <div style={{ background: 'rgba(254,188,46,0.1)', border: '1px solid rgba(254,188,46,0.25)', borderRadius: 8, padding: '7px 10px', fontSize: 10.5, color: 'rgba(254,188,46,0.9)', lineHeight: 1.5 }}>
          ⚠️ <strong>.mgg</strong> format not supported. Rename to <strong>.ogg</strong> or convert to <strong>.mp3</strong>.
        </div>
      )}
    </div>
  )
}
