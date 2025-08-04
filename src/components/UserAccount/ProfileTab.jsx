import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from '~/hooks/useAuth'
import { updateCurrentUser } from '~/redux/slices/userSlice'
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Avatar,
  IconButton,
  Divider,
  Paper
} from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'

const ProfileTab = () => {
  const dispatch = useDispatch()
  const { user } = useAuth()
  const [avatar, setAvatar] = useState('')
  const [avatarFile, setAvatarFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Profile form
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: ''
    },
    mode: 'onChange'
  })

  useEffect(() => {
    if (user) {
      const { name } = user
      if (name) {
        const nameParts = name.trim().split(' ')
        const firstName = nameParts[nameParts.length - 1] || ''
        const lastName = nameParts[0] || ''
        setValue('firstName', firstName)
        setValue('lastName', lastName)
      }
      setValue('email', user.email || '')
      setValue('phone', user.phone || '')
      setValue('address', user.address || '')
      setAvatar(user.avatar || '/src/assets/avatar-placeholder.jpg')
    }
  }, [user, setValue])

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setAvatarFile(file)

      const fileReader = new FileReader()
      fileReader.onload = (e) => {
        setAvatar(e.target.result)
      }
      fileReader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      const { firstName, lastName, ...dataRest } = data
      const formData = {
        ...dataRest,
        name: `${lastName} ${firstName}`.trim(),
        avatar: avatarFile
      }

      await dispatch(updateCurrentUser(formData)).unwrap()

      // Reset avatar file sau khi upload thành công
      setAvatarFile(null)
    } catch {
      // Error đã được hiển thị bởi interceptor
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
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

              <Grid size={{ xs: 12, sm: 6 }}>
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

              <Grid size={{ xs: 12 }}>
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

              <Grid size={{ xs: 12 }}>
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

              <Grid size={{ xs: 12 }}>
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

              <Grid size={{ xs: 12 }}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  size='large'
                  sx={{ mt: 2 }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProfileTab
