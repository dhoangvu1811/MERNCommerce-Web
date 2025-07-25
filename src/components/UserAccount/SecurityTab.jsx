import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Divider,
  Paper,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import LockIcon from '@mui/icons-material/Lock'

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
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  })

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
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

  const onSubmit = () => {
    // Here you would normally send the data to your backend API
    // For demonstration, we'll just show a success message

    // Show success notification
    setNotification({
      open: true,
      message: 'Password changed successfully',
      severity: 'success'
    })

    // Reset form
    reset()
  }

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    })
  }

  return (
    <Paper elevation={1} sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <LockIcon color='primary' sx={{ mr: 1 }} />
        <Typography variant='h6'>Change Password</Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Controller
              name='currentPassword'
              control={control}
              rules={{ required: 'Current password is required' }}
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

          <Grid size={{ xs: 12 }}>
            <Controller
              name='newPassword'
              control={control}
              rules={{
                required: 'New password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                }
              }}
              render={({ field, fieldState: { error } }) => (
                <PasswordField
                  {...field}
                  label='New Password'
                  error={!!error}
                  helperText={
                    error?.message || 'Password must be at least 8 characters'
                  }
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
                required: 'Please confirm your new password',
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

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Paper>
  )
}

export default SecurityTab
