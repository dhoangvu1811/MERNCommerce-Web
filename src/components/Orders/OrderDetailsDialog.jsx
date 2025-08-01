import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Divider,
  Grid,
  Avatar,
  Paper,
  IconButton,
  Stepper,
  Step,
  StepLabel
} from '@mui/material'
import {
  Close,
  Receipt,
  LocalShipping,
  Person,
  Payment,
  CheckCircle
} from '@mui/icons-material'
import OrderStatusChip from './OrderStatusChip'

function OrderDetailsDialog({ open, order, onClose }) {
  if (!order) return null

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getOrderSteps = () => {
    const steps = [
      { label: 'Đơn hàng được tạo', completed: true },
      { label: 'Xác nhận thanh toán', completed: true },
      { label: 'Đang chuẩn bị hàng', completed: order.status !== 'cancelled' },
      {
        label: 'Đang giao hàng',
        completed: ['shipping', 'delivered'].includes(order.status)
      },
      { label: 'Đã giao thành công', completed: order.status === 'delivered' }
    ]

    if (order.status === 'cancelled') {
      return [
        { label: 'Đơn hàng được tạo', completed: true },
        { label: 'Đơn hàng bị hủy', completed: true, error: true }
      ]
    }

    return steps
  }

  const steps = getOrderSteps()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Receipt color='primary' />
            <Box>
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                Chi tiết đơn hàng
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {order.id}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <OrderStatusChip status={order.status} />
            <IconButton onClick={onClose} size='small'>
              <Close />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {/* Order Progress */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold' }}>
            Trạng thái đơn hàng
          </Typography>
          <Stepper
            activeStep={steps.findIndex((step) => !step.completed)}
            alternativeLabel
          >
            {steps.map((step, index) => (
              <Step key={index} completed={step.completed}>
                <StepLabel
                  error={step.error}
                  sx={{
                    '& .MuiStepLabel-label': {
                      fontSize: '0.75rem'
                    }
                  }}
                >
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {/* Order Info */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
              >
                <Receipt color='primary' />
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                  Thông tin đơn hàng
                </Typography>
              </Box>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                Mã đơn hàng: {order.id}
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                Ngày đặt: {formatDate(order.orderDate)}
              </Typography>
              {order.trackingNumber && (
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ mb: 1 }}
                >
                  Mã vận đơn: {order.trackingNumber}
                </Typography>
              )}
              {order.estimatedDelivery && (
                <Typography variant='body2' color='text.secondary'>
                  Dự kiến giao: {formatDate(order.estimatedDelivery)}
                </Typography>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
              >
                <Person color='primary' />
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                  Địa chỉ giao hàng
                </Typography>
              </Box>
              <Typography variant='body2' sx={{ mb: 1, fontWeight: 'medium' }}>
                {order.shippingAddress.name}
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                {order.shippingAddress.phone}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {order.shippingAddress.address}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Products */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold' }}>
            Sản phẩm đã đặt
          </Typography>
          {order.items.map((item, index) => (
            <Box key={item.id}>
              <Box sx={{ display: 'flex', gap: 2, py: 2 }}>
                <Avatar
                  src={item.image}
                  variant='rounded'
                  sx={{ width: 60, height: 60 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant='subtitle1' sx={{ fontWeight: 'medium' }}>
                    {item.name}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Số lượng: {item.quantity}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                    {formatPrice(item.price)}
                  </Typography>
                </Box>
              </Box>
              {index < order.items.length - 1 && <Divider />}
            </Box>
          ))}
        </Paper>

        {/* Payment Summary */}
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Payment color='primary' />
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              Thanh toán
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant='body2'>Phương thức thanh toán:</Typography>
            <Typography variant='body2' sx={{ fontWeight: 'medium' }}>
              {order.paymentMethod}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              Tổng cộng:
            </Typography>
            <Typography
              variant='h6'
              sx={{ fontWeight: 'bold', color: 'primary.main' }}
            >
              {formatPrice(order.total)}
            </Typography>
          </Box>
        </Paper>

        {/* Cancel Reason */}
        {order.status === 'cancelled' && order.cancelReason && (
          <Paper
            sx={{
              p: 3,
              mt: 3,
              bgcolor: 'error.light',
              color: 'error.contrastText'
            }}
          >
            <Typography variant='h6' sx={{ mb: 1, fontWeight: 'bold' }}>
              Lý do hủy đơn
            </Typography>
            <Typography variant='body2'>{order.cancelReason}</Typography>
          </Paper>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant='outlined'>
          Đóng
        </Button>
        {order.status === 'delivered' && (
          <Button variant='contained' startIcon={<CheckCircle />}>
            Đánh giá sản phẩm
          </Button>
        )}
        {order.trackingNumber && (
          <Button variant='contained' startIcon={<LocalShipping />}>
            Theo dõi đơn hàng
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default OrderDetailsDialog
