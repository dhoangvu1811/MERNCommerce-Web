import { Box, Typography, Avatar } from '@mui/material'

function OrderProductItem({ product, showQuantity = true, size = 'medium' }) {
  const avatarSize = size === 'small' ? 40 : size === 'large' ? 80 : 60

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Avatar
        src={product.image}
        variant='rounded'
        sx={{ width: avatarSize, height: avatarSize }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant={size === 'small' ? 'body2' : 'subtitle1'}
          sx={{ fontWeight: 'medium' }}
        >
          {product.name}
        </Typography>
        {showQuantity && (
          <Typography variant='body2' color='text.secondary'>
            Số lượng: {product.quantity}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default OrderProductItem
