import React, { useEffect } from 'react'
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
  FormControlLabel,
  Switch
} from '@mui/material'
import { FIELD_REQUIRED_MESSAGE } from '../../../utils/validators'

const VoucherFormDrawer = ({
  open,
  onClose,
  onSubmit,
  voucher = null,
  title
}) => {
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      code: voucher?.code || '',
      type: voucher?.type || 'percent',
      amount: voucher?.amount ?? 0,
      maxDiscount: voucher?.maxDiscount ?? 0,
      minOrderValue: voucher?.minOrderValue ?? 0,
      startDate: voucher?.startDate ? voucher.startDate.slice(0, 16) : '',
      endDate: voucher?.endDate ? voucher.endDate.slice(0, 16) : '',
      usageLimit: voucher?.usageLimit ?? 0,
      usedCount: voucher?.usedCount ?? 0,
      isActive: voucher?.isActive ?? true
    }
  })

  useEffect(() => {
    if (voucher) {
      reset({
        code: voucher.code,
        type: voucher.type,
        amount: voucher.amount,
        maxDiscount: voucher.maxDiscount ?? 0,
        minOrderValue: voucher.minOrderValue ?? 0,
        startDate: voucher.startDate ? voucher.startDate.slice(0, 16) : '',
        endDate: voucher.endDate ? voucher.endDate.slice(0, 16) : '',
        usageLimit: voucher.usageLimit ?? 0,
        usedCount: voucher.usedCount ?? 0,
        isActive: voucher.isActive ?? true
      })
    } else {
      reset({
        code: '',
        type: 'percent',
        amount: 0,
        maxDiscount: 0,
        minOrderValue: 0,
        startDate: '',
        endDate: '',
        usageLimit: 0,
        usedCount: 0,
        isActive: true
      })
    }
  }, [voucher, reset])

  const type = watch('type')

  const onSubmitForm = (data) => {
    const payload = {
      ...data,
      amount: Number(data.amount),
      maxDiscount: data.maxDiscount === '' ? 0 : Number(data.maxDiscount),
      minOrderValue: data.minOrderValue === '' ? 0 : Number(data.minOrderValue),
      usageLimit: data.usageLimit === '' ? 0 : Number(data.usageLimit),
      usedCount: data.usedCount === '' ? 0 : Number(data.usedCount),
      startDate: data.startDate ? new Date(data.startDate).toISOString() : null,
      endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
      isActive: !!data.isActive
    }
    onSubmit && onSubmit(payload)
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={handleCancel}
      sx={{ '& .MuiDrawer-paper': { width: 480, p: 3 } }}
    >
      <Typography variant='h6' gutterBottom>
        {title}
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box
        component='form'
        onSubmit={handleSubmit(onSubmitForm)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Controller
          name='code'
          control={control}
          rules={{
            required: FIELD_REQUIRED_MESSAGE,
            minLength: { value: 3, message: 'Mã tối thiểu 3 ký tự' }
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label='Mã voucher'
              fullWidth
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <FormControl fullWidth>
          <InputLabel>Loại</InputLabel>
          <Controller
            name='type'
            control={control}
            render={({ field }) => (
              <Select {...field} label='Loại'>
                <MenuItem value='percent'>Phần trăm</MenuItem>
                <MenuItem value='fixed'>Cố định</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        <Controller
          name='amount'
          control={control}
          rules={{
            required: FIELD_REQUIRED_MESSAGE,
            min: { value: 0, message: 'Không âm' }
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label={type === 'percent' ? 'Giảm (%)' : 'Giảm (VND)'}
              type='number'
              fullWidth
              error={!!error}
              helperText={error?.message}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />

        <Controller
          name='maxDiscount'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label='Giảm tối đa (VND)'
              type='number'
              fullWidth
              error={!!error}
              helperText={error?.message}
              onChange={(e) =>
                field.onChange(
                  e.target.value === '' ? '' : Number(e.target.value)
                )
              }
            />
          )}
        />

        <Controller
          name='minOrderValue'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label='Giá trị đơn tối thiểu (VND)'
              type='number'
              fullWidth
              error={!!error}
              helperText={error?.message}
              onChange={(e) =>
                field.onChange(
                  e.target.value === '' ? '' : Number(e.target.value)
                )
              }
            />
          )}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Controller
            name='startDate'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Bắt đầu'
                type='datetime-local'
                fullWidth
              />
            )}
          />
          <Controller
            name='endDate'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Kết thúc'
                type='datetime-local'
                fullWidth
              />
            )}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Controller
            name='usageLimit'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label='Giới hạn dùng (0 = không giới hạn)'
                type='number'
                fullWidth
                error={!!error}
                helperText={error?.message}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === '' ? '' : Number(e.target.value)
                  )
                }
              />
            )}
          />
          <Controller
            name='usedCount'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label='Đã dùng'
                type='number'
                fullWidth
                error={!!error}
                helperText={error?.message}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === '' ? '' : Number(e.target.value)
                  )
                }
              />
            )}
          />
        </Box>

        <Controller
          name='isActive'
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={!!field.value}
                  onChange={(_, checked) => field.onChange(checked)}
                />
              }
              label='Kích hoạt'
            />
          )}
        />

        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button type='submit' variant='contained' color='primary' fullWidth>
            {voucher ? 'Cập nhật voucher' : 'Thêm voucher'}
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

export default VoucherFormDrawer
