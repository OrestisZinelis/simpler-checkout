import type { FC } from 'react'
import { Snackbar, Alert } from '@mui/material'

interface ToastProps {
  open: boolean
  message: string
  type: 'success' | 'error'
  onClose: () => void
}

const Toast: FC<ToastProps> = ({ open, message, type, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity={type}
        className="w-full text-white"
        sx={{
          bgcolor: type === 'success' ? 'green.600' : 'red.600',
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Toast
