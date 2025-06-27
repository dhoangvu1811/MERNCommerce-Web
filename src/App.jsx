import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import ProductDetail from './pages/ProductDetail'
import UserAccount from './pages/UserAccount'

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
        {/* Main Layout */}
        <Header />
        <Box component='main' sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/category/:categoryId' element={<CategoryPage />} />
            <Route path='/product/:productId' element={<ProductDetail />} />
            <Route path='/account' element={<UserAccount />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
  )
}

export default App
