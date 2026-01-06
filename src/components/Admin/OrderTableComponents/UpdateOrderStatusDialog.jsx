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
import {
  getOrderStatusConfig,
  ORDER_STATUS
} from '../../../utils/orderConstants'
import { getOrderStatusOptions } from '../../../utils/orderStatusHelpers'

const UpdateOrderStatusDialog = ({
  open,
  onClose,
  onConfirm,
  order,
  newStatus,
  onStatusChange,
  actionLoading
}) => {
  const statusConfig = order
    ? getOrderStatusConfig(order.status, order.paymentStatus)
    : null

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Cập nhật trạng thái đơn hàng</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Thay đổi trạng thái đơn hàng #{order?.orderCode || order?._id}
        </DialogContentText>

        {/* Hiển thị trạng thái hiện tại */}
        <Box sx={{ mb: 3, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
          <Typography variant='body2' color='text.secondary' gutterBottom>
            Trạng thái hiện tại:
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {statusConfig && (
              <Chip
                label={statusConfig.label}
                color={statusConfig.color}
                size='medium'
                sx={{ fontWeight: 600 }}
              />
            )}
          </Box>
        </Box>

        <FormControl fullWidth>
          <InputLabel>Chọn trạng thái mới</InputLabel>
          <Select
            value={newStatus}
            label='Chọn trạng thái mới'
            onChange={onStatusChange}
          >
            {getOrderStatusOptions(order?.status).map((option) => (
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
                  }
                }}
              >
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
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {getOrderStatusOptions(order?.status).every(
          (opt) => opt.isDisabled
        ) && (
          <Typography variant='body2' color='error' sx={{ mt: 2 }}>
            Không thể thay đổi trạng thái từ trạng thái hiện tại
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
          disabled={actionLoading || !newStatus}
          startIcon={actionLoading ? <CircularProgress size={20} /> : null}
        >
          {actionLoading ? 'Đang xử lý...' : 'Cập nhật'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateOrderStatusDialog
