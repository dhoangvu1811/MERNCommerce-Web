import PropTypes from 'prop-types'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
  Stack
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import EmailOutlined from '@mui/icons-material/EmailOutlined'
import LockOutlined from '@mui/icons-material/LockOutlined'
import AuthFormField from './AuthFormField'

const LoginDialog = ({ open, onClose, onSuccess, onSwitchToRegister }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Save auth data to localStorage for demo
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userRole', 'user')
      localStorage.setItem('userName', data.email.split('@')[0])

      // Call success callback if provided
      onSuccess && onSuccess(data)

      // Close the dialog
      onClose()
    } catch {
      // Handle login error - could add error state here
      // For production, use proper error logging service
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='login-dialog-title'
      maxWidth='sm'
      fullWidth
      PaperProps={{
        elevation: 5,
        sx: {
          borderRadius: 2,
          minWidth: { xs: '90%', sm: '450px' }
        }
      }}
    >
      <Box
        sx={{
          m: 0,
          p: 3,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          position: 'relative'
        }}
      >
        <Typography variant='h5' component='h2' sx={{ fontWeight: 600 }}>
          Đăng nhập
        </Typography>
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white'
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent sx={{ p: 3, pt: 4, pb: 4 }}>
          <Stack spacing={3}>
            <AuthFormField
              name='email'
              label='Email'
              type='email'
              control={control}
              autoComplete='email'
              autoFocus
              icon={<EmailOutlined color='action' />}
              rules={{
                required: 'Email không được để trống',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Email không hợp lệ'
                }
              }}
            />

            <AuthFormField
              name='password'
              label='Mật khẩu'
              type='password'
              control={control}
              autoComplete='current-password'
              icon={<LockOutlined color='action' />}
              rules={{
                required: 'Mật khẩu không được để trống',
                minLength: {
                  value: 6,
                  message: 'Mật khẩu phải có ít nhất 6 ký tự'
                }
              }}
            />
          </Stack>
        </DialogContent>

        <DialogContent sx={{ pt: 0, pb: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant='body2' color='text.secondary'>
              Chưa có tài khoản?{' '}
              <Typography
                component='span'
                color='primary'
                sx={{
                  fontWeight: 500,
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' }
                }}
                onClick={() => {
                  onClose()
                  setTimeout(
                    () => onSwitchToRegister && onSwitchToRegister(),
                    150
                  )
                }}
              >
                Đăng ký ngay
              </Typography>
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: 'space-between',
            p: 3,
            bgcolor: 'background.subtle'
          }}
        >
          <Button onClick={onClose} color='inherit' sx={{ fontWeight: 500 }}>
            Hủy
          </Button>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={isSubmitting || !isValid}
            sx={{
              px: 3,
              py: 1,
              fontWeight: 600,
              borderRadius: 1.5,
              boxShadow: 2
            }}
          >
            {isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

LoginDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  onSwitchToRegister: PropTypes.func
}

export default LoginDialog
