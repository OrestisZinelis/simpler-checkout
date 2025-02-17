import React, { useReducer, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppProvider } from '@contexts/AppProvider'
import Header from '@components/Header'
import StorePage from '@pages/StorePage'
import OrderPage from '@pages/OrderPage'
import { initialState, appReducer } from '@contexts/AppReducer'
import { ToastProvider } from '@contexts/ToastProvider'
import { CART_ITEMS_STORAGE_KEY } from '@constants/localStorage.const'

const App: React.FC = () => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_ITEMS_STORAGE_KEY)
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart)
      dispatch({ type: 'SET_CART_ITEMS', payload: parsedCart })
    }
  }, [])

  return (
    <ToastProvider>
      <AppProvider state={state} dispatch={dispatch}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<StorePage />} />
            <Route path="/order/:orderId" element={<OrderPage />} />
          </Routes>
        </Router>
      </AppProvider>
    </ToastProvider>
  )
}

export default App
