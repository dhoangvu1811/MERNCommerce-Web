import { useState } from 'react'
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
  const [profileData, setProfileData] = useState({
    firstName: 'Thanh',
    lastName: 'Dinh',
    email: 'thanhdinh201179@gmail.com',
    phone: '0987654321',
    address: '123 Le Loi Street, District 1, Ho Chi Minh City'
  })

  const [avatar, setAvatar] = useState('/src/assets/avatar-placeholder.jpg')
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader()
      fileReader.onload = (e) => {
        setAvatar(e.target.result)
      }
      fileReader.readAsDataURL(e.target.files[0])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setNotification({
      open: true,
      message: 'Profile updated successfully',
      severity: 'success'
    })
  }

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    })
  }

  return (
    <Box component='form' onSubmit={handleSubmit} noValidate>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
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

        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant='h6' gutterBottom>
              Personal Information
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  name='firstName'
                  label='First Name'
                  value={profileData.firstName}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  name='lastName'
                  label='Last Name'
                  value={profileData.lastName}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  name='email'
                  label='Email'
                  value={profileData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                  type='email'
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  name='phone'
                  label='Phone Number'
                  value={profileData.phone}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  name='address'
                  label='Address'
                  value={profileData.address}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
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
