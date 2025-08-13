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
import {
  FIELD_REQUIRED_MESSAGE,
  VOUCHER_CODE_RULE,
  VOUCHER_CODE_RULE_MESSAGE
} from '../../../utils/validators'
import {
  toDateTimeLocal,
  sanitizeVoucherCode
} from '../../../utils/formatUtils'

const VoucherFormDrawer = ({
  open,
  onClose,
  onSubmit,
  voucher = null,
  title
}) => {
  // Dùng util toDateTimeLocal từ utils/formatUtils

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      code: voucher?.code || '',
      type: voucher?.type || 'percent',
      amount: voucher?.amount ?? 0,
      maxDiscount: voucher?.maxDiscount ?? 0,
      minOrderValue: voucher?.minOrderValue ?? 0,
      startDate: toDateTimeLocal(voucher?.startDate),
      endDate: toDateTimeLocal(voucher?.endDate),
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
        startDate: toDateTimeLocal(voucher.startDate),
        endDate: toDateTimeLocal(voucher.endDate),
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
            minLength: { value: 3, message: 'Mã tối thiểu 3 ký tự' },
            pattern: {
              value: VOUCHER_CODE_RULE,
              message: VOUCHER_CODE_RULE_MESSAGE
            }
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label='Mã voucher'
              fullWidth
              error={!!error}
              helperText={error?.message}
              onChange={(e) =>
                field.onChange(sanitizeVoucherCode(e.target.value))
              }
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
            validate: (v) => {
              const val = Number(v)
              if (!Number.isFinite(val)) return 'Giá trị không hợp lệ'
              if (type === 'percent') {
                if (!Number.isInteger(val)) return 'Phần trăm phải là số nguyên'
                if (val < 1 || val > 100)
                  return 'Phần trăm phải trong khoảng 1 - 100'
                return true
              }
              // fixed amount (VND)
              if (val <= 0) return 'Giá trị phải > 0'
              return true
            }
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label={type === 'percent' ? 'Giảm (%)' : 'Giảm (VND)'}
              type='number'
              fullWidth
              error={!!error}
              helperText={error?.message}
              inputProps={{
                step: type === 'percent' ? '1' : '0.01',
                min: type === 'percent' ? '1' : '0.01',
                max: type === 'percent' ? '100' : undefined
              }}
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
              inputProps={{ step: '0.01', min: '0' }}
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
              inputProps={{ step: '0.01', min: '0' }}
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
                inputProps={{ step: '1', min: '0' }}
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
                inputProps={{ step: '1', min: '0' }}
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
