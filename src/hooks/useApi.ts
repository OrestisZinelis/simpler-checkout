import { useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { api } from '@services/axios.config'

export function useApi<T>(
  url: string,
  method: 'GET' | 'POST' | 'DELETE' = 'GET',
  body: unknown = null,
) {
  const [data, setData] = useState<T | null>(null)
  const [isFetching, setIsFetching] = useState(true)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<AxiosError | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      setIsFetching(true)
      try {
        const response = await api({ method, url, data: body })
        if (isMounted) {
          setData(response.data)
        }
      } catch (err) {
        if (isMounted) {
          setIsError(true)
          setError(err as AxiosError)
        }
      } finally {
        if (isMounted) {
          setIsFetching(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [url, method, body])

  return { data, isFetching, isError, error }
}
