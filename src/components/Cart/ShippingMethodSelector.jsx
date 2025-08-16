import React from 'react'
import {
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Typography
} from '@mui/material'
import { LocalShipping, FlightTakeoff } from '@mui/icons-material'
import { formatPrice } from '~/utils/formatUtils'

const SHIPPING_METHODS = [
  {
    value: 'standard',
    label: 'Giao hàng tiêu chuẩn',
    description: '3-5 ngày làm việc',
    fee: 30000,
    icon: <LocalShipping />
  },
  {
    value: 'express',
    label: 'Giao hàng nhanh',
    description: '1-2 ngày làm việc',
    fee: 50000,
    icon: <FlightTakeoff />
  }
]

function ShippingMethodSelector({ value, onChange }) {
  const selectedMethod =
    SHIPPING_METHODS.find((method) => method.value === value) ||
    SHIPPING_METHODS[0]

  const handleChange = (event) => {
    const selectedValue = event.target.value
    const method = SHIPPING_METHODS.find((m) => m.value === selectedValue)
    if (onChange && method) {
      onChange(method)
    }
  }

  return (
    <Paper sx={{ p: 2, borderRadius: 2, mb: 2 }}>
      <FormControl component='fieldset' fullWidth>
        <FormLabel component='legend' sx={{ mb: 1 }}>
          Phương thức vận chuyển
        </FormLabel>
        <RadioGroup value={selectedMethod.value} onChange={handleChange}>
          {SHIPPING_METHODS.map((method) => (
            <FormControlLabel
              key={method.value}
              value={method.value}
              control={<Radio />}
              label={
                <Box
                  sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
                >
                  <Box sx={{ mr: 1, color: 'text.secondary' }}>
                    {method.icon}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant='body2' fontWeight='medium'>
                      {method.label}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {method.description}
                    </Typography>
                  </Box>
                  <Typography
                    variant='body2'
                    fontWeight='medium'
                    color='primary.main'
                  >
                    {formatPrice(method.fee)}
                  </Typography>
                </Box>
              }
              sx={{
                m: 0,
                p: 1,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'action.hover'
                }
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Paper>
  )
}

export default ShippingMethodSelector
