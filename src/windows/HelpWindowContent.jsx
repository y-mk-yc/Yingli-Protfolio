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
      'Click the search bar (center) and type a section name',
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
      'Switch between Dark, Light and Wallpaper themes',
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

export default function HelpWindowContent() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center text-2xl
                        bg-gradient-to-br from-blue-400 to-indigo-600
                        shadow-[0_4px_14px_rgba(59,130,246,0.45)]">
          ❓
        </div>
        <div>
          <div className="text-[22px] font-bold text-white leading-none">Portfolio Help</div>
          <div className="text-[13px] text-white/45 mt-0.5">Everything you need to navigate</div>
        </div>
      </div>

      <p className="text-[13.5px] text-white/55 leading-relaxed mb-6">
        This is an interactive macOS-style portfolio. Here's a quick guide to everything you can do.
      </p>

      {/* Sections */}
      <div className="flex flex-col gap-5">
        {sections.map(sec => (
          <div key={sec.title}>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-[18px]">{sec.icon}</span>
              <span className="text-[13.5px] font-semibold text-white">{sec.title}</span>
            </div>
            <ul className="flex flex-col gap-1.5 ml-7">
              {sec.items.map((item, i) => (
                <li key={i} className="flex gap-2 text-[12.5px] text-white/60 leading-relaxed">
                  <span className="text-white/25 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Tip box */}
      <div className="mt-6 bg-[rgba(99,160,255,0.08)] border border-[rgba(99,160,255,0.22)]
                      rounded-xl px-4 py-3 text-[12.5px] text-white/65 leading-relaxed">
        💡 <strong className="text-[rgba(99,160,255,0.9)]">Pro tip:</strong>{' '}
        This window is draggable and resizable — grab the title bar to move it, or drag the bottom-right corner to resize.
      </div>
    </div>
  )
}
