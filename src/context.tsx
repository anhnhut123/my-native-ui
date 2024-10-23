import React from 'react'
import { Theme, DefaultTheme } from './theme'

export const ThemeContext = React.createContext<Theme>(DefaultTheme)

export const useTheme = () => React.useContext(ThemeContext)

export function ThemeProvider({
  theme = DefaultTheme,
  children,
}: React.PropsWithChildren<{ theme?: Theme }>) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
