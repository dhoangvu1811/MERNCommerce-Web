/* eslint-disable indent */
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
  CircularProgress,
  FormControlLabel,
  Checkbox
} from '@mui/material'
import { toast } from 'react-toastify'
import { createProduct, updateProduct, getAllProductTypes } from '~/apis'
import ImageUpload from './ImageUpload'

const ProductFormDrawer = ({
  open,
  onClose,
  onSubmit,
  product = null,
  title
}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [productTypes, setProductTypes] = React.useState([])
  const [loadingTypes, setLoadingTypes] = React.useState(false)
  const [isCustomType, setIsCustomType] = React.useState(false)

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: product?.name || '',
      price: product?.price || 0,
      rating: product?.rating || 4.0,
      type: product?.type || '',
      countInStock: product?.countInStock || 1,
      description: product?.description || '',
      discount: product?.discount || 0,
      image: product?.image || ''
    }
  })

  // Load danh sách loại sản phẩm từ API
  React.useEffect(() => {
    const fetchProductTypes = async () => {
      setLoadingTypes(true)
      const response = await getAllProductTypes()
      if (response.code === 200 && response.data) {
        setProductTypes(response.data)
      }
      setLoadingTypes(false)
    }

    // Chỉ fetch khi drawer được mở
    if (open) {
      fetchProductTypes()
    }
  }, [open])

  React.useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: product.price,
        rating: product.rating,
        type: product.type,
        countInStock: product.countInStock,
        description: product.description,
        discount: product.discount,
        image: product.image
      })
      // Kiểm tra xem type có trong danh sách hiện tại không
      setIsCustomType(
        !productTypes.includes(product.type) && productTypes.length > 0
      )
    } else {
      reset({
        name: '',
        price: 0,
        rating: 4.0,
        type: '',
        countInStock: 1,
        description: '',
        discount: 0,
        image: ''
      })
      setIsCustomType(false)
    }
  }, [product, reset, productTypes])

  const handleFormSubmit = async (data) => {
    setIsLoading(true)

    let response

    if (product) {
      // Cập nhật sản phẩm
      response = await updateProduct(product._id, data)
      toast.success('Cập nhật sản phẩm thành công!')
    } else {
      // Tạo sản phẩm mới
      response = await createProduct(data)
      toast.success('Thêm sản phẩm thành công!')
    }

    // Refresh danh sách productTypes nếu có type mới
    if (isCustomType && data.type) {
      const typesResponse = await getAllProductTypes()
      if (typesResponse.code === 200 && typesResponse.data) {
        setProductTypes(typesResponse.data)
      }
    }

    // Gọi callback để refresh data table
    if (onSubmit) {
      onSubmit(response.data)
    }

    // Reset form và đóng drawer
    reset()
    setIsCustomType(false)
    onClose()
    setIsLoading(false)
  }

  const handleCancel = () => {
    onClose()
    reset()
    setIsCustomType(false)
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
            },
            maxLength: {
              value: 255,
              message: 'Tên sản phẩm không được vượt quá 255 ký tự'
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
          name='image'
          control={control}
          rules={{
            required: 'Hình ảnh sản phẩm là bắt buộc'
          }}
          render={({ field, fieldState: { error } }) => (
            <ImageUpload
              value={field.value}
              onChange={field.onChange}
              error={!!error}
              helperText={error?.message}
              disabled={isLoading}
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
          rules={{
            required: 'Loại sản phẩm là bắt buộc',
            ...(isCustomType && {
              minLength: {
                value: 2,
                message: 'Loại sản phẩm phải có ít nhất 2 ký tự'
              },
              maxLength: {
                value: 100,
                message: 'Loại sản phẩm không được vượt quá 100 ký tự'
              }
            })
          }}
          render={({ field, fieldState: { error } }) => (
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isCustomType}
                    onChange={(e) => {
                      setIsCustomType(e.target.checked)
                      if (e.target.checked) {
                        field.onChange('') // Reset value when switching to custom
                      }
                    }}
                  />
                }
                label='Nhập loại sản phẩm mới'
                sx={{ mb: 1 }}
              />

              {isCustomType ? (
                <TextField
                  {...field}
                  label='Loại sản phẩm mới'
                  fullWidth
                  variant='outlined'
                  error={!!error}
                  helperText={error?.message || 'Nhập tên loại sản phẩm mới'}
                  placeholder='Ví dụ: Smartwatch, Máy ảnh, Loa bluetooth...'
                />
              ) : (
                <FormControl fullWidth error={!!error}>
                  <InputLabel>Loại sản phẩm</InputLabel>
                  <Select
                    {...field}
                    label='Loại sản phẩm'
                    disabled={loadingTypes}
                  >
                    {loadingTypes ? (
                      <MenuItem value='' disabled>
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                          <CircularProgress size={16} />
                          Đang tải...
                        </Box>
                      </MenuItem>
                    ) : productTypes.length > 0 ? (
                      productTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value='' disabled>
                        Không có dữ liệu
                      </MenuItem>
                    )}
                  </Select>
                  {error && (
                    <Typography variant='caption' color='error' sx={{ mt: 1 }}>
                      {error.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            </Box>
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
            },
            maxLength: {
              value: 1000,
              message: 'Mô tả không được vượt quá 1000 ký tự'
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
          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            disabled={isLoading}
            startIcon={isLoading && <CircularProgress size={20} />}
          >
            {isLoading
              ? product
                ? 'Đang cập nhật...'
                : 'Đang thêm...'
              : product
              ? 'Cập nhật sản phẩm'
              : 'Thêm sản phẩm'}
          </Button>
          <Button
            type='button'
            variant='outlined'
            color='secondary'
            onClick={handleCancel}
            fullWidth
            disabled={isLoading}
          >
            Hủy
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

export default ProductFormDrawer
