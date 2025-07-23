import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Avatar,
  IconButton,
  Divider,
  Snackbar,
  Alert,
  Paper
} from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'

const ProfileTab = () => {
  const [avatar, setAvatar] = useState('/src/assets/avatar-placeholder.jpg')
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: 'Thanh',
      lastName: 'Dinh',
      email: 'thanhdinh201179@gmail.com',
      phone: '0987654321',
      address: '123 Le Loi Street, District 1, Ho Chi Minh City'
    },
    mode: 'onChange'
  })

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader()
      fileReader.onload = (e) => {
        setAvatar(e.target.result)
      }
      fileReader.readAsDataURL(e.target.files[0])
    }
  }

  const onSubmit = () => {
    // Here you would normally send the data to your backend API

    // setNotification({
    //   open: true,
    //   message: 'Profile updated successfully',
    //   severity: 'success'
    // })
  }

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    })
  }

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={4}>
        <Grid item size={{ xs: 12, md: 4 }}>
          <Paper
            elevation={1}
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography variant='h6' gutterBottom>
              Profile Picture
            </Typography>

            <Box sx={{ position: 'relative', my: 2 }}>
              <Avatar
                src={avatar}
                alt='Profile Avatar'
                sx={{
                  width: 150,
                  height: 150,
                  border: '1px solid #eee'
                }}
              />
              <input
                accept='image/*'
                type='file'
                id='avatar-upload'
                onChange={handleAvatarChange}
                hidden
              />
              <label htmlFor='avatar-upload'>
                <IconButton
                  color='primary'
                  aria-label='upload picture'
                  component='span'
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    bgcolor: 'background.paper'
                  }}
                >
                  <PhotoCameraIcon />
                </IconButton>
              </label>
            </Box>

            <Typography
              variant='body2'
              color='text.secondary'
              align='center'
              sx={{ mt: 1 }}
            >
              Click the camera icon to upload a new photo
            </Typography>
          </Paper>
        </Grid>

        <Grid item size={{ xs: 12, md: 8 }}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant='h6' gutterBottom>
              Personal Information
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2}>
              <Grid item size={{ xs: 12, sm: 6 }}>
                <Controller
                  name='firstName'
                  control={control}
                  rules={{ required: 'First name is required' }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label='First Name'
                      error={!!error}
                      helperText={error?.message || ' '}
                      fullWidth
                      required
                    />
                  )}
                />
              </Grid>

              <Grid item size={{ xs: 12, sm: 6 }}>
                <Controller
                  name='lastName'
                  control={control}
                  rules={{ required: 'Last name is required' }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label='Last Name'
                      error={!!error}
                      helperText={error?.message || ' '}
                      fullWidth
                      required
                    />
                  )}
                />
              </Grid>

              <Grid item size={{ xs: 12 }}>
                <Controller
                  name='email'
                  control={control}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Invalid email address'
                    }
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label='Email'
                      type='email'
                      error={!!error}
                      helperText={error?.message || ' '}
                      fullWidth
                      required
                    />
                  )}
                />
              </Grid>

              <Grid item size={{ xs: 12 }}>
                <Controller
                  name='phone'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label='Phone Number'
                      error={!!error}
                      helperText={error?.message || ' '}
                      fullWidth
                    />
                  )}
                />
              </Grid>

              <Grid item size={{ xs: 12 }}>
                <Controller
                  name='address'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label='Address'
                      error={!!error}
                      helperText={error?.message || ' '}
                      fullWidth
                      multiline
                      rows={3}
                    />
                  )}
                />
              </Grid>

              <Grid item size={{ xs: 12 }}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  size='large'
                  sx={{ mt: 2 }}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

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
    </Box>
  )
}

export default ProfileTab
