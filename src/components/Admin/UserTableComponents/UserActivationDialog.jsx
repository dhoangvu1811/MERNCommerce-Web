import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography
} from '@mui/material'

const UserActivationDialog = ({
  open,
  onClose,
  onConfirm,
  loading = false,
  action = 'activate',
  userName = ''
}) => {
  const isActivate = action === 'activate'

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='activation-dialog-title'
      aria-describedby='activation-dialog-description'
      maxWidth='sm'
      fullWidth
    >
      <DialogTitle id='activation-dialog-title'>
        {isActivate
          ? 'Xác nhận kích hoạt tài khoản'
          : 'Xác nhận vô hiệu hóa tài khoản'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='activation-dialog-description'>
          {isActivate ? (
            <>
              Bạn có chắc chắn muốn <strong>kích hoạt</strong> tài khoản của{' '}
              <Typography
                component='span'
                sx={{ fontWeight: 'bold', color: 'primary.main' }}
              >
                {userName}
              </Typography>{' '}
              không?
              <br />
              <br />
              Người dùng sẽ có thể đăng nhập và sử dụng hệ thống bình thường.
            </>
          ) : (
            <>
              Bạn có chắc chắn muốn <strong>vô hiệu hóa</strong> tài khoản của{' '}
              <Typography
                component='span'
                sx={{ fontWeight: 'bold', color: 'error.main' }}
              >
                {userName}
              </Typography>{' '}
              không?
              <br />
              <br />
              Người dùng sẽ không thể đăng nhập và sử dụng hệ thống cho đến khi
              được kích hoạt lại.
            </>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='inherit' disabled={loading}>
          Hủy
        </Button>
        <Button
          onClick={onConfirm}
          variant='contained'
          color={isActivate ? 'success' : 'error'}
          disabled={loading}
          autoFocus
        >
          {loading ? 'Đang xử lý...' : isActivate ? 'Kích hoạt' : 'Vô hiệu hóa'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserActivationDialog
