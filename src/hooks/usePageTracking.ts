import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView, trackProductView } from '../lib/api'

export function usePageTracking() {
  const location = useLocation()

  useEffect(() => {
    trackPageView(location.pathname)
  }, [location.pathname])
}

export function useProductTracking(productId: string | undefined) {
  useEffect(() => {
    if (productId) trackProductView(productId)
  }, [productId])
}
