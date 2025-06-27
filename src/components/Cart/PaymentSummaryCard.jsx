import React from 'react'
import { Box, Typography, Button, Paper, Divider, Stack } from '@mui/material'
import { formatPrice } from '../../utils/formatUtils'

/**
 * Order summary and payment information component
 */
function PaymentSummaryCard({
  subtotal,
  shippingFee = 30000,
  discount = 10000,
  totalItems,
  onCheckout
}) {
  const showAmounts = subtotal > 0
  const total = showAmounts ? subtotal + shippingFee - discount : 0

  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 2
      }}
    >
      <Typography fontWeight='medium' sx={{ mb: 2 }}>
        Payment Information
      </Typography>

      <Stack spacing={1.5}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography color='text.secondary'>Subtotal</Typography>
          <Typography>{formatPrice(subtotal)}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography color='text.secondary'>Shipping Fee</Typography>
          <Typography>
            {showAmounts ? formatPrice(shippingFee) : formatPrice(0)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography color='text.secondary'>Shop Voucher</Typography>
          <Typography color='error'>
            {showAmounts ? '- ' + formatPrice(discount) : formatPrice(0)}
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography fontWeight='medium'>Total</Typography>
          <Typography color='error' fontWeight='bold' fontSize='1.1rem'>
            {formatPrice(total)}
          </Typography>
        </Box>

        <Button
          variant='contained'
          color='error'
          size='large'
          disabled={totalItems === 0}
          onClick={onCheckout}
          sx={{ mt: 2 }}
        >
          Checkout ({totalItems})
        </Button>
      </Stack>
    </Paper>
  )
}

export default PaymentSummaryCard
