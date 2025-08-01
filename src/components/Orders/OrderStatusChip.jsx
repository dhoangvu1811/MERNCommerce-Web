/* eslint-disable indent */
import { Chip } from '@mui/material'
import {
  Refresh,
  LocalShipping,
  CheckCircle,
  Cancel
} from '@mui/icons-material'

function OrderStatusChip({ status }) {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'processing':
        return {
          label: 'Đang xử lý',
          color: 'warning',
          icon: <Refresh fontSize='small' />
        }
      case 'shipping':
        return {
          label: 'Đang giao hàng',
          color: 'info',
          icon: <LocalShipping fontSize='small' />
        }
      case 'delivered':
        return {
          label: 'Đã giao hàng',
          color: 'success',
          icon: <CheckCircle fontSize='small' />
        }
      case 'cancelled':
        return {
          label: 'Đã hủy',
          color: 'error',
          icon: <Cancel fontSize='small' />
        }
      default:
        return {
          label: 'Không xác định',
          color: 'default',
          icon: null
        }
    }
  }

  const config = getStatusConfig(status)

  return (
    <Chip
      label={config.label}
      color={config.color}
      icon={config.icon}
      variant='filled'
      size='small'
      sx={{ fontWeight: 'medium' }}
    />
  )
}

export default OrderStatusChip
