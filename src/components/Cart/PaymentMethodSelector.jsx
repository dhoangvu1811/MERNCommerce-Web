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

const METHODS = [
  { value: 'cod', label: 'Thanh toán khi nhận hàng (COD)' },
  { value: 'card', label: 'Thẻ tín dụng/Ghi nợ' },
  { value: 'ewallet', label: 'Ví điện tử (MoMo/ZaloPay)' },
  { value: 'bank', label: 'Chuyển khoản ngân hàng' }
]

function PaymentMethodSelector({ value, onChange }) {
  return (
    <Paper sx={{ p: 2, borderRadius: 2, mb: 2 }}>
      <FormControl component='fieldset'>
        <FormLabel component='legend'>Phương thức thanh toán</FormLabel>
        <RadioGroup
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
        >
          {METHODS.map((m) => (
            <FormControlLabel
              key={m.value}
              value={m.value}
              control={<Radio />}
              label={m.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {!value && (
        <Box sx={{ mt: 1 }}>
          <Typography variant='caption' color='error'>
            Vui lòng chọn phương thức thanh toán
          </Typography>
        </Box>
      )}
    </Paper>
  )
}

export default PaymentMethodSelector
