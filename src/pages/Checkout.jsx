import { useMemo, useState } from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Divider,
  Stack
} from '@mui/material'
import { useSelector } from 'react-redux'
import ShippingAddressCard from '../components/Cart/ShippingAddressCard'
import PaymentSummaryCard from '../components/Cart/PaymentSummaryCard'
import PaymentMethodSelector from '../components/Cart/PaymentMethodSelector'
import { formatPrice } from '../utils/formatUtils'

function Checkout() {
  const items = useSelector((state) => state.order.items)
  const shippingAddress = useSelector((state) => state.order.shippingAddress)

  const subtotal = useMemo(
    () =>
      (items || []).reduce(
        (sum, it) => sum + Number(it.price) * Number(it.quantity),
        0
      ),
    [items]
  )

  const [paymentMethod, setPaymentMethod] = useState('')
  const canPlaceOrder = (items?.length ?? 0) > 0 && Boolean(paymentMethod)

  return (
    <Box sx={{ py: 4, minHeight: '100vh' }}>
      <Container maxWidth='xl'>
        <Typography variant='h4' sx={{ mb: 3, fontWeight: 'bold' }}>
          Checkout
        </Typography>

        <Grid container spacing={3}>
          {/* Left: Address + Items */}
          <Grid size={{ xs: 12, md: 8 }}>
            <ShippingAddressCard address={shippingAddress} />

            <Paper sx={{ p: 2, borderRadius: 2, mb: 2 }}>
              <Typography fontWeight='medium' sx={{ mb: 1.5 }}>
                Order Items ({(items || []).length})
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {(!items || items.length === 0) && (
                <Typography variant='body2' color='text.secondary'>
                  Không có sản phẩm nào trong đơn hàng.
                </Typography>
              )}

              {(items || []).map((it, idx) => {
                const unit = Number(it.price) || 0
                const qty = Number(it.quantity) || 0
                const total = unit * qty
                const imgSrc = it.image || '/src/assets/products/productimg.png'

                return (
                  <Box key={it.productId} sx={{ py: 1.5 }}>
                    <Stack direction='row' spacing={2} alignItems='center'>
                      <Box
                        component='img'
                        src={imgSrc}
                        alt={it.name}
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 1,
                          objectFit: 'cover',
                          border: '1px solid rgba(0,0,0,0.08)'
                        }}
                      />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography noWrap title={it.name} fontWeight='medium'>
                          {it.name}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          x{qty}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography fontWeight='medium'>
                          {formatPrice(total)}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          ({formatPrice(unit)} / sp)
                        </Typography>
                      </Box>
                    </Stack>
                    {idx < (items?.length || 0) - 1 && (
                      <Divider sx={{ mt: 1.5 }} />
                    )}
                  </Box>
                )
              })}
            </Paper>

            {/* Payment Method */}
            <PaymentMethodSelector
              value={paymentMethod}
              onChange={setPaymentMethod}
            />
          </Grid>

          {/* Right: Summary */}
          <Grid size={{ xs: 12, md: 4 }}>
            <PaymentSummaryCard
              subtotal={subtotal}
              shippingFee={30000}
              discount={0}
              totalItems={(items || []).reduce(
                (n, it) => n + Number(it.quantity),
                0
              )}
              onCheckout={() => {
                /* TODO: place order */
              }}
              ctaLabel='Place Order'
              disabled={!canPlaceOrder}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Checkout
