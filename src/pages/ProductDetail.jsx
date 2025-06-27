import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Grid,
  Container,
  Box,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab
} from '@mui/material'
import ProductBreadcrumbs from '~/components/ProductDetail/ProductBreadcrumbs'
import ProductGallery from '~/components/ProductDetail/ProductGallery'
import ProductInfo from '~/components/ProductDetail/ProductInfo'
import ReviewSection from '~/components/ProductDetail/ReviewSection'
import MobileBuyBox from '~/components/ProductDetail/MobileBuyBox'
import BuyBox from '~/components/ProductDetail/BuyBox'

// Sample product data
const sampleProduct = {
  id: 1,
  name: 'iPhone 14 Pro Max 128GB',
  price: 28990000,
  originalPrice: 32990000,
  discount: 12,
  rating: 4.8,
  numReviews: 183,
  stock: 15,
  sold: 256,
  brand: 'Apple',
  category: 'Điện thoại',
  images: [
    '/src/assets/products/iphone-1.jpg',
    '/src/assets/products/iphone-2.jpg',
    '/src/assets/products/iphone-3.jpg',
    '/src/assets/products/iphone-4.jpg',
    '/src/assets/products/iphone-5.jpg',
    '/src/assets/products/detail.png',
    '/src/assets/products/productimg.png'
  ],
  colors: ['Đen', 'Trắng', 'Vàng', 'Tím'],
  storage: ['128GB', '256GB', '512GB', '1TB'],
  description: `iPhone 14 Pro Max là chiếc điện thoại cao cấp nhất của Apple, mang đến những công nghệ đột phá và trải nghiệm cao cấp nhất cho người dùng.

Dynamic Island là tính năng mới thay thế thiết kế "tai thỏ". Giờ đây, các thông báo và hoạt động sẽ hiển thị ở khu vực này một cách liền mạch và sinh động.

Camera chính 48MP là một nâng cấp lớn, cho phép chụp ảnh sắc nét hơn, zoom quang học chất lượng cao và khả năng chụp thiếu sáng vượt trội.

Chip A16 Bionic mới nhất của Apple mang đến hiệu suất mạnh mẽ, đồng thời tiết kiệm năng lượng hơn, cho phép bạn sử dụng điện thoại cả ngày dài.

Màn hình Always-On là tính năng mới trên dòng iPhone 14 Pro, giúp bạn xem thông tin nhanh chóng mà không cần mở khóa máy.

iOS 16 mang đến nhiều tính năng mới như tùy chỉnh màn hình khóa, gửi tin nhắn đã sửa, và nhiều tính năng riêng tư và bảo mật hơn.`
}

// Sample reviews
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
  // eslint-disable-next-line no-unused-vars
  const { productId } = useParams()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // Product data - would normally fetch based on productId
  const product = sampleProduct
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
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
