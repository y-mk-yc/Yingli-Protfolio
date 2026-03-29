import { useEffect, useState } from 'react'

interface Props {
  onDone: () => void
}

export default function LoadingScreen({ onDone }: Props) {
  const [phase, setPhase] = useState<'in' | 'loaded' | 'out'>('in')

  useEffect(() => {
    // Short delay then show progress
    const t1 = setTimeout(() => setPhase('loaded'), 200)
    // Start fade out
    const t2 = setTimeout(() => setPhase('out'), 2600)
    // Tell parent we're done
    const t3 = setTimeout(onDone, 3200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onDone])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: 'linear-gradient(160deg, #100820 0%, #0b0f2a 60%, #060818 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      opacity: phase === 'out' ? 0 : 1,
      transition: 'opacity 0.6s ease-in-out',
    }}>
      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(99,80,200,0.18) 0%, transparent 70%)',
      }} />

      {/* Logo mark */}
      <div style={{
        width: 88, height: 88, borderRadius: 22,
        background: 'linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))',
        border: '1px solid rgba(255,255,255,0.14)',
        backdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 48,
        boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 60px rgba(99,80,200,0.2)',
        marginBottom: 48,
        animation: 'logoFloat 3s ease-in-out infinite',
      }}>
        👩‍💻
      </div>

      {/* Name */}
      <div style={{
        fontSize: 22, fontWeight: 700, color: 'rgba(255,255,255,0.92)',
        letterSpacing: '-0.3px', marginBottom: 4,
      }}>
        Yingli Duan
      </div>
      <div style={{
        fontSize: 13, color: 'rgba(255,255,255,0.38)',
        letterSpacing: '0.3px', marginBottom: 48,
      }}>
        Fullstack Software Engineer
      </div>

      {/* Progress bar */}
      <div style={{
        width: 180, height: 3, borderRadius: 2,
        background: 'rgba(255,255,255,0.1)',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          background: 'linear-gradient(90deg, #6350c8, #a78bfa)',
          borderRadius: 2,
          width: phase === 'loaded' ? '100%' : '0%',
          transition: 'width 2.0s cubic-bezier(0.4, 0, 0.2, 1)',
        }} />
      </div>

      {/* Bottom hint */}
      <div style={{
        position: 'absolute', bottom: 36,
        fontSize: 11, color: 'rgba(255,255,255,0.2)',
        letterSpacing: '0.5px',
      }}>
        macOS-style portfolio · React + TypeScript
      </div>
    </div>
  )
}
