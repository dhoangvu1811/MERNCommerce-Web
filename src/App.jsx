import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setLogoutCallback } from './apis/axiosConfig'
import { useAuth } from './hooks/useAuth'
import { getCurrentUser } from './redux/slices/userSlice'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import ProductDetail from './pages/ProductDetail'
import UserAccount from './pages/UserAccount'
import CartPage from './pages/CartPage'
import SupportCenter from './pages/SupportCenter'
import MyOrders from './pages/MyOrders'
import AdminDashboard from './pages/Admin/AdminDashboard'
import MainLayout from './layouts/MainLayout'

function AppContent() {
  const navigate = useNavigate()

  useEffect(() => {
    // Setup logout callback để redirect về home khi logout
    setLogoutCallback(() => {
      navigate('/')
    })
  }, [navigate])

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
        {/* Admin Route - No Header/Footer */}
        <Route path='/admin' element={<AdminDashboard />} />

        {/* Main Routes - With Header and Footer */}
        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/category/:categoryId' element={<CategoryPage />} />
          <Route path='/product/:productId' element={<ProductDetail />} />
          <Route path='/account' element={<UserAccount />} />
          <Route path='/orders' element={<MyOrders />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/support' element={<SupportCenter />} />
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
