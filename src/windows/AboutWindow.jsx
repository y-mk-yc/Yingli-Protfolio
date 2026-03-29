const TAGS = [
  'Flutter', 'Dart', 'React', 'Next.js', 'TypeScript',
  '.NET 8', 'ASP.NET Core', 'Node.js', 'Nest.js',
  'PostgreSQL', 'Kafka', 'Redis', 'Docker', 'AWS', 'GCP',
  'BLE', 'Kotlin',
]

export default function AboutWindow() {
  return (
    <div>
      {/* Hero */}
      <div className="flex gap-5 items-center mb-6">
        <div className="w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center text-4xl
                        bg-gradient-to-br from-[#667eea] to-[#764ba2]
                        shadow-[0_4px_20px_rgba(102,126,234,0.5)]">
          👩‍💻
        </div>
        <div>
          <div className="text-[22px] font-bold text-white">Yingli Duan (Dawn)</div>
          <div className="text-[14px] text-[#63a0ff] mt-0.5">Fullstack Software Engineer</div>
          <div className="text-[13px] text-white/50 mt-1">📍 Copenhagen, Denmark</div>
        </div>
      </div>

      {/* Bio */}
      <p className="text-[14px] text-white/75 leading-relaxed mb-3">
        Fullstack engineer with hands-on experience building production-grade mobile and web applications.
        Currently at Self-Science Institute, where I design event-driven .NET backends on GCP,
        engineer Flutter apps with BLoC architecture, and bridge native Android BLE sensors into
        cross-platform apps via Kotlin Platform Channels.
      </p>
      <p className="text-[14px] text-white/75 leading-relaxed mb-6">
        I hold an MSc in Computer Science (Security) from the Technical University of Denmark and a
        BSc in CS (IoT) from Beijing Forestry University. I love systems that are fast, reliable,
        and elegant — from 256 Hz sensor pipelines to sub-100 ms API responses.
      </p>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { value: '2+', label: 'Years Exp.' },
          { value: 'MSc', label: 'DTU, Denmark' },
          { value: 'AWS', label: 'Certified' },
        ].map(s => (
          <div key={s.label}
            className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <div className="text-[20px] font-bold text-white">{s.value}</div>
            <div className="text-[11px] text-white/45 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="h-px bg-white/10 mb-5" />

      <div className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.8px] mb-3">
        Technologies I work with
      </div>
      <div className="flex flex-wrap gap-2">
        {TAGS.map(t => (
          <span key={t}
            className="bg-[rgba(99,160,255,0.15)] border border-[rgba(99,160,255,0.3)]
                       text-[#63a0ff] rounded-full px-3 py-1 text-[12px]">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
