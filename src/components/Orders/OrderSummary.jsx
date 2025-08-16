import { Box, Typography } from '@mui/material'
import { formatPrice } from '~/utils/formatUtils'

function OrderSummary({ total, paymentMethod, textAlign = 'left' }) {

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
