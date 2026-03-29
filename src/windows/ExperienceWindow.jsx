const jobs = [
  {
    company: 'Self-Science Institute ApS',
    role: 'Full Stack Engineer',
    date: 'Dec 2024 – Present',
    location: 'Copenhagen, Denmark',
    current: true,
    tags: ['.NET 8', 'Flutter', 'GCP', 'Kafka', 'PostgreSQL', 'Kotlin', 'BLE'],
    description: 'Building event-driven health-tech infrastructure supporting multiple Flutter apps and real-time physiological data pipelines.',
    bullets: [
      'Event-driven .NET 8 / ASP.NET Core backend on GCP with PostgreSQL & Apache Kafka supporting 3 production Flutter apps',
      'Flutter–Android Platform Channel bridge in Kotlin for BLE sensors — 10+ signal types at up to 256 Hz',
      'Flutter BLoC architecture for real-time high-frequency sensor data visualisation',
      'Internal AI tooling reducing third-party AI API costs by ~70%',
    ],
  },
  {
    company: 'Factorise Solutions',
    role: 'Full Stack Intern',
    date: 'May 2024 – Nov 2024',
    location: 'Copenhagen, Denmark',
    current: false,
    tags: ['Nest.js', 'Next.js', 'React', 'Redis', 'RabbitMQ', 'Docker', 'AWS'],
    description: 'Developed microservices and frontend features with a focus on performance, caching strategy, and async messaging.',
    bullets: [
      'Nest.js microservices + PostgreSQL backend with Next.js / React frontend',
      'Three-tier cache (IMemoryCache → Redis → PostgreSQL): +300% QPS, −87% response time',
      'RabbitMQ for async event-driven messaging between services',
      'CI/CD with Docker & AWS Serverless; Cucumber-JUnit automated testing',
    ],
  },
  {
    company: 'Chengdu Chaoyouai Technology',
    role: 'Test Engineer (Intern)',
    date: 'May 2021 – Aug 2021',
    location: 'Chengdu, China',
    current: false,
    tags: ['Docker', 'Kubernetes', 'AWS', 'Cypress', 'Nest.js'],
    description: 'Operated large-scale cloud infrastructure and built end-to-end test coverage across the product stack.',
    bullets: [
      'Docker & Kubernetes on AWS for infrastructure serving 30M+ users',
      'Cypress E2E testing across the full Nest.js / Next.js application stack',
    ],
  },
]

export default function ExperienceWindow() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-7">
        <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center
                        bg-gradient-to-br from-violet-500 to-purple-700
                        shadow-[0_4px_14px_rgba(139,92,246,0.45)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2"/>
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
          </svg>
        </div>
        <div>
          <div className="text-[22px] font-bold text-white leading-none">Work Experience</div>
          <div className="text-[13px] text-white/45 mt-0.5">My professional journey</div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {jobs.map((job, i) => (
          <div key={job.company} className="relative pl-8 pb-8 last:pb-0">
            {/* Vertical line */}
            {i < jobs.length - 1 && (
              <div className="absolute left-[7px] top-4 bottom-0 w-[2px]
                              bg-gradient-to-b from-violet-500/60 to-transparent" />
            )}

            {/* Timeline dot */}
            <div className={`absolute left-0 top-[3px] w-4 h-4 rounded-full border-2
                            flex items-center justify-center
                            ${job.current
                              ? 'bg-violet-500 border-violet-300 shadow-[0_0_8px_rgba(139,92,246,0.7)]'
                              : 'bg-[rgba(139,92,246,0.25)] border-violet-500/50'}`} >
              {job.current && (
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </div>

            {/* Content */}
            <div>
              {/* Title row */}
              <div className="flex items-start justify-between gap-3 mb-1">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[15.5px] font-semibold text-white">{job.role}</span>
                    {job.current && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full
                                       bg-[rgba(42,200,64,0.15)] border border-[rgba(42,200,64,0.3)]
                                       text-[#2ac840]">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-[13.5px] text-violet-400 font-medium mt-0.5">{job.company}</div>
                  <div className="text-[11.5px] text-white/35 mt-0.5">📍 {job.location}</div>
                </div>
                <div className="flex items-center gap-1 text-[11.5px] text-white/38 flex-shrink-0 mt-0.5">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {job.date}
                </div>
              </div>

              {/* Description */}
              <p className="text-[12.5px] text-white/55 leading-relaxed mt-2 mb-3 italic">
                {job.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {job.tags.map(t => (
                  <span key={t}
                    className="px-2 py-0.5 rounded text-[10.5px] font-medium
                               bg-[rgba(139,92,246,0.12)] text-violet-300
                               border border-[rgba(139,92,246,0.22)]">
                    {t}
                  </span>
                ))}
              </div>

              {/* Bullets */}
              <ul className="space-y-1.5">
                {job.bullets.map((b, bi) => (
                  <li key={bi} className="flex gap-2 text-[12.5px] text-white/65 leading-relaxed">
                    <span className="text-violet-400 mt-[1px] flex-shrink-0">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
