import { Grid, Box, Container } from '@mui/material'
import CategoryList from '../components/Category/CategoryList'
import BannerSlider from '../components/Banner/BannerSlider'
import ProductList from '../components/Product/ProductList'

function HomePage() {
  return (
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
              <ProductList title='Sản phẩm nổi bật' limit={8} sort='rating' />
            </Box>

            {/* New arrivals */}
            <Box sx={{ mb: 6 }}>
              <ProductList title='Hàng mới về' limit={8} sort='createdAt' />
            </Box>

            {/* Best selling */}
            <Box>
              <ProductList title='Bán chạy nhất' limit={8} sort='selled' />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default HomePage
