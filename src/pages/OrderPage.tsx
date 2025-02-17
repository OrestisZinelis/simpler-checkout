import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '@hooks/useApp'
import { getOrder } from '@services/orderApi'
import { Order } from '@src/types/api/OrderTypes'
import { Card, CardContent, Button, CircularProgress } from '@mui/material'

const OrderPage = () => {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const { state } = useApp()
  const stateRef = useRef(state)
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrder = async (id: Order['id']) => {
      try {
        setIsLoading(true)
        const fetchedOrder = await getOrder(id)
        setOrder(fetchedOrder)
      } catch (err) {
        console.error(err)
        setError('Failed to fetch order details')
      } finally {
        setIsLoading(false)
      }
    }

    if (orderId) fetchOrder(orderId)
  }, [orderId])

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    )

  if (error) return <div className="text-red-500 text-center p-10">{error}</div>

  if (!order) return null

  const totalBeforeDiscount = order.items.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0,
  )

  const discountAmount = totalBeforeDiscount - stateRef.current.grandTotalPrice
  const finalPrice = stateRef.current.grandTotalPrice

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-lg shadow-lg">
        <CardContent>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Order Successful
          </h2>
          <p className="text-gray-600 text-center mb-4">
            Order ID: <span className="font-semibold">{order.id}</span>
          </p>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <p className="text-gray-800">
                  {item.product.name} (x{item.quantity})
                </p>
                <p className="font-semibold text-gray-900">
                  ${(item.quantity * item.product.price).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t pt-4 space-y-2">
            <div className="flex justify-between text-gray-700">
              <p>Subtotal:</p>
              <p>${totalBeforeDiscount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-red-500 font-medium">
              <p>Discount:</p>
              <p>- ${discountAmount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <p>Total:</p>
              <p>${finalPrice}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default OrderPage
