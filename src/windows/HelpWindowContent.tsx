import { useWindowColors } from '../context/ThemeContext'

const sections = [
  {
    icon: '🖱',
    title: 'Open Sections',
    items: [
      'Click any icon in the Dock at the bottom',
      'Use the Window menu in the top menu bar',
      'Type in Spotlight Search (centre of the screen)',
    ],
  },
  {
    icon: '🔍',
    title: 'Spotlight Search',
    items: [
      'Click the search bar (centre) and type a section name',
      'Press Enter or click a result to open it',
      'Type "feedback" → open the feedback form',
      'Type "matrix" → surprise easter egg 🕹',
      'Recent searches are remembered automatically',
    ],
  },
  {
    icon: '🪟',
    title: 'Working with Windows',
    items: [
      'Drag any window by its title bar',
      'Resize from the bottom-right ⌟ handle',
      'Click the 🔴 red button to close',
      'Click the 🟡 yellow button to maximise / restore',
      'Click anywhere on a window to bring it to the front',
    ],
  },
  {
    icon: '🎛',
    title: 'Control Centre',
    items: [
      'Click the ⊞ icon in the top-right of the menu bar',
      'Toggle Wi-Fi, Bluetooth, AirDrop and Focus Mode',
      'Play / pause Cornfield Chase (Hans Zimmer)',
      'Drag the volume slider to adjust music volume',
      'Switch between Dark and Light themes',
    ],
  },
  {
    icon: '🗂',
    title: 'Menu Bar',
    items: [
      'File → Download Résumé',
      'View → jump to any section',
      'Window → list all portfolio sections',
      'Help → this window or Send Feedback',
    ],
  },
]

export default function HelpWindowContent()
{
  const { text, textDim, textFaint, surface, border } = useWindowColors()

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
          background: 'linear-gradient(135deg, #60a5fa, #4f46e5)',
          boxShadow: '0 4px 14px rgba(59,130,246,0.45)',
        }}>❓</div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: text, lineHeight: 1 }}>Portfolio Help</div>
          <div style={{ fontSize: 13, color: textFaint, marginTop: 3 }}>Everything you need to navigate</div>
        </div>
      </div>

      <p style={{ fontSize: 13.5, color: textDim, lineHeight: 1.6, marginBottom: 24 }}>
        This is an interactive macOS-style portfolio. Here's a quick guide to everything you can do.
      </p>

      {/* Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {sections.map(sec => (
          <div key={sec.title}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 18 }}>{sec.icon}</span>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: text }}>{sec.title}</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, paddingLeft: 28, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {sec.items.map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: 8, fontSize: 12.5, color: textDim, lineHeight: 1.6 }}>
                  <span style={{ color: textFaint, flexShrink: 0 }}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Tip box */}
      <div style={{
        marginTop: 24,
        background: 'rgba(99,160,255,0.08)', border: '1px solid rgba(99,160,255,0.22)',
        borderRadius: 12, padding: '12px 16px', fontSize: 12.5, color: textDim, lineHeight: 1.6,
      }}>
        💡 <strong style={{ color: 'rgba(99,160,255,0.9)' }}>Pro tip:</strong>{' '}
        This window is draggable and resizable — grab the title bar to move it, or drag the bottom-right corner to resize.
      </div>
    </div>
  )
}
