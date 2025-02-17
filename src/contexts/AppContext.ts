import { createContext, Dispatch } from 'react'
import { AppState, AppAction } from '@src/types/AppStateTypes'

export interface AppContextType {
  state: AppState
  dispatch: Dispatch<AppAction>
}

export const AppContext = createContext<AppContextType | undefined>(undefined)
