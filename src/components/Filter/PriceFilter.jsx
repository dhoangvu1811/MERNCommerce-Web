import { useState } from 'react'
import {
  Box,
  Typography,
  Slider,
  TextField,
  InputAdornment,
  Stack,
  Divider
} from '@mui/material'

function PriceFilter({ onChange }) {
  const [price, setPrice] = useState([0, 10000000])
  const minDistance = 500000

  // Format price as VND currency
  const formatPrice = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(value)
  }

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return
    }

    // Prevent min/max from getting too close
    if (activeThumb === 0) {
      setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]])
    } else {
      setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)])
    }

    if (onChange) {
      onChange(price)
    }
  }

  const handleMinInputChange = (event) => {
    // Loại bỏ ký tự không phải số
    const value = Number(event.target.value.replace(/[^0-9]/g, ''))
    if (!isNaN(value)) {
      // Đảm bảo giá trị không nhỏ hơn 0 và không lớn hơn giá trị tối đa trừ khoảng cách tối thiểu
      setPrice([Math.min(value, price[1] - minDistance), price[1]])
      if (onChange) onChange(price)
    }
  }

  const handleMaxInputChange = (event) => {
    const value = Number(event.target.value.replace(/[^0-9]/g, ''))
    if (!isNaN(value)) {
      // Đảm bảo giá trị không nhỏ hơn giá trị tối thiểu cộng khoảng cách tối thiểu
      setPrice([price[0], Math.max(value, price[0] + minDistance)])
      if (onChange) onChange(price)
    }
  }

  const marks = [
    { value: 0, label: '0đ' },
    { value: 2500000, label: '2.5tr' },
    { value: 5000000, label: '5tr' },
    { value: 7500000, label: '7.5tr' },
    { value: 10000000, label: '10tr+' }
  ]

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant='subtitle1' fontWeight='bold' gutterBottom>
        Khoảng giá
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Slider
        value={price}
        onChange={handleChange}
        valueLabelDisplay='auto'
        valueLabelFormat={formatPrice}
        disableSwap
        marks={marks}
        min={0}
        max={10000000}
        step={100000}
        sx={{ mt: 4, mb: 2 }}
      />

      <Stack direction='row' spacing={2} alignItems='center'>
        <TextField
          label='Từ'
          value={formatPrice(price[0])}
          onChange={handleMinInputChange}
          size='small'
          InputProps={{
            startAdornment: <InputAdornment position='start'>₫</InputAdornment>
          }}
        />
        <Box sx={{ mx: 1 }}>-</Box>
        <TextField
          label='Đến'
          value={formatPrice(price[1])}
          onChange={handleMaxInputChange}
          size='small'
          InputProps={{
            startAdornment: <InputAdornment position='start'>₫</InputAdornment>
          }}
        />
      </Stack>
    </Box>
  )
}

export default PriceFilter
