import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  Grid,
  Container,
  Box,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  CircularProgress,
  Alert
} from '@mui/material'
import ProductBreadcrumbs from '~/components/ProductDetail/ProductBreadcrumbs'
import ProductGallery from '~/components/ProductDetail/ProductGallery'
import ProductInfo from '~/components/ProductDetail/ProductInfo'
import ReviewSection from '~/components/ProductDetail/ReviewSection'
import MobileBuyBox from '~/components/ProductDetail/MobileBuyBox'
import BuyBox from '~/components/ProductDetail/BuyBox'
import { getProductById } from '~/apis/productApi'

// Sample reviews - sẽ được thay thế bằng API sau này
const sampleReviews = [
  {
    id: 1,
    username: 'Nguyễn Văn A',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    date: '15/06/2025',
    content:
      'Sản phẩm rất tốt, đóng gói cẩn thận, giao hàng nhanh. Camera chụp đẹp, pin trâu, màn hình hiển thị sắc nét. Rất hài lòng với sản phẩm!'
  },
  {
    id: 2,
    username: 'Trần Thị B',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4,
    date: '12/06/2025',
    content:
      'Điện thoại đẹp, chạy mượt, camera chụp ảnh rõ nét. Tuy nhiên pin hơi tệ, sạc khá lâu. Nhưng nhìn chung là tốt với giá tiền.'
  },
  {
    id: 3,
    username: 'Lê Văn C',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    rating: 5,
    date: '08/06/2025',
    content:
      'Đây là chiếc iPhone tốt nhất mà tôi từng dùng. Màn hình rất đẹp, hiệu năng mạnh mẽ. Dynamic Island là một tính năng thú vị. Khuyên mọi người nên mua.'
  },
  {
    id: 4,
    username: 'Lê Văn K',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    rating: 2,
    date: '08/06/2025',
    content:
      'Đây là chiếc iPhone tốt nhất mà tôi từng dùng. Màn hình rất đẹp, hiệu năng mạnh mẽ. Dynamic Island là một tính năng thú vị. Khuyên mọi người nên mua.'
  },
  {
    id: 5,
    username: 'Lê Văn E',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    rating: 1,
    date: '08/06/2025',
    content:
      'Đây là chiếc iPhone tốt nhất mà tôi từng dùng. Màn hình rất đẹp, hiệu năng mạnh mẽ. Dynamic Island là một tính năng thú vị. Khuyên mọi người nên mua.'
  },
  {
    id: 6,
    username: 'Lê Văn F',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    rating: 2,
    date: '08/06/2025',
    content:
      'Đây là chiếc iPhone tốt nhất mà tôi từng dùng. Màn hình rất đẹp, hiệu năng mạnh mẽ. Dynamic Island là một tính năng thú vị. Khuyên mọi người nên mua.'
  },
  {
    id: 7,
    username: 'Lê Văn G',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    rating: 4,
    date: '08/06/2025',
    content:
      'Đây là chiếc iPhone tốt nhất mà tôi từng dùng. Màn hình rất đẹp, hiệu năng mạnh mẽ. Dynamic Island là một tính năng thú vị. Khuyên mọi người nên mua.'
  }
]

// Sample similar products
const similarProducts = [
  {
    id: 2,
    name: 'iPhone 13 Pro',
    price: 24990000,
    image: '/src/assets/products/detail.png'
  },
  {
    id: 3,
    name: 'Samsung Galaxy S23 Ultra',
    price: 26990000,
    image: '/src/assets/products/productimg.png'
  },
  {
    id: 4,
    name: 'Xiaomi 13 Pro',
    price: 19990000,
    image: '/src/assets/products/detail.png'
  }
]

function ProductDetail() {
  const { productId } = useParams()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError('ID sản phẩm không hợp lệ')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const response = await getProductById(productId)

        if (response.code === 200) {
          // Transform API data để phù hợp với component hiện tại
          const transformedProduct = {
            ...response.data,
            images: response.data.image ? [response.data.image] : [],
            colors: ['Đen', 'Trắng'], // Tạm thời hardcode, sẽ cập nhật API sau
            storage: ['128GB', '256GB'], // Tạm thời hardcode, sẽ cập nhật API sau
            numReviews: 0, // Sẽ được cập nhật khi có API reviews
            stock: response.data.countInStock,
            sold: response.data.selled || 0,
            brand: 'N/A', // Sẽ được thêm vào API sau
            category: response.data.type
          }
          setProduct(transformedProduct)
        } else {
          setError('Không thể tải thông tin sản phẩm')
        }
      } catch {
        setError('Có lỗi xảy ra khi tải dữ liệu')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  if (loading) {
    return (
      <Box sx={{ py: 4 }}>
        <Container maxWidth='xl'>
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        </Container>
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Container maxWidth='xl'>
          <Alert severity='error' sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Container>
      </Box>
    )
  }

  if (!product) {
    return (
      <Box sx={{ py: 4 }}>
        <Container maxWidth='xl'>
          <Alert severity='info' sx={{ mb: 2 }}>
            Không tìm thấy sản phẩm
          </Alert>
        </Container>
      </Box>
    )
  }

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth='xl'>
        {/* Breadcrumbs navigation */}
        <ProductBreadcrumbs product={product} />

        {/* Mobile Tabs */}
        {isMobile && (
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant='fullWidth'
            sx={{ mb: 2 }}
          >
            <Tab label='Thông tin sản phẩm' />
            <Tab label='Đánh giá' />
          </Tabs>
        )}

        {(!isMobile || activeTab === 0) && (
          <>
            {/* Row 1: Product images only */}
            <Box sx={{ mb: 4 }}>
              <Grid container justifyContent='center'>
                <Grid size={{ xs: 12, md: 8, lg: 8 }}>
                  <ProductGallery
                    images={product.images}
                    productName={product.name}
                  />
                </Grid>
              </Grid>
            </Box>
            {/* Row 2: Product info (left) and Buy box (right) */}
            <Box sx={{ mb: 4 }}>
              <Grid container spacing={2} justifyContent='center'>
                {/* Left column - Product details */}
                <Grid size={{ xs: 12, md: 8, lg: 8 }}>
                  <ProductInfo
                    product={product}
                    similarProducts={similarProducts}
                  />
                </Grid>

                {/* Right column - Buy box */}
                <Grid size={{ xs: 12, md: 4, lg: 4 }}>
                  {!isMobile ? (
                    <BuyBox product={product} />
                  ) : (
                    <MobileBuyBox product={product} />
                  )}
                </Grid>
              </Grid>
            </Box>
            {/* Row 3: Review section */}
            <ReviewSection product={product} reviews={sampleReviews} />
          </>
        )}

        {/* Reviews section - Only on mobile tab view */}
        {isMobile && activeTab === 1 && (
          <ReviewSection product={product} reviews={sampleReviews} />
        )}
      </Container>
    </Box>
  )
}

export default ProductDetail
