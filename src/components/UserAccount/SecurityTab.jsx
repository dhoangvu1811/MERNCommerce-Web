import { useState } from 'react'
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

const SecurityTab = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  })

  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setPasswords((prev) => ({
      ...prev,
      [name]: value
    }))

    // Clear errors when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }

    if (!passwords.currentPassword) {
      newErrors.currentPassword = 'Current password is required'
      valid = false
    }

    if (!passwords.newPassword) {
      newErrors.newPassword = 'New password is required'
      valid = false
    } else if (passwords.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters'
      valid = false
    }

    if (!passwords.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password'
      valid = false
    } else if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Here you would normally send the data to your backend API
      // For demonstration, we'll just show a success message

      // Reset form
      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })

      // Show success notification
      setNotification({
        open: true,
        message: 'Password changed successfully',
        severity: 'success'
      })
    }
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

      <Box component='form' onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <TextField
              name='currentPassword'
              label='Current Password'
              value={passwords.currentPassword}
              onChange={handleChange}
              fullWidth
              required
              type={showPasswords.currentPassword ? 'text' : 'password'}
              error={Boolean(errors.currentPassword)}
              helperText={errors.currentPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() =>
                        togglePasswordVisibility('currentPassword')
                      }
                      edge='end'
                    >
                      {showPasswords.currentPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              name='newPassword'
              label='New Password'
              value={passwords.newPassword}
              onChange={handleChange}
              fullWidth
              required
              type={showPasswords.newPassword ? 'text' : 'password'}
              error={Boolean(errors.newPassword)}
              helperText={
                errors.newPassword || 'Password must be at least 8 characters'
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() => togglePasswordVisibility('newPassword')}
                      edge='end'
                    >
                      {showPasswords.newPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              name='confirmPassword'
              label='Confirm New Password'
              value={passwords.confirmPassword}
              onChange={handleChange}
              fullWidth
              required
              type={showPasswords.confirmPassword ? 'text' : 'password'}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() =>
                        togglePasswordVisibility('confirmPassword')
                      }
                      edge='end'
                    >
                      {showPasswords.confirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }}
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
