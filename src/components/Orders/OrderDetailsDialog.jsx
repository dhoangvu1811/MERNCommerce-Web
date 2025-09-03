/* eslint-disable indent */
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
import { ORDER_STATUS } from '~/utils/orderConstants'
import { formatPrice, formatDate } from '~/utils/formatUtils'
import { getOrderProgressSteps } from '~/utils/orderConstants'

function OrderDetailsDialog({ open, order, onClose }) {
  if (!order) return null

  const getOrderSteps = () => {
    return getOrderProgressSteps(order.status, order.paymentStatus)
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
                {order.orderCode}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <OrderStatusChip
              status={order.status}
              paymentStatus={order.paymentStatus}
            />
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
                Mã đơn hàng: {order.orderCode}
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                Ngày đặt: {formatDate(order.orderDate, { withTime: true })}
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
                  Dự kiến giao:{' '}
                  {formatDate(order.estimatedDelivery, { withTime: true })}
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
            Sản phẩm đã đặt (
            {order.displayInfo?.totalItems || order.items.length} sản phẩm)
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
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ mb: 0.5 }}
                  >
                    Số lượng: {item.quantity}
                  </Typography>
                  {item.unitPrice && (
                    <Typography variant='body2' color='text.secondary'>
                      Đơn giá: {formatPrice(item.unitPrice)}
                      {item.discount > 0 && (
                        <Typography
                          component='span'
                          color='success.main'
                          sx={{ ml: 1 }}
                        >
                          (Giảm {item.discount}%)
                        </Typography>
                      )}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  {item.originalLineTotal > item.lineTotal && (
                    <Typography
                      variant='body2'
                      sx={{
                        textDecoration: 'line-through',
                        color: 'text.secondary',
                        mb: 0.5
                      }}
                    >
                      {formatPrice(item.originalLineTotal)}
                    </Typography>
                  )}
                  <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                    {formatPrice(item.lineTotal || item.price)}
                  </Typography>
                  {item.savings > 0 && (
                    <Typography variant='caption' color='success.main'>
                      Tiết kiệm: {formatPrice(item.savings)}
                    </Typography>
                  )}
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
              Chi tiết thanh toán
            </Typography>
          </Box>

          {/* Pricing Details */}
          {order.pricing && (
            <>
              {/* Hiển thị giá gốc trước giảm giá sản phẩm */}
              {order.pricing.originalTotal &&
                order.pricing.originalTotal > order.pricing.subtotal && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1
                    }}
                  >
                    <Typography variant='body2' color='text.secondary'>
                      Giá gốc (trước giảm):
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {formatPrice(order.pricing.originalTotal)}
                    </Typography>
                  </Box>
                )}

              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
              >
                <Typography variant='body2'>Tạm tính (sau giảm SP):</Typography>
                <Typography variant='body2'>
                  {formatPrice(order.pricing.subtotal)}
                </Typography>
              </Box>

              {/* Hiển thị giảm giá sản phẩm nếu có */}
              {order.items && order.items.some((item) => item.savings > 0) && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1
                  }}
                >
                  <Typography variant='body2' color='success.main'>
                    Giảm giá sản phẩm:
                  </Typography>
                  <Typography variant='body2' color='success.main'>
                    -
                    {formatPrice(
                      order.items.reduce(
                        (sum, item) => sum + (item.savings || 0),
                        0
                      )
                    )}
                  </Typography>
                </Box>
              )}

              {order.voucher && order.pricing.voucherDiscount > 0 && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1
                  }}
                >
                  <Typography variant='body2' color='success.main'>
                    Voucher ({order.voucher.code}):
                  </Typography>
                  <Typography variant='body2' color='success.main'>
                    -{formatPrice(order.pricing.voucherDiscount)}
                  </Typography>
                </Box>
              )}

              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
              >
                <Typography variant='body2'>Phí vận chuyển:</Typography>
                <Typography variant='body2'>
                  {order.pricing.shippingFee > 0
                    ? formatPrice(order.pricing.shippingFee)
                    : 'Miễn phí'}
                </Typography>
              </Box>

              {order.pricing.totalSavings > 0 && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2,
                    p: 1,
                    bgcolor: 'success.light',
                    borderRadius: 1
                  }}
                >
                  <Typography
                    variant='body2'
                    sx={{ fontWeight: 'medium', color: 'success.dark' }}
                  >
                    Tổng tiết kiệm:
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{ fontWeight: 'medium', color: 'success.dark' }}
                  >
                    -{formatPrice(order.pricing.totalSavings)}
                    {order.displayInfo?.savingsPercentage > 0 && (
                      <Typography
                        component='span'
                        variant='caption'
                        sx={{ ml: 0.5 }}
                      >
                        ({order.displayInfo.savingsPercentage}%)
                      </Typography>
                    )}
                  </Typography>
                </Box>
              )}
            </>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant='body2'>Phương thức thanh toán:</Typography>
            <Typography variant='body2' sx={{ fontWeight: 'medium' }}>
              {order.displayInfo?.paymentMethodText || order.paymentMethod}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              Tổng thanh toán:
            </Typography>
            <Typography
              variant='h6'
              sx={{ fontWeight: 'bold', color: 'primary.main' }}
            >
              {formatPrice(order.pricing?.finalTotal || order.total)}
            </Typography>
          </Box>

          {/* Voucher Information */}
          {order.voucher && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                bgcolor: 'info.light',
                borderRadius: 1,
                border: '1px dashed',
                borderColor: 'info.main'
              }}
            >
              <Typography
                variant='body2'
                sx={{ fontWeight: 'medium', color: 'info.dark', mb: 0.5 }}
              >
                Voucher đã áp dụng
              </Typography>
              <Typography variant='body2' color='info.dark'>
                <strong>{order.voucher.code}</strong> -{' '}
                {order.voucher.displayText}
              </Typography>
            </Box>
          )}
        </Paper>

        {/* Cancel Reason */}
        {order.status === ORDER_STATUS.CANCELLED && order.cancelReason && (
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
        {order.status === ORDER_STATUS.DELIVERED && (
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
