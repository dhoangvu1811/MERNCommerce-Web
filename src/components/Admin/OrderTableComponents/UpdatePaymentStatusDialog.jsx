import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
  Box,
  Typography,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from '@mui/material'
import { getPaymentStatusOptions } from '../../../utils/orderStatusHelpers'

const UpdatePaymentStatusDialog = ({
  open,
  onClose,
  onConfirm,
  order,
  newPaymentStatus,
  onPaymentStatusChange,
  actionLoading
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Cập nhật trạng thái thanh toán</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Thay đổi trạng thái thanh toán đơn hàng #
          {order?.orderCode || order?._id}
        </DialogContentText>

        {/* Hiển thị trạng thái thanh toán hiện tại */}
        <Box sx={{ mb: 3, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
          <Typography variant='body2' color='text.secondary' gutterBottom>
            Trạng thái thanh toán hiện tại:
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={
                getPaymentStatusOptions(
                  order?.paymentStatus,
                  order?.status
                ).find((opt) => opt.value === order?.paymentStatus)?.label ||
                order?.paymentStatus
              }
              color={
                getPaymentStatusOptions(
                  order?.paymentStatus,
                  order?.status
                ).find((opt) => opt.value === order?.paymentStatus)?.color ||
                'default'
              }
              size='medium'
              sx={{ fontWeight: 600 }}
            />
          </Box>
        </Box>

        <FormControl fullWidth>
          <InputLabel>Chọn trạng thái thanh toán mới</InputLabel>
          <Select
            value={newPaymentStatus}
            label='Chọn trạng thái thanh toán mới'
            onChange={onPaymentStatusChange}
          >
            {getPaymentStatusOptions(order?.paymentStatus, order?.status).map(
              (option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  disabled={option.isDisabled}
                  sx={{
                    bgcolor: option.isCurrent ? 'primary.lighter' : 'inherit',
                    fontWeight: option.isCurrent ? 600 : 400,
                    borderLeft: option.isCurrent ? 4 : 0,
                    borderColor: option.isCurrent
                      ? 'primary.main'
                      : 'transparent',
                    '&.Mui-selected': {
                      bgcolor: option.isCurrent
                        ? 'primary.lighter'
                        : 'action.selected'
                    },
                    '&:hover': {
                      bgcolor: option.isDisabled ? 'inherit' : 'action.hover'
                    },
                    opacity: option.isDisabled && !option.isCurrent ? 0.5 : 1
                  }}
                >
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {option.label}
                      {option.isCurrent && (
                        <Typography
                          component='span'
                          variant='caption'
                          sx={{ ml: 1, color: 'primary.main' }}
                        >
                          (Hiện tại)
                        </Typography>
                      )}
                    </Box>
                    {option.reason && option.isDisabled && (
                      <Typography
                        variant='caption'
                        color='text.secondary'
                        sx={{ display: 'block', mt: 0.5, fontStyle: 'italic' }}
                      >
                        {option.reason}
                      </Typography>
                    )}
                  </Box>
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>

        {/* Ghi chú quan trọng */}
        <Box
          sx={{
            mt: 2,
            p: 2,
            bgcolor: 'info.lighter',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'info.light'
          }}
        >
          <Typography variant='caption' color='info.dark'>
            <strong>Lưu ý:</strong>
            <br />• Để đánh dấu đơn hàng đã thanh toán, sử dụng nút Đánh dấu đã
            thanh toán
            <br />• Để hoàn tiền, vui lòng sử dụng chức năng hủy đơn hàng
          </Typography>
        </Box>

        {getPaymentStatusOptions(order?.paymentStatus, order?.status).every(
          (opt) => opt.isDisabled
        ) && (
          <Typography variant='body2' color='error' sx={{ mt: 2 }}>
            Không thể thay đổi trạng thái thanh toán từ trạng thái hiện tại
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='inherit'>
          Hủy
        </Button>
        <Button
          onClick={onConfirm}
          color='primary'
          variant='contained'
          disabled={actionLoading || !newPaymentStatus}
          startIcon={actionLoading ? <CircularProgress size={20} /> : null}
        >
          {actionLoading ? 'Đang xử lý...' : 'Cập nhật'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdatePaymentStatusDialog
