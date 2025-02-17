import { useEffect, useMemo, type FC } from 'react'
import { AppContext } from '@contexts/AppContext'
import type { AppState, AppAction } from '@src/types/AppStateTypes'
import { calcGrandTotal } from '@utils/calcGrandTotal'

interface AppProviderProps {
  children: React.ReactNode
  state: AppState
  dispatch: React.Dispatch<AppAction>
}

export const AppProvider: FC<AppProviderProps> = ({
  children,
  state,
  dispatch,
}) => {
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])

  useEffect(() => {
    const newPrice = calcGrandTotal(state)

    if (newPrice !== state.grandTotalPrice) {
      dispatch({ type: 'SET_CART_GRAND_TOTAL_PRICE', payload: newPrice })
    }
  }, [state, dispatch])

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}
