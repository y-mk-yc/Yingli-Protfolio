import { useState } from 'react'

const EMAIL = 'yingli_duan@outlook.com'

const links = [
  { icon: '🐙', label: 'GitHub',    value: 'github.com/y-mk-yc',          href: 'https://github.com/y-mk-yc',                bg: '#24292e' },
  { icon: '💼', label: 'LinkedIn',  value: 'linkedin.com/in/y-mk-yc',     href: 'https://www.linkedin.com/in/y-mk-yc',        bg: '#0077b5' },
]

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = (e) => {
    e.stopPropagation()
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <button onClick={copy} style={{
      background: copied ? 'rgba(42,200,64,0.18)' : 'rgba(255,255,255,0.08)',
      border: `1px solid ${copied ? 'rgba(42,200,64,0.4)' : 'rgba(255,255,255,0.15)'}`,
      borderRadius: 7, padding: '4px 10px',
      color: copied ? '#2ac840' : 'rgba(255,255,255,0.55)',
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
  const [msgName, setMsgName]   = useState('')
  const [msgBody, setMsgBody]   = useState('')
  const [sent,    setSent]      = useState(false)

  const handleSend = (e) => {
    e.preventDefault()
    if (!msgBody.trim()) return
    const subject = encodeURIComponent(`Portfolio contact${msgName ? ` from ${msgName}` : ''}`)
    const body    = encodeURIComponent(msgBody)
    window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`, '_blank')
    setSent(true)
    setMsgName(''); setMsgBody('')
    setTimeout(() => setSent(false), 3000)
  }

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 8, padding: '9px 12px',
    color: 'white', fontSize: 13,
    fontFamily: 'inherit', outline: 'none',
    boxSizing: 'border-box', transition: 'border-color 0.15s',
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center
                        bg-gradient-to-br from-pink-500 to-rose-700
                        shadow-[0_4px_14px_rgba(236,72,153,0.45)]">
          📬
        </div>
        <div>
          <div className="text-[22px] font-bold text-white leading-none">Let's Connect</div>
          <div className="text-[13px] text-white/45 mt-0.5">I'd love to hear from you</div>
        </div>
      </div>

      {/* Email row with copy */}
      <div className="flex items-center gap-3 p-4 mb-3
                      bg-white/5 border border-white/10 rounded-xl">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0
                        bg-gradient-to-br from-amber-400 to-red-500">
          📧
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] text-white/40">Email</div>
          <div className="text-[13.5px] text-white font-medium mt-0.5 truncate">{EMAIL}</div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <CopyButton text={EMAIL} />
          <a href={`mailto:${EMAIL}`}
            style={{
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

      {/* Other links */}
      {links.map(l => (
        <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
          className="flex items-center gap-3.5 p-3.5 mb-3
                     bg-white/5 border border-white/8 rounded-xl
                     hover:bg-white/10 transition-colors duration-200 no-underline">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: l.bg }}>
            {l.icon}
          </div>
          <div>
            <div className="text-[11px] text-white/40">{l.label}</div>
            <div className="text-[13.5px] text-white font-medium mt-0.5">{l.value}</div>
          </div>
          <svg className="ml-auto opacity-30" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      ))}

      {/* Quick message form */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 18, marginTop: 4 }}>
        <div className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.8px] mb-3">
          Send a quick message
        </div>
        {sent ? (
          <div style={{
            textAlign: 'center', padding: '18px 0',
            color: '#2ac840', fontSize: 13.5, fontWeight: 500,
          }}>
            ✓ Opening your mail client...
          </div>
        ) : (
          <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input
              value={msgName}
              onChange={e => setMsgName(e.target.value)}
              placeholder="Your name (optional)"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'rgba(99,160,255,0.5)'}
              onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
            />
            <textarea
              value={msgBody}
              onChange={e => setMsgBody(e.target.value)}
              placeholder="Your message..."
              rows={3}
              required
              style={{ ...inputStyle, resize: 'vertical', minHeight: 72 }}
              onFocus={e => e.target.style.borderColor = 'rgba(99,160,255,0.5)'}
              onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
            />
            <button type="submit" disabled={!msgBody.trim()} style={{
              background: msgBody.trim() ? 'linear-gradient(135deg,#3b7cf6,#6d4cf6)' : 'rgba(255,255,255,0.08)',
              border: 'none', borderRadius: 9, padding: '10px 0',
              color: msgBody.trim() ? 'white' : 'rgba(255,255,255,0.3)',
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
