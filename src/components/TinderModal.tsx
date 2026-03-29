import { useState } from 'react'
import tinderImg from '../assets/tinder_256x256x32.png'

interface Swipe { name: string; emoji: string; reason: string }

const SWIPES: Swipe[] = [
  { name: 'Neural Network',   emoji: '🤖', reason: '"Too unpredictable. Also has no money."' },
  { name: 'Blockchain Bro',   emoji: '⛓',  reason: '"Talks about crypto 24/7. No thanks."' },
  { name: 'Tech Recruiter',   emoji: '📱', reason: '"Offered equity instead of salary. Swiped left."' },
  { name: 'Open Source Dev',  emoji: '💻', reason: '"Works for free. Disqualified."' },
  { name: 'Startup Founder',  emoji: '🚀', reason: '"Burn rate too high. Revenue: $0."' },
  { name: 'PM with no specs', emoji: '📋', reason: '"Said \'just make it pop\'. Immediate left."' },
]

interface Props { onClose: () => void }

export default function TinderModal({ onClose }: Props) {
  const [cardIdx, setCardIdx] = useState(0)
  const [swiping, setSwiping] = useState<'left' | 'right' | null>(null)

  const triggerSwipe = (dir: 'left' | 'right') => {
    setSwiping(dir)
    setTimeout(() => {
      setSwiping(null)
      setCardIdx(i => (i < SWIPES.length - 1 ? i + 1 : 0))
    }, 500)
  }

  const card = SWIPES[cardIdx]

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99998,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onMouseDown={onClose}>
      <div onMouseDown={e => e.stopPropagation()} style={{
        background: 'rgba(28,28,32,0.97)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
        border: '1px solid rgba(255,255,255,0.15)', borderRadius: 20,
        width: 380, maxWidth: '92vw',
        boxShadow: '0 32px 80px rgba(0,0,0,0.8)', color: 'white',
        fontFamily: '-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif', overflow: 'hidden',
      }}>
        {/* Title bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '14px 20px 12px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: 'linear-gradient(135deg, rgba(253,75,64,0.2), rgba(255,129,0,0.1))',
        }}>
          <button onClick={onClose} style={{ width: 14, height: 14, borderRadius: '50%', background: '#ff5f57', border: 'none', cursor: 'pointer', flexShrink: 0 }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#febc2e', flexShrink: 0 }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#2ac840', flexShrink: 0 }} />
          <img src={tinderImg} alt="Tinder" style={{ width: 18, height: 18, marginLeft: 8, borderRadius: 4 }} />
          <span style={{ fontWeight: 600, fontSize: 14, color: 'rgba(255,255,255,0.9)' }}>Tinder — Yingli Edition</span>
        </div>

        <div style={{ padding: '24px 28px', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>💸</div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>
            Sorry, Yingli is only interested in <span style={{ color: '#febc2e' }}>money</span>,<br />not homo sapiens.
          </div>
          <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.42)', marginBottom: 24 }}>
            Please bring a competitive offer. Equity vests in 4 years.
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginBottom: 20 }} />
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>
            Meanwhile, Yingli swipes on...
          </div>

          <div style={{ position: 'relative', height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 16, padding: '16px 24px', width: '90%', textAlign: 'center',
              transform: swiping === 'left'
                ? 'rotate(-25deg) translateX(-180px)'
                : swiping === 'right'
                ? 'rotate(25deg) translateX(180px)'
                : 'rotate(0deg)',
              opacity: swiping ? 0 : 1,
              transition: 'transform 0.45s ease, opacity 0.45s ease',
            }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>{card.emoji}</div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{card.name}</div>
              <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.45)', fontStyle: 'italic' }}>{card.reason}</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 12 }}>
            <button onClick={() => triggerSwipe('left')} style={{
              width: 52, height: 52, borderRadius: '50%',
              background: 'rgba(255,80,80,0.15)', border: '2px solid rgba(255,80,80,0.4)',
              fontSize: 22, cursor: 'pointer', transition: 'transform 0.15s, background 0.15s',
              color: 'white',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,80,80,0.28)'; e.currentTarget.style.transform = 'scale(1.1)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,80,80,0.15)'; e.currentTarget.style.transform = 'scale(1)' }}
            >✕</button>
            <button onClick={() => triggerSwipe('right')} style={{
              width: 52, height: 52, borderRadius: '50%',
              background: 'rgba(80,255,120,0.15)', border: '2px solid rgba(80,255,120,0.4)',
              fontSize: 22, cursor: 'pointer', transition: 'transform 0.15s, background 0.15s',
              color: 'white',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(80,255,120,0.28)'; e.currentTarget.style.transform = 'scale(1.1)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(80,255,120,0.15)'; e.currentTarget.style.transform = 'scale(1)' }}
            >💚</button>
          </div>
          <div style={{ marginTop: 16, fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>(Hint: it always swipes left)</div>
        </div>
      </div>
    </div>
  )
}
