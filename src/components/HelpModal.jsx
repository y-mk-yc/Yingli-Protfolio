export default function HelpModal({ onClose }) {
  if (!onClose) return null

  const sections = [
    {
      icon: '🖱',
      title: 'Open Sections',
      items: [
        'Click any icon in the Dock at the bottom',
        'Click the desktop icons on the right side',
        'Use the Window menu in the top menu bar',
      ],
    },
    {
      icon: '🔍',
      title: 'Spotlight Search',
      items: [
        'Click the search bar (center of desktop) and type a section name',
        'Press Enter or click a result to open it',
        'Type "feedback" to open the feedback form',
        'Type "help" to re-open this guide',
        'Click the quick-launch icons to the right of the search bar',
      ],
    },
    {
      icon: '🪟',
      title: 'Working with Windows',
      items: [
        'Drag any window by its title bar',
        'Resize from the bottom-right corner handle',
        'Click the red ● to close a window',
        'Click anywhere on a window to bring it to the front',
      ],
    },
    {
      icon: '🗂',
      title: 'Menu Bar',
      items: [
        'File → Download Résumé',
        'View → jump to any section',
        'Window → list all portfolio sections',
        'Help → this guide or Send Feedback',
      ],
    },
  ]

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
          width: 500, maxWidth: '92vw',
          maxHeight: '82vh', overflowY: 'auto',
          boxShadow: '0 32px 80px rgba(0,0,0,0.8)',
          color: 'white',
          fontFamily: '-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif',
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
            style={{
              width: 14, height: 14, borderRadius: '50%',
              background: '#ff5f57', border: 'none', cursor: 'pointer',
              flexShrink: 0,
            }}
          />
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#febc2e', flexShrink: 0 }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#2ac840', flexShrink: 0 }} />
          <span style={{ marginLeft: 8, fontWeight: 600, fontSize: 14, color: 'rgba(255,255,255,0.88)' }}>
            Portfolio Help
          </span>
        </div>

        {/* Hero */}
        <div style={{ padding: '22px 28px 0' }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>👋</div>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Welcome to my Portfolio</div>
          <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: 22 }}>
            This is an interactive macOS-style portfolio. Here's everything you need to know to navigate it.
          </div>
        </div>

        {/* Sections */}
        <div style={{ padding: '0 28px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {sections.map(sec => (
            <div key={sec.title}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 18 }}>{sec.icon}</span>
                <span style={{ fontWeight: 600, fontSize: 13.5 }}>{sec.title}</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: 28, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {sec.items.map((item, i) => (
                  <li key={i} style={{ fontSize: 13, color: 'rgba(255,255,255,0.62)', lineHeight: 1.5 }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Tip box */}
          <div style={{
            background: 'rgba(99,160,255,0.1)',
            border: '1px solid rgba(99,160,255,0.25)',
            borderRadius: 10, padding: '12px 16px',
            fontSize: 12.5, color: 'rgba(255,255,255,0.7)', lineHeight: 1.55,
          }}>
            💡 <strong style={{ color: 'rgba(99,160,255,0.9)' }}>Tip:</strong>{' '}
            Try typing <code style={{ background: 'rgba(255,255,255,0.1)', padding: '1px 5px', borderRadius: 4 }}>matrix</code> in
            the Spotlight search for a surprise easter egg.
          </div>
        </div>
      </div>
    </div>
  )
}
