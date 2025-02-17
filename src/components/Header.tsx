import { FC } from 'react'
import { useApp } from '@hooks/useApp'
import Checkout from '@components/Checkout/Checkout'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Badge from '@mui/material/Badge'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

const Header: FC = () => {
  const { state, dispatch } = useApp()

  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
      <h1 className="text-xl font-bold">OZ Store</h1>

      <div className="flex items-center gap-2">
        <Typography variant="h6" className="font-semibold">
          ${state.grandTotalPrice}
        </Typography>

        <IconButton
          onClick={() => dispatch({ type: 'SHOW_CHECKOUT', payload: true })}
          className="relative"
        >
          <Badge badgeContent={totalItems} color="primary">
            <ShoppingCartIcon fontSize="large" />
          </Badge>
        </IconButton>
      </div>

      <Drawer
        anchor="right"
        open={state.showCheckout}
        onClose={() => dispatch({ type: 'SHOW_CHECKOUT', payload: false })}
      >
        <div className="w-96 p-4">
          <Checkout />
        </div>
      </Drawer>
    </header>
  )
}

export default Header
