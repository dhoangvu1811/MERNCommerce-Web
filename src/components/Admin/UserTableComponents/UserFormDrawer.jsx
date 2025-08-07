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
  Divider,
  CircularProgress
} from '@mui/material'
import AvatarUpload from './AvatarUpload'
import {
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE
} from '../../../utils/validators'

const UserFormDrawer = ({
  open,
  onClose,
  onSubmit,
  user = null,
  title,
  loading = false
}) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      avatar: user?.avatar || '',
      dateOfBirth: user?.dateOfBirth || '2000-01-01',
      gender: user?.gender || 'male',
      role: user?.role || 'user',
      password: '' // Chỉ dùng khi tạo user mới
    }
  })

  React.useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        avatar: user.avatar || '',
        dateOfBirth: user.dateOfBirth || '2000-01-01',
        gender: user.gender || 'male',
        role: user.role || 'user'
        // Không có password khi edit
      })
    } else {
      reset({
        name: '',
        email: '',
        phone: '',
        address: '',
        avatar: '',
        dateOfBirth: '2000-01-01',
        gender: 'male',
        role: 'user',
        password: '' // Có password khi tạo mới
      })
    }
  }, [user, reset])

  const handleFormSubmit = (data) => {
    // Loại bỏ password nếu đang edit user (không cần update password)
    if (user) {
      const { password, ...userDataWithoutPassword } = data
      onSubmit(userDataWithoutPassword)
    } else {
      onSubmit(data)
    }

    if (!user) {
      // Reset về giá trị mặc định cho form thêm mới
      reset({
        name: '',
        email: '',
        phone: '',
        address: '',
        avatar: '',
        dateOfBirth: '2000-01-01',
        gender: 'male',
        role: 'user',
        password: ''
      })
    }
  }

  const handleCancel = () => {
    onClose()
    if (!user) {
      // Reset về giá trị mặc định cho form thêm mới
      reset({
        name: '',
        email: '',
        phone: '',
        address: '',
        avatar: '',
        dateOfBirth: '2000-01-01',
        gender: 'male',
        role: 'user',
        password: ''
      })
    }
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
            required: FIELD_REQUIRED_MESSAGE,
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
            required: FIELD_REQUIRED_MESSAGE,
            pattern: {
              value: EMAIL_RULE,
              message: EMAIL_RULE_MESSAGE
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

        {/* Trường password chỉ hiển thị khi tạo user mới */}
        {!user && (
          <Controller
            name='password'
            control={control}
            rules={{
              required: FIELD_REQUIRED_MESSAGE,
              minLength: {
                value: 6,
                message: 'Mật khẩu phải có ít nhất 6 ký tự'
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label='Mật khẩu'
                type='password'
                fullWidth
                variant='outlined'
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        )}

        <Controller
          name='phone'
          control={control}
          rules={{
            required: FIELD_REQUIRED_MESSAGE,
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
          rules={{ required: FIELD_REQUIRED_MESSAGE }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label='Địa chỉ'
              fullWidth
              variant='outlined'
              multiline
              rows={2}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name='avatar'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <AvatarUpload
              value={field.value}
              onChange={field.onChange}
              error={!!error}
              helperText={error?.message || 'Chọn ảnh đại diện cho người dùng'}
            />
          )}
        />

        <Controller
          name='dateOfBirth'
          control={control}
          rules={{ required: FIELD_REQUIRED_MESSAGE }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label='Ngày sinh'
              type='date'
              fullWidth
              variant='outlined'
              InputLabelProps={{
                shrink: true
              }}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name='gender'
          control={control}
          rules={{ required: FIELD_REQUIRED_MESSAGE }}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth error={!!error}>
              <InputLabel>Giới tính</InputLabel>
              <Select {...field} label='Giới tính'>
                <MenuItem value='male'>Nam</MenuItem>
                <MenuItem value='female'>Nữ</MenuItem>
                <MenuItem value='other'>Khác</MenuItem>
              </Select>
              {error && (
                <Typography variant='caption' color='error' sx={{ mt: 1 }}>
                  {error.message}
                </Typography>
              )}
            </FormControl>
          )}
        />

        <Controller
          name='role'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth error={!!error}>
              <InputLabel>Vai trò</InputLabel>
              <Select {...field} label='Vai trò'>
                <MenuItem value='user'>Người dùng</MenuItem>
                <MenuItem value='admin'>Quản trị viên</MenuItem>
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
          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : null}
          >
            {loading ? 'Đang lưu...' : user ? 'Lưu' : 'Thêm người dùng'}
          </Button>
          <Button
            type='button'
            variant='outlined'
            color='secondary'
            onClick={handleCancel}
            fullWidth
            disabled={loading}
          >
            Hủy
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

export default UserFormDrawer
