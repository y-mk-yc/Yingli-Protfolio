import { useState } from 'react'
import { useWindowColors } from '../context/ThemeContext'

const EMAIL = 'yingli_duan@outlook.com'

const links = [
  { icon: '🐙', label: 'GitHub',   value: 'github.com/y-mk-yc',      href: 'https://github.com/y-mk-yc',               bg: '#24292e' },
  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/y-mk-yc', href: 'https://www.linkedin.com/in/y-mk-yc',      bg: '#0077b5' },
]

function CopyButton({ text: copyText }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const { isDark } = useWindowColors()
  const copy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(copyText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <button onClick={copy} style={{
      background: copied ? 'rgba(42,200,64,0.18)' : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
      border: `1px solid ${copied ? 'rgba(42,200,64,0.4)' : isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
      borderRadius: 7, padding: '4px 10px',
      color: copied ? '#2ac840' : isDark ? 'rgba(255,255,255,0.55)' : 'rgba(20,20,22,0.60)',
      fontSize: 11.5, fontWeight: 500, cursor: 'pointer',
      fontFamily: 'inherit', transition: 'all 0.2s',
      display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0,
    }}>
      {copied ? (
        <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="20,6 9,17 4,12"/>
        </svg> Copied!</>
      ) : (
        <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg> Copy</>
      )}
    </button>
  )
}

export default function ContactWindow() {
  const { isDark, text, textDim, textFaint, surface, border, divider } = useWindowColors()
  const [msgName, setMsgName] = useState('')
  const [msgBody, setMsgBody] = useState('')
  const [sent, setSent]       = useState(false)

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!msgBody.trim()) return
    const subject = encodeURIComponent(`Portfolio contact${msgName ? ` from ${msgName}` : ''}`)
    const body    = encodeURIComponent(msgBody)
    window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`, '_blank')
    setSent(true)
    setMsgName(''); setMsgBody('')
    setTimeout(() => setSent(false), 3000)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: surface,
    border: `1px solid ${border}`,
    borderRadius: 8, padding: '9px 12px',
    color: text, fontSize: 13,
    fontFamily: 'inherit', outline: 'none',
    boxSizing: 'border-box', transition: 'border-color 0.15s',
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
          background: 'linear-gradient(135deg, #ec4899, #be185d)',
          boxShadow: '0 4px 14px rgba(236,72,153,0.45)',
        }}>📬</div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: text, lineHeight: 1 }}>Let's Connect</div>
          <div style={{ fontSize: 13, color: textFaint, marginTop: 3 }}>I'd love to hear from you</div>
        </div>
      </div>

      {/* Email row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: 16, marginBottom: 10,
        background: surface, border: `1px solid ${border}`, borderRadius: 12,
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
          background: 'linear-gradient(135deg, #fbbf24, #ef4444)',
        }}>📧</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, color: textFaint }}>Email</div>
          <div style={{ fontSize: 13.5, color: text, fontWeight: 500, marginTop: 2 }}>{EMAIL}</div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <CopyButton text={EMAIL} />
          <a href={`mailto:${EMAIL}`} style={{
            background: 'linear-gradient(135deg,rgba(59,124,246,0.3),rgba(109,76,246,0.3))',
            border: '1px solid rgba(99,160,255,0.35)',
            borderRadius: 7, padding: '4px 10px',
            color: '#63a0ff', fontSize: 11.5, fontWeight: 500,
            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Open
          </a>
        </div>
      </div>

      {/* Links */}
      {links.map(l => (
        <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: 14, marginBottom: 10,
            background: surface, border: `1px solid ${border}`, borderRadius: 12,
            textDecoration: 'none', transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)')}
          onMouseLeave={e => (e.currentTarget.style.background = surface)}
        >
          <div style={{
            width: 40, height: 40, borderRadius: 10, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
            background: l.bg,
          }}>{l.icon}</div>
          <div>
            <div style={{ fontSize: 11, color: textFaint }}>{l.label}</div>
            <div style={{ fontSize: 13.5, color: text, fontWeight: 500, marginTop: 2 }}>{l.value}</div>
          </div>
          <svg style={{ marginLeft: 'auto', opacity: 0.3 }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={text} strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      ))}

      {/* Quick message */}
      <div style={{ borderTop: `1px solid ${divider}`, paddingTop: 18, marginTop: 4 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: textFaint, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12 }}>
          Send a quick message
        </div>
        {sent ? (
          <div style={{ textAlign: 'center', padding: '18px 0', color: '#2ac840', fontSize: 13.5, fontWeight: 500 }}>
            ✓ Opening your mail client...
          </div>
        ) : (
          <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input
              value={msgName}
              onChange={e => setMsgName(e.target.value)}
              placeholder="Your name (optional)"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'rgba(99,160,255,0.5)')}
              onBlur={e  => (e.target.style.borderColor = border)}
            />
            <textarea
              value={msgBody}
              onChange={e => setMsgBody(e.target.value)}
              placeholder="Your message..."
              rows={3}
              required
              style={{ ...inputStyle, resize: 'vertical', minHeight: 72 }}
              onFocus={e => (e.target.style.borderColor = 'rgba(99,160,255,0.5)')}
              onBlur={e  => (e.target.style.borderColor = border)}
            />
            <button type="submit" disabled={!msgBody.trim()} style={{
              background: msgBody.trim() ? 'linear-gradient(135deg,#3b7cf6,#6d4cf6)' : surface,
              border: 'none', borderRadius: 9, padding: '10px 0',
              color: msgBody.trim() ? 'white' : textFaint,
              fontSize: 13.5, fontWeight: 600, cursor: msgBody.trim() ? 'pointer' : 'not-allowed',
              fontFamily: 'inherit', transition: 'all 0.2s',
            }}>
              Send via Mail App →
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
