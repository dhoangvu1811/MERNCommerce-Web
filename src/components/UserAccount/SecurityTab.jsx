/* eslint-disable indent */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { updatePassword } from '~/redux/slices/userSlice'
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Divider,
  Paper,
  InputAdornment,
  IconButton
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import LockIcon from '@mui/icons-material/Lock'
import {
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '../../utils/validators'

const PasswordField = ({
  label,
  showPassword,
  togglePasswordVisibility,
  autoComplete,
  ...props
}) => {
  return (
    <TextField
      {...props}
      label={label}
      fullWidth
      required
      autoComplete={autoComplete}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              onClick={togglePasswordVisibility}
              edge='end'
              aria-label={showPassword ? 'hide password' : 'show password'}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
}

const SecurityTab = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.auth.currentUser)

  // Check if user is Google OAuth user (has emailVerified: true)
  const isGoogleUser = currentUser?.emailVerified === true

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  })

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    mode: 'onChange'
  })

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const onSubmit = async (data) => {
    try {
      // For Google users, don't send currentPassword
      const passwordData = isGoogleUser
        ? {
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword,
            isGoogleUser: true
          }
        : {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword
          }

      await dispatch(updatePassword(passwordData)).unwrap()

      // Reset form sau khi thành công
      reset()
    } catch {
      // Error đã được hiển thị bởi interceptor
    }
  }

  return (
    <Paper elevation={1} sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <LockIcon color='primary' sx={{ mr: 1 }} />
        <Typography variant='h6'>Change Password</Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Information message for Google users */}
      {isGoogleUser && (
        <Box sx={{ mb: 3, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
          <Typography variant='body2' color='info.dark'>
            Bạn đã đăng nhập bằng Google, không cần nhập mật khẩu hiện tại.
          </Typography>
        </Box>
      )}

      <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={3}>
          {/* Only show Current Password field for normal users (not Google OAuth users) */}
          {!isGoogleUser && (
            <Grid size={{ xs: 12 }}>
              <Controller
                name='currentPassword'
                control={control}
                rules={{
                  required: !isGoogleUser ? FIELD_REQUIRED_MESSAGE : false
                }}
                render={({ field, fieldState: { error } }) => (
                  <PasswordField
                    {...field}
                    label='Current Password'
                    error={!!error}
                    helperText={error?.message}
                    showPassword={showPasswords.currentPassword}
                    togglePasswordVisibility={() =>
                      togglePasswordVisibility('currentPassword')
                    }
                    autoComplete='current-password'
                  />
                )}
              />
            </Grid>
          )}

          <Grid size={{ xs: 12 }}>
            <Controller
              name='newPassword'
              control={control}
              rules={{
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: PASSWORD_RULE,
                  message: PASSWORD_RULE_MESSAGE
                }
              }}
              render={({ field, fieldState: { error } }) => (
                <PasswordField
                  {...field}
                  label='New Password'
                  error={!!error}
                  helperText={error?.message || PASSWORD_RULE_MESSAGE}
                  showPassword={showPasswords.newPassword}
                  togglePasswordVisibility={() =>
                    togglePasswordVisibility('newPassword')
                  }
                  autoComplete='new-password'
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name='confirmPassword'
              control={control}
              rules={{
                required: FIELD_REQUIRED_MESSAGE,
                validate: (value) =>
                  value === watch('newPassword') || 'Passwords do not match'
              }}
              render={({ field, fieldState: { error } }) => (
                <PasswordField
                  {...field}
                  label='Confirm New Password'
                  error={!!error}
                  helperText={error?.message}
                  showPassword={showPasswords.confirmPassword}
                  togglePasswordVisibility={() =>
                    togglePasswordVisibility('confirmPassword')
                  }
                  autoComplete='new-password'
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              size='large'
              sx={{ mt: 1 }}
            >
              Update Password
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default SecurityTab
