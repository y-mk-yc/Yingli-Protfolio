const degrees = [
  {
    school: 'Technical University of Denmark (DTU)',
    degree: 'MSc Computer Science — Computer Security',
    period: '2022 – 2025',
    gpa: '8.4 / 12',
    location: 'Kongens Lyngby, Denmark',
    emoji: '🏛️',
    color: 'from-[#c00200] to-[#7b0000]',
    courses: 'Network Security, Cryptography, Distributed Systems, Advanced Algorithms, Machine Learning',
  },
  {
    school: 'Beijing Forestry University',
    degree: 'BSc Computer Science — Internet of Things',
    period: '2018 – 2022',
    gpa: '89 / 100',
    location: 'Beijing, China',
    emoji: '🌿',
    color: 'from-[#166534] to-[#14532d]',
    courses: 'IoT Protocols, Embedded Systems, Data Structures & Algorithms, Operating Systems, Database Theory',
  },
]

const certs = [
  { icon: '☁️', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', color: '#fbbf24' },
]

export default function EducationWindow() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-7">
        <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center text-xl
                        bg-gradient-to-br from-blue-500 to-indigo-700
                        shadow-[0_4px_14px_rgba(59,130,246,0.45)]">
          🎓
        </div>
        <div>
          <div className="text-[22px] font-bold text-white leading-none">Education</div>
          <div className="text-[13px] text-white/45 mt-0.5">Academic background</div>
        </div>
      </div>

      {/* Degrees */}
      {degrees.map((d, i) => (
        <div key={d.school}>
          <div className="flex gap-4 mb-6">
            {/* Icon */}
            <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-2xl
                            bg-gradient-to-br ${d.color} shadow-md`}>
              {d.emoji}
            </div>
            <div className="flex-1">
              <div className="text-[15.5px] font-semibold text-white">{d.school}</div>
              <div className="text-[13px] text-[#63a0ff] my-0.5">{d.degree}</div>
              <div className="flex items-center gap-3 text-[11.5px] text-white/38 mb-2">
                <span>📅 {d.period}</span>
                <span>📍 {d.location}</span>
                <span>⭐ GPA {d.gpa}</span>
              </div>
              <div className="text-[12.5px] text-white/55 leading-relaxed">
                <span className="text-white/35 text-[11px] font-semibold uppercase tracking-wide mr-1">Courses:</span>
                {d.courses}
              </div>
            </div>
          </div>
          {i < degrees.length - 1 && <div className="h-px bg-white/10 mb-6" />}
        </div>
      ))}

      <div className="h-px bg-white/10 mb-5" />

      {/* Certifications */}
      <div className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.8px] mb-4">
        Certifications
      </div>
      <div className="flex flex-col gap-3">
        {certs.map(c => (
          <div key={c.name}
            className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
            <span className="text-2xl">{c.icon}</span>
            <div>
              <div className="text-[13.5px] font-semibold" style={{ color: c.color }}>{c.name}</div>
              <div className="text-[11.5px] text-white/40 mt-0.5">{c.issuer}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Languages */}
      <div className="mt-5">
        <div className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.8px] mb-3">
          Languages
        </div>
        <div className="flex gap-3">
          {[
            { lang: 'Mandarin', level: 'Native',       pct: 1.0 },
            { lang: 'English',  level: 'Fluent',        pct: 0.92 },
            { lang: 'Danish',   level: 'Intermediate',  pct: 0.55 },
          ].map(l => (
            <div key={l.lang} className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <div className="text-[13px] font-semibold text-white">{l.lang}</div>
              <div className="text-[10.5px] text-white/40 mt-0.5 mb-2">{l.level}</div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#63a0ff] to-[#a78bfa]"
                  style={{ width:`${l.pct*100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
