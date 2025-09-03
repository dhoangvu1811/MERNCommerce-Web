import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { registerUser } from '~/redux/slices/userSlice'
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
import PersonOutline from '@mui/icons-material/PersonOutline'
import AuthFormField from './AuthFormField'
import {
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '../../utils/validators'

const RegisterDialog = ({ open, onClose, onSuccess, onSwitchToLogin }) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { isValid },
    watch,
    reset
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    mode: 'onChange'
  })

  // Watch the password field for validation
  const password = watch('password')

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      await dispatch(registerUser(data)).unwrap()

      // Call success callback if provided
      onSuccess && onSuccess()

      // Reset form and close dialog
      reset()
      onClose()
    } catch {
      // Error đã được handle bởi interceptor
      reset()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='register-dialog-title'
      maxWidth='sm'
      fullWidth
      PaperProps={{
        elevation: 5,
        sx: {
          borderRadius: 2,
          minWidth: { xs: '90%', sm: '500px' }
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
          Đăng ký
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
              name='name'
              label='Họ và tên'
              control={control}
              autoComplete='name'
              autoFocus
              icon={<PersonOutline color='action' />}
              rules={{
                required: FIELD_REQUIRED_MESSAGE
              }}
            />

            <AuthFormField
              name='email'
              label='Email'
              type='email'
              control={control}
              autoComplete='email'
              icon={<EmailOutlined color='action' />}
              rules={{
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: EMAIL_RULE,
                  message: EMAIL_RULE_MESSAGE
                }
              }}
            />

            <AuthFormField
              name='password'
              label='Mật khẩu'
              type='password'
              control={control}
              autoComplete='new-password'
              icon={<LockOutlined color='action' />}
              rules={{
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: PASSWORD_RULE,
                  message: PASSWORD_RULE_MESSAGE
                }
              }}
            />

            <AuthFormField
              name='confirmPassword'
              label='Xác nhận mật khẩu'
              type='password'
              control={control}
              autoComplete='confirm-password'
              icon={<LockOutlined color='action' />}
              rules={{
                required: FIELD_REQUIRED_MESSAGE,
                validate: (value) =>
                  value === password || 'Mật khẩu xác nhận không khớp'
              }}
            />
          </Stack>
        </DialogContent>

        <DialogContent sx={{ pt: 0, pb: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant='body2' color='text.secondary'>
              Đã có tài khoản?{' '}
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
                  setTimeout(() => onSwitchToLogin && onSwitchToLogin(), 150)
                }}
              >
                Đăng nhập
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
            disabled={isLoading || !isValid}
            sx={{
              px: 3,
              py: 1,
              fontWeight: 600,
              borderRadius: 1.5,
              boxShadow: 2
            }}
          >
            {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

RegisterDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  onSwitchToLogin: PropTypes.func
}

export default RegisterDialog
