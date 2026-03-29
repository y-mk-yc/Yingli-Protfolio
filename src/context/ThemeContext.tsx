import { createContext, useContext } from 'react'

export type Theme = 'dark' | 'light' | 'wallpaper'

interface ThemeContextType {
  theme: Theme
  setTheme: (t: Theme) => void
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

/** Returns theme-aware colour tokens for window content components */
export function useWindowColors() {
  const { theme } = useTheme()
  const isDark = theme !== 'light'
  return {
    isDark,
    text:      isDark ? 'rgba(255,255,255,0.88)' : 'rgba(20,20,22,0.90)',
    textDim:   isDark ? 'rgba(255,255,255,0.55)' : 'rgba(60,60,67,0.65)',
    textFaint: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(60,60,67,0.45)',
    surface:   isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
    surface2:  isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)',
    border:    isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)',
    divider:   isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
  }
}
