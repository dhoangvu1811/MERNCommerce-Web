import {
  Grid,
  Typography,
  Box,
  Container,
  CircularProgress,
  Alert
} from '@mui/material'
import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { getProducts } from '../../apis/productApi'

function ProductList({
  title = 'Sản phẩm nổi bật',
  itemsPerPage = 8,
  type = null,
  sort = null,
  onProductCountChange = null
}) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        const params = {
          itemsPerPage,
          page: 1
        }

        if (type) params.type = type
        if (sort) params.sort = sort

        const response = await getProducts(params)

        if (response.code === 200) {
          setProducts(response.data.products || [])
          // Callback về số lượng sản phẩm cho parent component
          if (onProductCountChange) {
            onProductCountChange(response.data.products?.length || 0)
          }
        } else {
          setError('Không thể tải danh sách sản phẩm')
        }
      } catch {
        setError('Có lỗi xảy ra khi tải dữ liệu')
        // Có thể log error cho debugging nếu cần
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [itemsPerPage, type, sort, onProductCountChange])

  if (loading) {
    return (
      <Container maxWidth='xl' disableGutters>
        <Box sx={{ mb: 3 }}>
          <Typography variant='h5' component='h2' fontWeight='bold'>
            {title}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth='xl' disableGutters>
        <Box sx={{ mb: 3 }}>
          <Typography variant='h5' component='h2' fontWeight='bold'>
            {title}
          </Typography>
        </Box>
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Container>
    )
  }

  if (products.length === 0) {
    return (
      <Container maxWidth='xl' disableGutters>
        <Box sx={{ mb: 3 }}>
          <Typography variant='h5' component='h2' fontWeight='bold'>
            {title}
          </Typography>
        </Box>
        <Alert severity='info' sx={{ mb: 2 }}>
          Không có sản phẩm nào để hiển thị
        </Alert>
      </Container>
    )
  }
  return (
    <Container maxWidth='xl' disableGutters>
      <Box sx={{ mb: 3 }}>
        <Typography variant='h5' component='h2' fontWeight='bold'>
          {title}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default ProductList
