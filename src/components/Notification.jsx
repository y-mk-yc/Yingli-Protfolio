import { useEffect, useState } from 'react'

export default function Notification({ icon = '👋', app = 'Portfolio', title, body, show }) {
  return (
    <div
      className={`fixed top-12 right-4 w-72 z-[99999]
                  bg-[rgba(40,40,42,0.95)] backdrop-blur-xl
                  border border-white/12 rounded-2xl p-4
                  shadow-[0_8px_32px_rgba(0,0,0,0.5)]
                  flex gap-3 items-start
                  transition-transform duration-[400ms] ease-[cubic-bezier(0.34,1.2,0.64,1)]
                  ${show ? 'translate-x-0' : 'translate-x-[340px]'}`}
    >
      <span className="text-3xl flex-shrink-0">{icon}</span>
      <div>
        <div className="text-[11px] text-white/40 uppercase tracking-[0.5px]">{app}</div>
        <div className="text-[13px] font-semibold text-white mt-0.5">{title}</div>
        <div className="text-[12px] text-white/60 mt-0.5 leading-snug">{body}</div>
      </div>
    </div>
  )
}
