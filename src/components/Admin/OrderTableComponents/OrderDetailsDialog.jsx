import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Box,
  Chip,
  Divider
} from '@mui/material'
import { formatPrice } from '../../../utils/formatUtils'

const OrderDetailsDialog = ({ open, onClose, selectedOrder, onPrint }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>Chi tiết đơn hàng #{selectedOrder?.id}</DialogTitle>
      <DialogContent>
        {selectedOrder && (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              {/* Thông tin khách hàng */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant='h6' gutterBottom color='primary'>
                  Thông tin khách hàng
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant='body2' color='text.secondary'>
                    Tên khách hàng:
                  </Typography>
                  <Typography variant='body1' fontWeight='medium'>
                    {selectedOrder.userName}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant='body2' color='text.secondary'>
                    Số điện thoại:
                  </Typography>
                  <Typography variant='body1' fontWeight='medium'>
                    {selectedOrder.phone}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant='body2' color='text.secondary'>
                    Địa chỉ giao hàng:
                  </Typography>
                  <Typography variant='body1' fontWeight='medium'>
                    {selectedOrder.address}
                  </Typography>
                </Box>
              </Grid>

              {/* Thông tin đơn hàng */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant='h6' gutterBottom color='primary'>
                  Thông tin đơn hàng
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant='body2' color='text.secondary'>
                    Ngày đặt hàng:
                  </Typography>
                  <Typography variant='body1' fontWeight='medium'>
                    {selectedOrder.orderDate}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant='body2' color='text.secondary'>
                    Phương thức thanh toán:
                  </Typography>
                  <Typography variant='body1' fontWeight='medium'>
                    {selectedOrder.paymentMethod}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant='body2' color='text.secondary'>
                    Trạng thái thanh toán:
                  </Typography>
                  <Chip
                    label={
                      selectedOrder.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'
                    }
                    color={selectedOrder.isPaid ? 'success' : 'warning'}
                    size='small'
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant='body2' color='text.secondary'>
                    Trạng thái vận chuyển:
                  </Typography>
                  <Chip
                    label={
                      selectedOrder.isShipped
                        ? 'Đã giao hàng'
                        : 'Đang vận chuyển'
                    }
                    color={selectedOrder.isShipped ? 'success' : 'info'}
                    size='small'
                  />
                </Box>
              </Grid>

              {/* Tổng tiền */}
              <Grid size={{ xs: 12 }}>
                <Divider sx={{ my: 2 }} />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    bgcolor: 'grey.50',
                    p: 2,
                    borderRadius: 1
                  }}
                >
                  <Typography variant='h6' color='primary'>
                    Tổng tiền:
                  </Typography>
                  <Typography variant='h5' color='error' fontWeight='bold'>
                    {formatPrice(selectedOrder.totalPrice)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Đóng
        </Button>
        <Button
          onClick={() => onPrint(selectedOrder?.id)}
          color='secondary'
          variant='contained'
        >
          In hóa đơn
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default OrderDetailsDialog
