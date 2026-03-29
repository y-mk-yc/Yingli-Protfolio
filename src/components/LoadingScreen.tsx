import { useEffect, useState } from 'react'
import logoSrc from '../assets/logo.svg'

interface Props {
  onDone: () => void
}

export default function LoadingScreen({ onDone }: Props) {
  const [phase, setPhase] = useState<'in' | 'loaded' | 'out'>('in')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('loaded'), 300)
    const t2 = setTimeout(() => setPhase('out'), 2800)
    const t3 = setTimeout(onDone, 3400)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onDone])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: '#000',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: phase === 'out' ? 0 : 1,
      transition: 'opacity 0.6s ease-in-out',
    }}>
      {/* Logo */}
      <img
        src={logoSrc}
        alt="Logo"
        style={{
          width: 80, height: 80,
          filter: 'invert(1)',
          marginBottom: 64,
        }}
      />

      {/* Progress bar — exact macOS style */}
      <div style={{
        width: 200, height: 4, borderRadius: 2,
        background: 'rgba(255,255,255,0.15)',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          background: 'rgba(255,255,255,0.85)',
          borderRadius: 2,
          width: phase === 'loaded' ? '100%' : '0%',
          transition: 'width 2.2s cubic-bezier(0.4, 0, 0.2, 1)',
        }} />
      </div>
    </div>
  )
}
