import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Typography,
  TextField,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider
} from '@mui/material'

const UserFormDrawer = ({ open, onClose, onSubmit, user = null, title }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: user?.city || '',
      isAdmin: user?.isAdmin || false
    }
  })

  React.useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        isAdmin: user.isAdmin
      })
    } else {
      reset({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        isAdmin: false
      })
    }
  }, [user, reset])

  const handleFormSubmit = (data) => {
    onSubmit(data)
    reset()
  }

  const handleCancel = () => {
    onClose()
    reset()
  }

  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={handleCancel}
      sx={{
        '& .MuiDrawer-paper': {
          width: 400,
          p: 3
        }
      }}
    >
      <Typography variant='h6' gutterBottom>
        {title}
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box
        component='form'
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Controller
          name='name'
          control={control}
          rules={{
            required: 'Tên là bắt buộc',
            minLength: {
              value: 2,
              message: 'Tên phải có ít nhất 2 ký tự'
            }
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label='Tên'
              fullWidth
              variant='outlined'
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name='email'
          control={control}
          rules={{
            required: 'Email là bắt buộc',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Email không hợp lệ'
            }
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label='Email'
              type='email'
              fullWidth
              variant='outlined'
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name='phone'
          control={control}
          rules={{
            required: 'Số điện thoại là bắt buộc',
            pattern: {
              value: /^[0-9]{10,11}$/,
              message: 'Số điện thoại phải có 10-11 chữ số'
            }
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label='Số điện thoại'
              fullWidth
              variant='outlined'
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name='address'
          control={control}
          rules={{ required: 'Địa chỉ là bắt buộc' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label='Địa chỉ'
              fullWidth
              variant='outlined'
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name='city'
          control={control}
          rules={{ required: 'Thành phố là bắt buộc' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label='Thành phố'
              fullWidth
              variant='outlined'
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name='isAdmin'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth error={!!error}>
              <InputLabel>Quyền</InputLabel>
              <Select
                {...field}
                label='Quyền'
                value={field.value.toString()}
                onChange={(e) => field.onChange(e.target.value === 'true')}
              >
                <MenuItem value='false'>User</MenuItem>
                <MenuItem value='true'>Admin</MenuItem>
              </Select>
              {error && (
                <Typography variant='caption' color='error' sx={{ mt: 1 }}>
                  {error.message}
                </Typography>
              )}
            </FormControl>
          )}
        />

        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button type='submit' variant='contained' color='primary' fullWidth>
            {user ? 'Lưu' : 'Thêm người dùng'}
          </Button>
          <Button
            type='button'
            variant='outlined'
            color='secondary'
            onClick={handleCancel}
            fullWidth
          >
            Hủy
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

export default UserFormDrawer
