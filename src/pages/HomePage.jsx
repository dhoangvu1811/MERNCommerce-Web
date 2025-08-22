import { Grid, Box, Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CategoryList from '../components/Category/CategoryList'
import BannerSlider from '../components/Banner/BannerSlider'
import ProductList from '../components/Product/ProductList'
import LoginDialog from '../components/auth/LoginDialog'

function HomePage() {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Kiểm tra query parameter để mở login dialog
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    if (urlParams.get('login') === 'true') {
      setLoginDialogOpen(true)
      // Xóa query parameter khỏi URL sau khi đã mở dialog
      navigate('/', { replace: true })
    }
  }, [location, navigate])

  const handleCloseLoginDialog = () => {
    setLoginDialogOpen(false)
  }

  return (
    <>
      <Box sx={{ py: 4, flexGrow: 1 }}>
        <Container maxWidth='xl'>
          {/* Main layout grid */}
          <Grid container spacing={3}>
            {/* Sidebar with categories */}
            <Grid size={{ xs: 12, md: 3, lg: 2.5 }}>
              <CategoryList />
            </Grid>
            {/* Main content area */}
            <Grid size={{ xs: 12, md: 9, lg: 9.5 }}>
              {/* Banner slider */}
              <BannerSlider />

              {/* Featured products */}
              <Box sx={{ mb: 6 }}>
                <ProductList title='Sản phẩm nổi bật' itemsPerPage={8} sort='rating' />
              </Box>

              {/* New arrivals */}
              <Box sx={{ mb: 6 }}>
                <ProductList title='Hàng mới về' itemsPerPage={8} sort='createdAt' />
              </Box>

              {/* Best selling */}
              <Box>
                <ProductList title='Bán chạy nhất' itemsPerPage={8} sort='selled' />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Login Dialog */}
      <LoginDialog open={loginDialogOpen} onClose={handleCloseLoginDialog} />
    </>
  )
}

export default HomePage
