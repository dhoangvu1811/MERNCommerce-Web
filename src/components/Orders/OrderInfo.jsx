import { Box, Typography } from '@mui/material'
import { Receipt } from '@mui/icons-material'
import { formatDate } from '~/utils/formatUtils'

function OrderInfo({ orderId, orderDate, compact = false }) {

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Receipt color='primary' />
      <Box>
        <Typography
          variant={compact ? 'subtitle2' : 'h6'}
          sx={{ fontWeight: 'bold' }}
        >
          {orderId}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Đặt hàng: {formatDate(orderDate)}
        </Typography>
      </Box>
    </Box>
  )
}

export default OrderInfo
