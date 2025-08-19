/* eslint-disable indent */
import React, { useState, useEffect } from 'react'
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
  Divider,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Avatar
} from '@mui/material'
import { formatPrice, formatDate } from '../../../utils/formatUtils'
import { getOrderStatusConfig } from '../../../utils/orderConstants'
import { getAdminOrderDetails } from '../../../apis/orderApi'

const OrderDetailsDialog = ({ open, onClose, selectedOrder, onPrint }) => {
  const [orderDetails, setOrderDetails] = useState(null)
  const [loading, setLoading] = useState(false)

  // Load detailed order information when dialog opens
  useEffect(() => {
    if (open && selectedOrder?._id) {
      loadOrderDetails(selectedOrder._id)
    }
  }, [open, selectedOrder])

  const loadOrderDetails = async (orderId) => {
    try {
      setLoading(true)

      const response = await getAdminOrderDetails(orderId)

      if (response.success) {
        setOrderDetails(response.data)
      }
    } catch {
      // Error handling is centralized in axiosConfig.js
      setOrderDetails(null)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setOrderDetails(null)
    onClose()
  }

  const order = orderDetails || selectedOrder
  const statusConfig = order
    ? getOrderStatusConfig(order.status, order.paymentStatus)
    : null
  // Calculate discounts
  const voucherDiscount = order?.voucher?.discountApplied || 0
  const itemsGross = Array.isArray(order?.items)
    ? order.items.reduce(
        (sum, it) => sum + (it.unitPrice || 0) * (it.quantity || 0),
        0
      )
    : 0
  const itemsNet = Array.isArray(order?.items)
    ? order.items.reduce((sum, it) => sum + (it.lineTotal || 0), 0)
    : 0
  const itemDiscount = Math.max(itemsGross - itemsNet, 0)
  const paymentMethodLabel = (method) => {
    if (!method) return 'N/A'
    const map = {
      cod: 'Thanh toán khi nhận hàng',
      ewallet: 'Ví điện tử',
      banking: 'Chuyển khoản',
      credit_card: 'Thẻ tín dụng'
    }
    return map[method] || method
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='lg' fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          gap={2}
        >
          <Box>
            <Typography variant='h6' fontWeight={700}>
              Chi tiết đơn hàng #
              {order?.orderNumber || order?._id?.slice(-8) || 'N/A'}
            </Typography>
            {order?.createdAt && (
              <Typography variant='caption' color='text.secondary'>
                Tạo lúc: {formatDate(order.createdAt, { withTime: true })}
              </Typography>
            )}
          </Box>
          {statusConfig && (
            <Chip
              label={statusConfig.label}
              color={statusConfig.color}
              size='small'
            />
          )}
        </Stack>
      </DialogTitle>
      <DialogContent>
        {loading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '200px'
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {order && !loading && (
          <Box sx={{ mt: 1 }}>
            <Grid container spacing={3}>
              {/* Thông tin khách hàng */}
              <Grid item xs={12} md={6}>
                <Paper variant='outlined' sx={{ p: 2, borderRadius: 2 }}>
                  <Typography
                    variant='subtitle1'
                    gutterBottom
                    color='primary'
                    fontWeight={700}
                  >
                    Thông tin khách hàng
                  </Typography>
                  <Stack
                    direction='row'
                    spacing={2}
                    alignItems='center'
                    sx={{ mb: 1 }}
                  >
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {(order.shippingAddress?.name || 'N')[0]}
                    </Avatar>
                    <Box>
                      <Typography variant='body1' fontWeight='medium'>
                        {order.shippingAddress?.name || 'N/A'}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {order.shippingAddress?.phone || 'N/A'}
                      </Typography>
                    </Box>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                  <Box>
                    <Typography variant='body2' color='text.secondary'>
                      Địa chỉ giao hàng
                    </Typography>
                    <Typography variant='body1' fontWeight='medium'>
                      {order.shippingAddress?.fullAddress || 'N/A'}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              {/* Thông tin đơn hàng */}
              <Grid item xs={12} md={6}>
                <Paper variant='outlined' sx={{ p: 2, borderRadius: 2 }}>
                  <Typography
                    variant='subtitle1'
                    gutterBottom
                    color='primary'
                    fontWeight={700}
                  >
                    Thông tin đơn hàng
                  </Typography>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant='body2' color='text.secondary'>
                      Ngày đặt hàng
                    </Typography>
                    <Typography variant='body1' fontWeight='medium'>
                      {formatDate(order.createdAt, { withTime: true })}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant='body2' color='text.secondary'>
                      Phương thức thanh toán
                    </Typography>
                    <Chip
                      label={paymentMethodLabel(order.paymentMethod)}
                      size='small'
                      color='default'
                      variant='outlined'
                    />
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant='body2' color='text.secondary'>
                      Trạng thái đơn hàng
                    </Typography>
                    {statusConfig && (
                      <Chip
                        label={statusConfig.label}
                        color={statusConfig.color}
                        size='small'
                      />
                    )}
                  </Box>
                  {order.notes && (
                    <Box sx={{ mb: 1 }}>
                      <Typography variant='body2' color='text.secondary'>
                        Ghi chú
                      </Typography>
                      <Typography variant='body1' fontWeight='medium'>
                        {order.notes}
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </Grid>

              {/* Danh sách sản phẩm */}
              {order.items && order.items.length > 0 && (
                <Grid item xs={12}>
                  <Typography
                    variant='subtitle1'
                    gutterBottom
                    color='primary'
                    fontWeight={700}
                  >
                    Danh sách sản phẩm
                  </Typography>
                  <TableContainer
                    component={Paper}
                    variant='outlined'
                    sx={{ borderRadius: 2, maxHeight: 380 }}
                  >
                    <Table size='small' stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell>Sản phẩm</TableCell>
                          <TableCell align='center'>Số lượng</TableCell>
                          <TableCell align='right'>Giảm (%)</TableCell>
                          <TableCell align='right'>Đơn giá</TableCell>
                          <TableCell align='right'>Thành tiền</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {order.items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Box
                                sx={{ display: 'flex', alignItems: 'center' }}
                              >
                                {item.image && (
                                  <Box
                                    component='img'
                                    src={item.image}
                                    alt={item.name}
                                    sx={{
                                      width: 44,
                                      height: 44,
                                      mr: 2,
                                      objectFit: 'cover',
                                      borderRadius: 1,
                                      border: '1px solid',
                                      borderColor: 'divider'
                                    }}
                                  />
                                )}
                                <Box>
                                  <Typography
                                    variant='body2'
                                    fontWeight='medium'
                                  >
                                    {item.name || 'N/A'}
                                  </Typography>
                                  <Typography
                                    variant='caption'
                                    color='text.secondary'
                                  >
                                    ID: {item.productId}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell align='center'>
                              {item.quantity}
                            </TableCell>
                            <TableCell align='right'>
                              {`${item.discount ?? 0}%`}
                            </TableCell>
                            <TableCell align='right'>
                              {formatPrice(item.unitPrice)}
                            </TableCell>
                            <TableCell align='right'>
                              {formatPrice(item.lineTotal)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              )}

              {/* Tổng tiền */}
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                {order.totals && (
                  <Grid container spacing={2} sx={{ mb: 1 }}>
                    <Grid item xs={12} md={7}>
                      <Paper variant='outlined' sx={{ p: 2, borderRadius: 2 }}>
                        <Stack spacing={1}>
                          {itemDiscount > 0 && (
                            <Stack
                              direction='row'
                              justifyContent='space-between'
                            >
                              <Typography variant='body2'>
                                Giá gốc (trước giảm)
                              </Typography>
                              <Typography variant='body2'>
                                {formatPrice(itemsGross)}
                              </Typography>
                            </Stack>
                          )}
                          <Stack direction='row' justifyContent='space-between'>
                            <Typography variant='body2'>
                              Tạm tính (sau giảm giá SP)
                            </Typography>
                            <Typography variant='body2'>
                              {formatPrice(order.totals.subtotal || 0)}
                            </Typography>
                          </Stack>
                          <Stack direction='row' justifyContent='space-between'>
                            <Typography variant='body2'>
                              Phí vận chuyển
                            </Typography>
                            <Typography variant='body2'>
                              {formatPrice(order.totals.shippingFee || 0)}
                            </Typography>
                          </Stack>

                          {voucherDiscount > 0 && (
                            <Stack
                              direction='row'
                              justifyContent='space-between'
                            >
                              <Typography variant='body2'>
                                Giảm giá voucher ({order.voucher.code})
                              </Typography>
                              <Typography variant='body2' color='success.main'>
                                -{formatPrice(voucherDiscount)}
                              </Typography>
                            </Stack>
                          )}
                        </Stack>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <Paper
                        variant='outlined'
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          height: '100%',
                          bgcolor: 'grey.50'
                        }}
                      >
                        <Stack
                          direction='row'
                          alignItems='center'
                          justifyContent='space-between'
                        >
                          <Typography
                            variant='subtitle1'
                            color='primary'
                            fontWeight={700}
                          >
                            Tổng tiền
                          </Typography>
                          <Typography
                            variant='h5'
                            color='error'
                            fontWeight='bold'
                          >
                            {formatPrice(order.totals?.payable || 0)}
                          </Typography>
                        </Stack>
                      </Paper>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Đóng
        </Button>
        <Button
          onClick={() => onPrint(order?._id)}
          color='secondary'
          variant='contained'
          disabled={!order}
        >
          In hóa đơn
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default OrderDetailsDialog
