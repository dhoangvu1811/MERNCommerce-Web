import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
  CircularProgress
} from '@mui/material'

const ConfirmMarkPaidDialog = ({
  open,
  onClose,
  onConfirm,
  order,
  actionLoading
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Xác nhận đánh dấu đã thanh toán</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn có chắc chắn muốn đánh dấu đơn hàng #
          {order?.orderCode || order?._id} đã thanh toán?
          <br />
          Hành động này không thể hoàn tác.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='inherit'>
          Hủy
        </Button>
        <Button
          onClick={onConfirm}
          color='success'
          variant='contained'
          disabled={actionLoading}
          startIcon={actionLoading ? <CircularProgress size={20} /> : null}
        >
          {actionLoading ? 'Đang xử lý...' : 'Xác nhận'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmMarkPaidDialog
