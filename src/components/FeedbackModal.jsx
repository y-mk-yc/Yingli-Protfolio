import { useState } from 'react'

const STORAGE_KEY = 'portfolio_feedback'

export default function FeedbackModal({ onClose }) {
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent]       = useState(false)

  if (!onClose) return null

  const handleSubmit = e => {
    e.preventDefault()
    if (!message.trim()) return

    const entry = {
      name:      name.trim() || 'Anonymous',
      email:     email.trim(),
      message:   message.trim(),
      timestamp: Date.now(),
    }

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...existing]))

    setSent(true)
    setTimeout(onClose, 2200)
  }

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.14)',
    borderRadius: 8, padding: '9px 12px',
    color: 'white', fontSize: 13,
    fontFamily: 'inherit', outline: 'none',
    transition: 'border-color 0.15s',
    boxSizing: 'border-box',
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 99998,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onMouseDown={onClose}
    >
      <div
        style={{
          background: 'rgba(28,28,32,0.97)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 18,
          width: 420, maxWidth: '92vw',
          boxShadow: '0 32px 80px rgba(0,0,0,0.8)',
          color: 'white',
          fontFamily: '-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif',
          overflow: 'hidden',
        }}
        onMouseDown={e => e.stopPropagation()}
      >
        {/* Title bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '14px 20px 12px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <button
            onClick={onClose}
            style={{ width: 14, height: 14, borderRadius: '50%', background: '#ff5f57', border: 'none', cursor: 'pointer', flexShrink: 0 }}
          />
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#febc2e', flexShrink: 0 }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#2ac840', flexShrink: 0 }} />
          <span style={{ marginLeft: 8, fontWeight: 600, fontSize: 14, color: 'rgba(255,255,255,0.88)' }}>
            Send Feedback
          </span>
        </div>

        {sent ? (
          <div style={{ padding: '36px 28px', textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
            <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 6 }}>Thanks for the feedback!</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Your message has been saved.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ padding: '22px 28px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginBottom: 18, lineHeight: 1.55 }}>
                Got a thought, suggestion, or just want to say hi? Leave a message below.
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 11.5, color: 'rgba(255,255,255,0.42)', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Name (optional)
                </label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(99,160,255,0.55)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.14)'}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 11.5, color: 'rgba(255,255,255,0.42)', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Email (optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(99,160,255,0.55)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.14)'}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11.5, color: 'rgba(255,255,255,0.42)', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Message *
              </label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Write your feedback here..."
                rows={4}
                required
                style={{ ...inputStyle, resize: 'vertical', minHeight: 90 }}
                onFocus={e => e.target.style.borderColor = 'rgba(99,160,255,0.55)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.14)'}
              />
            </div>

            <button
              type="submit"
              disabled={!message.trim()}
              style={{
                background: message.trim() ? 'linear-gradient(135deg,#3b7cf6,#6d4cf6)' : 'rgba(255,255,255,0.1)',
                border: 'none', borderRadius: 9,
                padding: '10px 0',
                color: message.trim() ? 'white' : 'rgba(255,255,255,0.3)',
                fontSize: 13.5, fontWeight: 600,
                cursor: message.trim() ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}
            >
              Send Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
