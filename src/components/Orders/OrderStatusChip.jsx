/* eslint-disable indent */
import { Chip } from '@mui/material'
import {
  Refresh,
  LocalShipping,
  CheckCircle,
  Cancel
} from '@mui/icons-material'
import {
  ORDER_STATUS,
  ORDER_STATUS_CONFIG,
  getOrderStatusConfig
} from '~/utils/orderConstants'

function OrderStatusChip({ status, paymentStatus }) {
  // Use new combined status config if paymentStatus is provided
  const config = paymentStatus
    ? getOrderStatusConfig(status, paymentStatus)
    : ORDER_STATUS_CONFIG[status] || {
        label: status,
        color: 'default'
      }

  // Add icons based on status
  let icon = null
  switch (status) {
    case ORDER_STATUS.PENDING:
    case ORDER_STATUS.PROCESSING:
      icon = <Refresh fontSize='small' />
      break
    case ORDER_STATUS.PAID:
    case ORDER_STATUS.COMPLETED:
      icon = <CheckCircle fontSize='small' />
      break
    case ORDER_STATUS.SHIPPED:
      icon = <LocalShipping fontSize='small' />
      break
    case ORDER_STATUS.CANCELLED:
      icon = <Cancel fontSize='small' />
      break
    default:
      icon = null
  }

  return (
    <Chip
      label={config.label}
      color={config.color}
      icon={icon}
      variant='filled'
      size='small'
      sx={{ fontWeight: 'medium' }}
    />
  )
}

export default OrderStatusChip
