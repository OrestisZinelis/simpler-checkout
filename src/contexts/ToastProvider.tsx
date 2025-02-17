import { useState, ReactNode, useMemo, useCallback } from 'react'
import { ToastContext } from '@contexts/ToastContext'
import Toast from '@components/Toast'

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState<'success' | 'error'>('success')

  const showToast = useCallback(
    (msg: string, toastType: 'success' | 'error') => {
      setMessage(msg)
      setType(toastType)
      setOpen(true)
    },
    [],
  )

  const handleClose = () => setOpen(false)

  const contextValue = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Toast open={open} message={message} type={type} onClose={handleClose} />
    </ToastContext.Provider>
  )
}

export default ToastProvider
