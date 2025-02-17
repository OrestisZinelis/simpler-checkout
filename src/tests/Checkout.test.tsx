import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, MockedFunction } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Checkout from '@components/Checkout/Checkout'
import { useApp } from '@hooks/useApp'
import { useApi } from '@hooks/useApi'
import { useToast } from '@hooks/useToast'

vi.mock('@hooks/useApp')
vi.mock('@hooks/useApi')
vi.mock('@hooks/useToast')
vi.mock('@services/orderApi', () => ({
  placeOrder: vi.fn(),
}))

const mockUseApp = useApp as MockedFunction<typeof useApp>
const mockUseApi = useApi as MockedFunction<typeof useApi>
const mockUseToast = useToast as MockedFunction<typeof useToast>

describe('Checkout Component', () => {
  const mockDispatch = vi.fn()
  const mockShowToast = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    mockUseApp.mockReturnValue({
      state: {
        items: [],
        products: [],
        discounts: [],
        appliedDiscount: undefined,
        grandTotalPrice: 0,
        showCheckout: true,
      },
      dispatch: mockDispatch,
    })

    mockUseApi.mockReturnValue({
      data: [],
      isFetching: false,
      isError: false,
      error: null,
    })

    mockUseToast.mockReturnValue({
      showToast: mockShowToast,
    })
  })

  it('renders the checkout component with no products', () => {
    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>,
    )

    expect(screen.getByText('Checkout')).toBeInTheDocument()
    expect(screen.getByText('No products added')).toBeInTheDocument()
  })

  it('renders the checkout component with products', () => {
    mockUseApp.mockReturnValue({
      state: {
        items: [{ product_id: '1', quantity: 2 }],
        products: [{ id: '1', name: 'Product 1', price: 10, stock: 5 }],
        discounts: [],
        appliedDiscount: undefined,
        grandTotalPrice: 20,
        showCheckout: true,
      },
      dispatch: mockDispatch,
    })

    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>,
    )

    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })
})
