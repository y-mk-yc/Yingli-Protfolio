import { useEffect, useState } from 'react'

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
      {/* Apple logo SVG — white on black */}
      <svg
        width="80" height="80"
        viewBox="0 0 814 1000"
        fill="white"
        style={{ marginBottom: 64 }}
      >
        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 376.7 0 248.2 0 125.8 0 56.3 27.3 -3.9 75.1 -44.1c36-32.2 83.5-51.6 133.1-51.6 49 0 88.9 20.7 119.3 20.7 29.5 0 75.8-21.9 133.8-21.9 21.4 0 108.2 1.9 166.3 81.4zm-107.4-102.3c24.4-29 41.5-69.3 41.5-109.7 0-5.1-.6-10.8-1.9-15.3-39.5 1.3-87.5 26.3-116.1 59.2-22.1 24.4-42.8 64.8-42.8 105.8 0 5.8.6 11.5 1.3 13.4 2.5.6 6.4 1.3 10.3 1.3 35.4 0 80.5-23.8 107.7-54.7z"/>
      </svg>

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
