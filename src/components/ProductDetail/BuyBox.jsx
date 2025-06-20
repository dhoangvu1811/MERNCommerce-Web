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
import { formatPrice } from '../../utils/formatUtils'

function BuyBox({ product }) {
  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) =>
      Math.max(1, Math.min(product.stock, prevQuantity + change))
    )
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
              disabled={quantity >= product.stock}
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
            <Typography variant='body2'>
              {formatPrice(product.price)}
            </Typography>
          </Box>
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
              {formatPrice(product.price * quantity)}
            </Typography>
          </Box>
        </Box>

        {/* Action buttons */}
        <Stack spacing={2}>
          <Button variant='contained' size='large' fullWidth sx={{ py: 1.5 }}>
            Mua ngay
          </Button>
          <Button variant='outlined' size='large' fullWidth sx={{ py: 1.5 }}>
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
    </Box>
  )
}

export default BuyBox
