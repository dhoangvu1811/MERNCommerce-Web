import { Box, Typography } from '@mui/material'

function OrderSummary({ total, paymentMethod, textAlign = 'left' }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  return (
    <Box sx={{ textAlign }}>
      <Typography
        variant='h6'
        sx={{ fontWeight: 'bold', color: 'primary.main' }}
      >
        {formatPrice(total)}
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        {paymentMethod}
      </Typography>
    </Box>
  )
}

export default OrderSummary
