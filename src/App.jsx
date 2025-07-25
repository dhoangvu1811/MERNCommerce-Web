import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import ProductDetail from './pages/ProductDetail'
import UserAccount from './pages/UserAccount'
import CartPage from './pages/CartPage'
import AdminDashboard from './pages/Admin/AdminDashboard'
import MainLayout from './layouts/MainLayout'

function App() {
  return (
    <BrowserRouter>
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
            <Route path='/cart' element={<CartPage />} />
          </Route>
        </Routes>
      </Box>
    </BrowserRouter>
  )
}

export default App
