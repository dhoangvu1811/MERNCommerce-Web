import { Box, Typography } from '@mui/material'
import { LocalShipping } from '@mui/icons-material'
import { formatDate } from '~/utils/formatUtils'

function OrderTrackingInfo({ trackingNumber, estimatedDelivery }) {

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
