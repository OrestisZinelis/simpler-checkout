import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  MockedFunction,
} from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import StorePage from '@pages/StorePage'
import { useApp } from '@hooks/useApp'
import { useApi } from '@hooks/useApi'
import { AxiosError } from 'axios'

vi.mock('@hooks/useApp')
vi.mock('@hooks/useApi')

const mockUseApp = useApp as MockedFunction<typeof useApp>
const mockUseApi = useApi as MockedFunction<typeof useApi>

describe('StorePage', () => {
  const mockDispatch = vi.fn()

  beforeEach(() => {
    mockUseApp.mockReturnValue({
      state: {
        products: [],
        items: [],
        grandTotalPrice: 0,
        showCheckout: false,
      },
      dispatch: mockDispatch,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading state', () => {
    mockUseApi.mockReturnValue({
      data: null,
      isError: false,
      isFetching: true,
      error: null,
    })

    render(<StorePage />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('renders error state', () => {
    mockUseApi.mockReturnValue({
      data: null,
      isError: true,
      isFetching: false,
      error: { message: 'Error loading products' } as AxiosError,
    })

    render(<StorePage />)
    expect(screen.getByText('Error loading products')).toBeInTheDocument()
  })

  it('renders products and handles add to cart', async () => {
    const mockProducts = [
      { id: '1', name: 'Product 1', price: 10, stock: 5 },
      { id: '2', name: 'Product 2', price: 20, stock: 3 },
    ]

    mockUseApi.mockReturnValue({
      data: mockProducts,
      isError: false,
      isFetching: false,
      error: null,
    })

    mockUseApp.mockReturnValue({
      state: {
        products: mockProducts,
        items: [],
        grandTotalPrice: 0,
        showCheckout: false,
      },
      dispatch: mockDispatch,
    })

    render(<StorePage />)

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument()
      expect(screen.getByText('Product 2')).toBeInTheDocument()
    })

    const addToCartButtons = screen.getAllByText('Add to Cart')
    fireEvent.click(addToCartButtons[0])

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_TO_CART_ITEMS',
      payload: '1',
    })
  })
})
