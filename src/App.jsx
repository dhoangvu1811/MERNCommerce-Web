import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { useEffect, useRef } from 'react'
import { setLogoutCallback } from './apis/axiosConfig'
import { useAuth } from './hooks/useAuth'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import ProductDetail from './pages/ProductDetail'
import UserAccount from './pages/UserAccount'
import CartPage from './pages/CartPage'
import SupportCenter from './pages/SupportCenter'
import MyOrders from './pages/MyOrders'
import Unauthorized from './pages/Unauthorized'
import OAuthSuccess from './pages/OAuthSuccess'
import OAuthFailure from './pages/OAuthFailure'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminRouteWrapper from './components/auth/AdminRouteWrapper'
import MainLayout from './layouts/MainLayout'
import Vouchers from './pages/Vouchers'
import Checkout from './pages/Checkout'

function AppContent() {
  const navigate = useNavigate()
  const { refreshUser } = useAuth()
  const isInitialized = useRef(false)

  useEffect(() => {
    // Setup logout callback để redirect về home khi logout
    setLogoutCallback(() => {
      navigate('/')
    })
  }, [navigate])

  useEffect(() => {
    // Ngăn chặn infinite loop và multiple calls trong StrictMode
    if (isInitialized.current) {
      return
    }

    isInitialized.current = true

    // Chỉ refresh user 1 lần khi app khởi động
    refreshUser().catch((error) => {
      // Log error cho debugging nhưng không show UI error vì axios interceptor đã xử lý
      // eslint-disable-next-line no-console
      console.warn('[App] Failed to refresh user on startup:', error)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      {/* Routes */}
      <Routes>
        {/* Standalone Routes */}
        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path='/auth/success' element={<OAuthSuccess />} />
        <Route path='/auth/failure' element={<OAuthFailure />} />

        {/* Admin Route - No Header/Footer, Protected by AdminRouteWrapper */}
        <Route
          path='/admin'
          element={
            <AdminRouteWrapper>
              <AdminDashboard />
            </AdminRouteWrapper>
          }
        />

        {/* Main Routes - With Header and Footer */}
        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/category/:categoryId' element={<CategoryPage />} />
          <Route path='/product/:productId' element={<ProductDetail />} />
          <Route path='/account' element={<UserAccount />} />
          <Route path='/orders' element={<MyOrders />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/support' element={<SupportCenter />} />
          <Route path='/vouchers' element={<Vouchers />} />
        </Route>
      </Routes>
    </Box>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
