import { useWindowColors } from '../context/ThemeContext'

interface Job {
  company: string
  role: string
  date: string
  location: string
  current: boolean
  tags: string[]
  description: string
  bullets: string[]
}

const jobs: Job[] = [
  {
    company: 'Self-Science Institute ApS',
    role: 'Full Stack Engineer',
    date: 'Dec 2024 – Present',
    location: 'Copenhagen, Denmark',
    current: true,
    tags: ['Flutter', 'Dart', 'BLoC', 'BLE', '.NET 8', 'Kafka', 'PostgreSQL', 'GCS'],
    description: 'Built a cross-platform digital-health platform — three Flutter apps (Android, desktop, web) backed by a headless CMS, PostgreSQL, and Google Cloud Storage — with real-time BLE biosensor streaming and an event-driven .NET 8 microservices backend.',
    bullets: [
      'Architected a Flutter monorepo with three cross-platform apps sharing a common Dart layer for data models, state management, and sensor integrations — eliminating code duplication and improving system scalability by 40%',
      'Built custom BLE integrations for Polar H10/H360 (ECG, PPG, PPI at 130 Hz) and InteraXon Muse EEG (4-channel EEG + IMU via raw packet parsing and epoch windowing) — no official Flutter SDK existed for Muse — cutting sensor integration development time by ~60% and enabling 10+ signal types streamed concurrently to cloud storage',
      'Adopted Flutter BLoC architecture for real-time high-frequency sensor data, eliminating unnecessary widget rebuilds and improving rendering performance by ~40%; offloaded heavy protocol processing to background isolates to keep the UI thread unblocked',
      'Built an event-driven .NET 8 / ASP.NET Core microservices backend with Apache Kafka event streaming, YARP API Gateway, EF Core + PostgreSQL, and JWT authentication; published a shared NuGet library with a generic repository pattern and a typed Result monad used across all services',
      'Secured all AI API calls server-side via headless CMS automation flows — zero credentials exposed in client binaries; implemented OTP phone authentication via a custom Node.js / Twilio SMS extension; built internal AI tooling that cut team AI API costs by ~70%',
    ],
  },
  {
    company: 'Factorise Solutions',
    role: 'Full Stack Intern',
    date: 'May 2024 – Nov 2024',
    location: 'Copenhagen, Denmark',
    current: false,
    tags: ['Nest.js', 'Next.js', 'React Native', 'TypeScript', 'Redis', 'RabbitMQ', 'Docker', 'AWS'],
    description: 'Developed a financial AI platform end-to-end — a Next.js / React web dashboard and a React Native mobile app — backed by a Nest.js microservices architecture with PostgreSQL, RabbitMQ, and containerised AWS deployment.',
    bullets: [
      'Delivered full-stack features across a Next.js / React / TypeScript web dashboard and a React Native mobile app for a financial AI platform, owning end-to-end development from API design to production UI',
      'Designed a three-tier caching strategy (in-memory → Redis → PostgreSQL) combined with lazy loading and Provider-based API optimisation — boosting QPS by 300%, reducing response time from 800ms to 100ms (−87%), and cutting redundant API calls by 20%',
      'Built a containerised Nest.js microservices backend with RabbitMQ for async inter-service messaging, fully decoupling service boundaries; deployed to AWS Serverless via Docker-based CI/CD pipelines — reducing operational costs by 50%',
      'Wrote Cucumber-JUnit E2E acceptance tests covering API contracts and critical financial workflows, reducing production bugs by 30%',
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
  const { isDark, text, textDim, textFaint } = useWindowColors()

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
          boxShadow: '0 4px 14px rgba(139,92,246,0.45)',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2"/>
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: text, lineHeight: 1 }}>Work Experience</div>
          <div style={{ fontSize: 13, color: textFaint, marginTop: 3 }}>My professional journey</div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative' }}>
        {jobs.map((job, i) => (
          <div key={job.company} style={{ position: 'relative', paddingLeft: 32, paddingBottom: i < jobs.length - 1 ? 32 : 0 }}>
            {/* Vertical line */}
            {i < jobs.length - 1 && (
              <div style={{
                position: 'absolute', left: 7, top: 16, bottom: 0, width: 2,
                background: 'linear-gradient(to bottom, rgba(139,92,246,0.6), transparent)',
              }} />
            )}

            {/* Dot */}
            <div style={{
              position: 'absolute', left: 0, top: 3, width: 16, height: 16,
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `2px solid ${job.current ? '#8b5cf6' : 'rgba(139,92,246,0.4)'}`,
              background: job.current ? '#8b5cf6' : 'rgba(139,92,246,0.18)',
              boxShadow: job.current ? '0 0 8px rgba(139,92,246,0.7)' : 'none',
            }}>
              {job.current && <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'white', animation: 'pulse 2s infinite' }} />}
            </div>

            {/* Content */}
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 4 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 15.5, fontWeight: 600, color: text }}>{job.role}</span>
                    {job.current && (
                      <span style={{
                        fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 99,
                        background: 'rgba(42,200,64,0.15)', border: '1px solid rgba(42,200,64,0.3)',
                        color: '#2ac840',
                      }}>Current</span>
                    )}
                  </div>
                  <div style={{ fontSize: 13.5, color: '#a78bfa', fontWeight: 500, marginTop: 2 }}>{job.company}</div>
                  <div style={{ fontSize: 11.5, color: textFaint, marginTop: 2 }}>📍 {job.location}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11.5, color: textFaint, flexShrink: 0, marginTop: 2 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {job.date}
                </div>
              </div>

              <p style={{ fontSize: 12.5, color: textDim, lineHeight: 1.65, margin: '8px 0 10px', fontStyle: 'italic' }}>
                {job.description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                {job.tags.map(t => (
                  <span key={t} style={{
                    padding: '2px 8px', borderRadius: 4, fontSize: 10.5, fontWeight: 500,
                    background: isDark ? 'rgba(139,92,246,0.12)' : 'rgba(139,92,246,0.10)',
                    color: '#a78bfa',
                    border: `1px solid ${isDark ? 'rgba(139,92,246,0.22)' : 'rgba(139,92,246,0.30)'}`,
                  }}>{t}</span>
                ))}
              </div>

              {/* Bullets */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {job.bullets.map((b, bi) => (
                  <li key={bi} style={{ display: 'flex', gap: 8, fontSize: 12.5, color: textDim, lineHeight: 1.6 }}>
                    <span style={{ color: '#a78bfa', flexShrink: 0, marginTop: 1 }}>▸</span>
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
