import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material'

const DeleteVoucherDialog = ({ open, onClose, onConfirm, voucherCode }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
      <DialogTitle>Xóa voucher</DialogTitle>
      <DialogContent>
        <Typography>
          Bạn có chắc muốn xóa voucher &quot;{voucherCode}&quot;?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='outlined'>
          Hủy
        </Button>
        <Button onClick={onConfirm} variant='contained' color='error'>
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteVoucherDialog
