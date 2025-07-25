import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material'

const DeleteProductDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>Xác nhận xóa sản phẩm</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn
          tác.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Hủy
        </Button>
        <Button onClick={onConfirm} color='error' autoFocus>
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteProductDialog
