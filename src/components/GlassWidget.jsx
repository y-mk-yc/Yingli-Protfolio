import React from 'react'

function GlassWidget({ children, style })
{
    return (
        <div style={{
            background: 'rgba(161, 156, 172, 0.62)',
            opacity: 0.8,
            backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.11)',
            borderRadius: 16, padding: '14px 16px',
            ...style
        }}>
            {children}
        </div>
    )
}

export default GlassWidget