import { Button, Box } from '@mui/material'
import {
  Visibility,
  LocalShipping,
  CheckCircle,
  Cancel,
  Refresh
} from '@mui/icons-material'
import { ORDER_STATUS, isOrderCancellable } from '~/utils/orderConstants'

function OrderActions({
  order,
  onViewDetails,
  onTrackOrder,
  onReviewProduct,
  onCancelOrder,
  onReorder,
  compact = false
}) {
  const buttonSize = compact ? 'small' : 'medium'

  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {/* Xem chi tiết - luôn hiển thị */}
      <Button
        variant='outlined'
        startIcon={<Visibility />}
        onClick={onViewDetails}
        size={buttonSize}
      >
        Xem chi tiết
      </Button>

      {/* Theo dõi đơn hàng - khi đã shipped và có mã vận đơn */}
      {[ORDER_STATUS.SHIPPED, ORDER_STATUS.COMPLETED].includes(order.status) &&
       order.trackingNumber && onTrackOrder && (
        <Button
          variant='contained'
          startIcon={<LocalShipping />}
          onClick={onTrackOrder}
          size={buttonSize}
        >
          Theo dõi
        </Button>
      )}

      {/* Đánh giá sản phẩm - khi đã hoàn thành và thanh toán */}
      {order.status === ORDER_STATUS.COMPLETED &&
       order.paymentStatus === 'paid' && onReviewProduct && (
        <Button
          variant='contained'
          color='success'
          startIcon={<CheckCircle />}
          onClick={onReviewProduct}
          size={buttonSize}
        >
          Đánh giá
        </Button>
      )}

      {/* Hủy đơn hàng - khi có thể hủy (pending/unpaid hoặc paid/paid) */}
      {isOrderCancellable(order.status, order.paymentStatus) && onCancelOrder && (
        <Button
          variant='outlined'
          color='error'
          startIcon={<Cancel />}
          onClick={onCancelOrder}
          size={buttonSize}
        >
          Hủy đơn
        </Button>
      )}

      {/* Đặt lại - khi đã hủy hoặc đã giao */}
      {[ORDER_STATUS.CANCELLED, ORDER_STATUS.COMPLETED].includes(order.status) && onReorder && (
        <Button
          variant='contained'
          color='primary'
          startIcon={<Refresh />}
          onClick={onReorder}
          size={buttonSize}
        >
          Đặt lại
        </Button>
      )}
    </Box>
  )
}

export default OrderActions
