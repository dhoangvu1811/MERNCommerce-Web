import { useState } from 'react'
import {
  Box,
  Typography,
  Rating,
  Divider,
  Button,
  Chip,
  Link
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import SimilarProducts from './SimilarProducts'
import { formatPrice } from '../../utils/formatUtils'

function ProductInfo({ product, similarProducts }) {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '')
  const [selectedStorage, setSelectedStorage] = useState(
    product.storage?.[0] || ''
  )

  const shortDescription = product.description
    ? product.description.split('\n\n')[0] + '...'
    : 'Chưa có mô tả'

  const handleColorSelect = (color) => {
    setSelectedColor(color)
  }
  const handleStorageSelect = (storage) => {
    setSelectedStorage(storage)
  }

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        minHeight: 400,
        overflow: 'auto'
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant='subtitle2' color='text.secondary' sx={{ mb: 1 }}>
          Thương hiệu: <Link href='#'>{product.brand}</Link>
        </Typography>
        <Typography variant='h4' component='h1' sx={{ fontWeight: 'bold' }}>
          {product.name}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Rating value={product.rating} precision={0.1} readOnly />
        <Typography variant='body2' sx={{ ml: 1 }}>
          ({product.numReviews} đánh giá)
        </Typography>
        <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
          <Typography variant='body2' color='text.secondary'>
            Đã bán: {product.sold}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
          <Typography
            variant='h4'
            color='primary.main'
            sx={{ fontWeight: 'bold' }}
          >
            {formatPrice(product.price)}
          </Typography>
          {product.originalPrice > product.price && (
            <>
              <Typography
                variant='body1'
                color='text.secondary'
                sx={{ ml: 2, textDecoration: 'line-through' }}
              >
                {formatPrice(product.originalPrice)}
              </Typography>
              <Chip
                label={`-${product.discount}%`}
                color='error'
                size='small'
                sx={{ ml: 2 }}
              />
            </>
          )}
        </Box>
        <Typography variant='body2' color='success.main'>
          Còn {product.stock} sản phẩm
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      {/* Colors */}
      {product.colors && product.colors.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant='subtitle1' fontWeight='bold' gutterBottom>
            Màu sắc
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {product.colors.map((color) => (
              <Chip
                key={color}
                label={color}
                onClick={() => handleColorSelect(color)}
                color={selectedColor === color ? 'primary' : 'default'}
                sx={{
                  borderRadius: 1,
                  fontWeight: selectedColor === color ? 'bold' : 'normal'
                }}
              />
            ))}
          </Box>
        </Box>
      )}
      {/* Storage */}
      {product.storage && product.storage.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant='subtitle1' fontWeight='bold' gutterBottom>
            Dung lượng
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {product.storage.map((storage) => (
              <Chip
                key={storage}
                label={storage}
                onClick={() => handleStorageSelect(storage)}
                color={selectedStorage === storage ? 'primary' : 'default'}
                sx={{
                  borderRadius: 1,
                  fontWeight: selectedStorage === storage ? 'bold' : 'normal'
                }}
              />
            ))}
          </Box>
        </Box>
      )}
      <Divider sx={{ my: 2 }} /> {/* Product description */}
      <Box sx={{ mb: 3, minHeight: 150 }}>
        <Typography variant='subtitle1' fontWeight='bold' gutterBottom>
          Mô tả sản phẩm
        </Typography>
        <Box sx={{ position: 'relative' }}>
          <Typography
            variant='body2'
            sx={{ whiteSpace: 'pre-line', minHeight: 80 }}
          >
            {showFullDescription ? product.description : shortDescription}
          </Typography>
          <Button
            endIcon={
              showFullDescription ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )
            }
            onClick={() => setShowFullDescription(!showFullDescription)}
            sx={{ mt: 1, px: 0 }}
          >
            {showFullDescription ? 'Thu gọn' : 'Xem thêm'}
          </Button>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      {/* Shipping & warranty info */}
      <Box sx={{ mb: 3 }}>
        <Typography variant='subtitle1' fontWeight='bold' gutterBottom>
          Thông tin vận chuyển
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocalShippingOutlinedIcon color='primary' sx={{ mr: 1 }} />
          <Typography variant='body2'>
            Giao hàng miễn phí trong vòng 24h
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <VerifiedUserOutlinedIcon color='primary' sx={{ mr: 1 }} />
          <Typography variant='body2'>Bảo hành chính hãng 12 tháng</Typography>
        </Box>
      </Box>
      {/* Similar products */}
      {similarProducts && similarProducts.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Divider sx={{ mb: 3 }} />
          <Typography variant='h6' fontWeight='bold' gutterBottom>
            Sản phẩm tương tự
          </Typography>
          <Box sx={{ mt: 2 }}>
            <SimilarProducts products={similarProducts} />
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default ProductInfo
