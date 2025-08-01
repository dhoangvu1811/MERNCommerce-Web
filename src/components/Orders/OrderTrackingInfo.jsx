import { Box, Typography } from '@mui/material'
import { LocalShipping } from '@mui/icons-material'

function OrderTrackingInfo({ trackingNumber, estimatedDelivery }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!trackingNumber && !estimatedDelivery) {
    return null
  }

  return (
    <Box>
      {trackingNumber && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocalShipping color='action' fontSize='small' />
          <Typography variant='body2' color='text.secondary'>
            Mã vận đơn: {trackingNumber}
          </Typography>
        </Box>
      )}
      {estimatedDelivery && (
        <Typography variant='body2' color='text.secondary'>
          Dự kiến giao: {formatDate(estimatedDelivery)}
        </Typography>
      )}
    </Box>
  )
}

export default OrderTrackingInfo
