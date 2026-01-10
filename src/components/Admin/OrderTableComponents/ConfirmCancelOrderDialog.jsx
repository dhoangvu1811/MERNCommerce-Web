import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
  CircularProgress,
  Box,
  Typography,
  Alert
} from '@mui/material'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

const ConfirmCancelOrderDialog = ({
  open,
  onClose,
  onConfirm,
  order,
  actionLoading
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WarningAmberIcon color='error' />
        <Typography variant='h6' component='span'>
          Xác nhận hủy đơn hàng
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Alert severity='warning' sx={{ mb: 2 }}>
          Hành động này không thể hoàn tác!
        </Alert>
        <DialogContentText>
          Bạn có chắc chắn muốn hủy đơn hàng{' '}
          <Box component='span' sx={{ fontWeight: 'bold' }}>
            #{order?.orderCode || order?._id?.slice(-8)}
          </Box>
          ?
        </DialogContentText>
        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant='body2' color='text.secondary' gutterBottom>
            Lưu ý khi hủy đơn:
          </Typography>
          <Typography variant='body2' component='ul' sx={{ pl: 2, m: 0 }}>
            <li>Số lượng sản phẩm sẽ được hoàn trả về kho</li>
            <li>Voucher đã sử dụng sẽ được hoàn lại (nếu có)</li>
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color='inherit' disabled={actionLoading}>
          Đóng
        </Button>
        <Button
          onClick={onConfirm}
          color='error'
          variant='contained'
          disabled={actionLoading}
          startIcon={actionLoading ? <CircularProgress size={20} /> : null}
        >
          {actionLoading ? 'Đang xử lý...' : 'Xác nhận hủy đơn'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmCancelOrderDialog
