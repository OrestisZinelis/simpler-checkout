import { useContext } from 'react'
import { AppContext } from '@contexts/AppContext'
import type { AppContextType } from '@contexts/AppContext'

export const useApp = (): AppContextType => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
