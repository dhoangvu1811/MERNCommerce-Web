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

const ProductFormDrawer = ({
  open,
  onClose,
  onSubmit,
  product = null,
  title
}) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: product?.name || '',
      price: product?.price || 0,
      rating: product?.rating || 4.0,
      type: product?.type || '',
      countInStock: product?.countInStock || 1,
      description: product?.description || '',
      discount: product?.discount || 0
    }
  })

  React.useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: product.price,
        rating: product.rating,
        type: product.type,
        countInStock: product.countInStock,
        description: product.description,
        discount: product.discount
      })
    } else {
      reset({
        name: '',
        price: 0,
        rating: 4.0,
        type: '',
        countInStock: 1,
        description: '',
        discount: 0
      })
    }
  }, [product, reset])

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
          width: 450,
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
            required: 'Tên sản phẩm là bắt buộc',
            minLength: {
              value: 2,
              message: 'Tên sản phẩm phải có ít nhất 2 ký tự'
            }
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label='Tên sản phẩm'
              fullWidth
              variant='outlined'
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name='price'
          control={control}
          rules={{
            required: 'Giá sản phẩm là bắt buộc',
            min: {
              value: 1000,
              message: 'Giá sản phẩm phải lớn hơn 1,000 VND'
            }
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label='Giá (VND)'
              type='number'
              fullWidth
              variant='outlined'
              error={!!error}
              helperText={error?.message || 'Ví dụ: 1000000 cho 1 triệu VND'}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />

        <Controller
          name='rating'
          control={control}
          rules={{
            required: 'Đánh giá là bắt buộc',
            min: {
              value: 0,
              message: 'Đánh giá phải từ 0 đến 5'
            },
            max: {
              value: 5,
              message: 'Đánh giá phải từ 0 đến 5'
            }
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label='Đánh giá (0-5)'
              type='number'
              fullWidth
              variant='outlined'
              error={!!error}
              helperText={error?.message}
              inputProps={{ min: 0, max: 5, step: 0.1 }}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />

        <Controller
          name='type'
          control={control}
          rules={{ required: 'Loại sản phẩm là bắt buộc' }}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth error={!!error}>
              <InputLabel>Loại sản phẩm</InputLabel>
              <Select {...field} label='Loại sản phẩm'>
                <MenuItem value='Điện thoại'>Điện thoại</MenuItem>
                <MenuItem value='Laptop'>Laptop</MenuItem>
                <MenuItem value='Tablet'>Tablet</MenuItem>
                <MenuItem value='Đồng hồ'>Đồng hồ</MenuItem>
                <MenuItem value='Tai nghe'>Tai nghe</MenuItem>
                <MenuItem value='Phụ kiện'>Phụ kiện</MenuItem>
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
          name='countInStock'
          control={control}
          rules={{
            required: 'Số lượng trong kho là bắt buộc',
            min: {
              value: 0,
              message: 'Số lượng không thể âm'
            }
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label='Số lượng trong kho'
              type='number'
              fullWidth
              variant='outlined'
              error={!!error}
              helperText={error?.message}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />

        <Controller
          name='discount'
          control={control}
          rules={{
            min: {
              value: 0,
              message: 'Giảm giá không thể âm'
            },
            max: {
              value: 100,
              message: 'Giảm giá không thể vượt quá 100%'
            }
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label='Giảm giá (%)'
              type='number'
              fullWidth
              variant='outlined'
              error={!!error}
              helperText={error?.message}
              inputProps={{ min: 0, max: 100 }}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />

        <Controller
          name='description'
          control={control}
          rules={{
            required: 'Mô tả sản phẩm là bắt buộc',
            minLength: {
              value: 10,
              message: 'Mô tả phải có ít nhất 10 ký tự'
            }
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label='Mô tả'
              fullWidth
              multiline
              rows={3}
              variant='outlined'
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button type='submit' variant='contained' color='primary' fullWidth>
            {product ? 'Lưu' : 'Thêm sản phẩm'}
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

export default ProductFormDrawer
