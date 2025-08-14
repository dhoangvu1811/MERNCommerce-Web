import { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  Divider,
  Paper,
  Stack
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShareIcon from '@mui/icons-material/Share'
import { formatPrice, calculateDiscountedPrice } from '../../utils/formatUtils'
import { useAuth } from '~/hooks/useAuth'
import { useDispatch } from 'react-redux'
import { addItem } from '~/redux/slices/orderSlice'
import LoginDialog from '~/components/auth/LoginDialog'

function BuyBox({ product }) {
  const [quantity, setQuantity] = useState(1)
  const { isAuthenticated } = useAuth()
  const dispatch = useDispatch()
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)

  // Tính giá sau giảm giá
  const discountedPrice = calculateDiscountedPrice(
    product.price,
    product.discount || 0
  )
  // Giá hiển thị cho người dùng (giá sau giảm giá nếu có, không thì giá gốc)
  const displayPrice = product.discount > 0 ? discountedPrice : product.price

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) =>
      Math.max(1, Math.min(product.countInStock, prevQuantity + change))
    )
  }

  const ensureAuthOrPrompt = () => {
    if (!isAuthenticated) {
      setLoginDialogOpen(true)
      return false
    }
    return true
  }

  const handleAddToCart = () => {
    if (!ensureAuthOrPrompt()) return
    dispatch(
      addItem({
        product: {
          ...product,
          // đảm bảo các field order slice cần
          countInStock: product.countInStock,
          price: product.price, // Giá gốc
          discountedPrice: discountedPrice, // Giá sau giảm giá
          image: product.images?.[0] || product.image,
          discount: product.discount
        },
        quantity
      })
    )
  }

  const handleBuyNow = () => {
    if (!ensureAuthOrPrompt()) return
    // Thực tế có thể điều hướng tới trang checkout, ở đây chỉ thêm vào giỏ
    dispatch(
      addItem({
        product: {
          ...product,
          countInStock: product.countInStock,
          price: product.price, // Giá gốc
          discountedPrice: discountedPrice, // Giá sau giảm giá
          image: product.images?.[0] || product.image,
          discount: product.discount
        },
        quantity
      })
    )
    // TODO: điều hướng tới /cart hoặc /checkout sau khi có route
  }

  return (
    <Box sx={{ position: 'sticky', top: 100 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          minHeight: 400,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography variant='h6' fontWeight='bold' gutterBottom>
          Tạm tính
        </Typography>

        {/* Quantity selector */}
        <Box sx={{ mb: 3 }}>
          <Typography variant='body2' gutterBottom>
            Số lượng
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size='small'
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              <RemoveIcon fontSize='small' />
            </IconButton>
            <TextField
              size='small'
              value={quantity}
              inputProps={{
                readOnly: true,
                style: { textAlign: 'center', width: '40px' }
              }}
              sx={{ mx: 1 }}
            />
            <IconButton
              size='small'
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product.countInStock}
            >
              <AddIcon fontSize='small' />
            </IconButton>
          </Box>
        </Box>

        {/* Price summary */}
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 1
            }}
          >
            <Typography variant='body2'>Đơn giá:</Typography>
            <Typography variant='body2'>{formatPrice(displayPrice)}</Typography>
          </Box>
          {product.discount > 0 && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 1
              }}
            >
              <Typography variant='body2' color='text.secondary'>
                Giá gốc:
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ textDecoration: 'line-through' }}
              >
                {formatPrice(product.price)}
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 2
            }}
          >
            <Typography variant='body2'>Số lượng:</Typography>
            <Typography variant='body2'>{quantity}</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 1
            }}
          >
            <Typography variant='body1' fontWeight='bold'>
              Tổng tiền:
            </Typography>
            <Typography variant='body1' fontWeight='bold' color='primary'>
              {formatPrice(displayPrice * quantity)}
            </Typography>
          </Box>
        </Box>

        {/* Action buttons */}
        <Stack spacing={2}>
          <Button
            variant='contained'
            size='large'
            fullWidth
            sx={{ py: 1.5 }}
            onClick={handleBuyNow}
          >
            Mua ngay
          </Button>
          <Button
            variant='outlined'
            size='large'
            fullWidth
            sx={{ py: 1.5 }}
            onClick={handleAddToCart}
          >
            Thêm vào giỏ hàng
          </Button>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant='outlined'
              color='secondary'
              sx={{ flex: 1 }}
              startIcon={<FavoriteBorderIcon />}
            >
              Yêu thích
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              sx={{ flex: 1 }}
              startIcon={<ShareIcon />}
            >
              Chia sẻ
            </Button>
          </Box>
        </Stack>
      </Paper>
      <LoginDialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
        onSuccess={() => setLoginDialogOpen(false)}
        onSwitchToRegister={() => setLoginDialogOpen(false)}
      />
    </Box>
  )
}

export default BuyBox
