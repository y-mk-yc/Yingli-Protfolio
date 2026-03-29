interface Props {
  icon?: string
  app?: string
  title: string
  body: string
  show: boolean
}

export default function Notification({ icon = '👋', app = 'Portfolio', title, body, show }: Props) {
  return (
    <div style={{
      position: 'fixed', top: 48, right: 16, width: 288, zIndex: 99999,
      background: 'rgba(40,40,42,0.95)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.12)', borderRadius: 18, padding: 16,
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      display: 'flex', gap: 12, alignItems: 'flex-start',
      transform: show ? 'translateX(0)' : 'translateX(340px)',
      transition: 'transform 400ms cubic-bezier(0.34,1.2,0.64,1)',
    }}>
      <span style={{ fontSize: 32, flexShrink: 0 }}>{icon}</span>
      <div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{app}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'white', marginTop: 2 }}>{title}</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2, lineHeight: 1.4 }}>{body}</div>
      </div>
    </div>
  )
}
