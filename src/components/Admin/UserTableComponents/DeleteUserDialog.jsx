import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress
} from '@mui/material'

const DeleteUserDialog = ({ open, onClose, onConfirm, loading = false }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>Xác nhận xóa người dùng</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn
          tác.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary' disabled={loading}>
          Hủy
        </Button>
        <Button
          onClick={onConfirm}
          color='error'
          autoFocus
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} /> : null}
        >
          {loading ? 'Đang xóa...' : 'Xóa'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteUserDialog
