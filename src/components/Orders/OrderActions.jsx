import { Button, Box } from '@mui/material'
import {
  Visibility,
  CheckCircle,
  LocalShipping,
  Cancel,
  Refresh
} from '@mui/icons-material'

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

      {/* Theo dõi đơn hàng - khi có mã vận đơn */}
      {order.trackingNumber && onTrackOrder && (
        <Button
          variant='contained'
          startIcon={<LocalShipping />}
          onClick={onTrackOrder}
          size={buttonSize}
        >
          Theo dõi
        </Button>
      )}

      {/* Đánh giá sản phẩm - khi đã giao hàng */}
      {order.status === 'delivered' && onReviewProduct && (
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

      {/* Hủy đơn hàng - khi đang xử lý */}
      {order.status === 'processing' && onCancelOrder && (
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
      {['cancelled', 'delivered'].includes(order.status) && onReorder && (
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
