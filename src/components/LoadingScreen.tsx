import { useEffect, useState } from 'react'
import logoSrc from '../assets/logo.svg'

interface Props
{
  onDone: () => void
}

export default function LoadingScreen({ onDone }: Props)
{
  const [phase, setPhase] = useState<'loading' | 'ready' | 'out'>('loading')

  useEffect(() =>
  {
    let pageReady = false
    let minTimeDone = false

    const finish = () =>
    {
      if (!pageReady || !minTimeDone) return
      setPhase('ready')
      setTimeout(() => setPhase('out'), 400)
      setTimeout(onDone, 1000)
    }

    // Minimum display time so the bar has room to animate
    const minTimer = setTimeout(() => { minTimeDone = true; finish() }, 1400)

    // Fire when all resources (images, fonts, scripts) are fully loaded
    if (document.readyState === 'complete')
    {
      pageReady = true
      finish()
    } else
    {
      const onLoad = () => { pageReady = true; finish() }
      window.addEventListener('load', onLoad)
      return () => { clearTimeout(minTimer); window.removeEventListener('load', onLoad) }
    }

    return () => clearTimeout(minTimer)
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
          width: 200, height: 200,
          filter: 'invert(1)',
          marginBottom: 32,
        }}
      />

      {/* Progress bar — fills to 80% while loading, snaps to 100% when ready */}
      <div style={{
        width: 200, height: 4, borderRadius: 2,
        background: 'rgba(255,255,255,0.15)',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          background: 'rgba(255,255,255,0.85)',
          borderRadius: 2,
          width: phase === 'ready' || phase === 'out' ? '100%' : '60%',
          transition: phase === 'loading'
            ? 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
            : 'width 0.25s ease-out',
        }} />
      </div>
    </div>
  )
}
