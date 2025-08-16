import { Card, CardContent, Box, Grid, Divider } from '@mui/material'
import OrderStatusChip from './OrderStatusChip'
import OrderInfo from './OrderInfo'
import OrderProductList from './OrderProductList'
import OrderSummary from './OrderSummary'
import OrderTrackingInfo from './OrderTrackingInfo'
import OrderActions from './OrderActions'

function OrderCard({
  order,
  onViewDetails,
  onTrackOrder,
  onReviewProduct,
  onCancelOrder,
  onReorder
}) {
  return (
    <Card sx={{ mb: 2, border: '1px solid #e0e0e0' }}>
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}
        >
          <OrderInfo orderId={order.id} orderDate={order.orderDate} />
          <OrderStatusChip
            status={order.status}
            paymentStatus={order.paymentStatus}
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Products & Summary */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={8}>
            <OrderProductList
              items={order.items}
              maxVisible={1}
              productSize='medium'
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <OrderSummary
              total={order.total}
              paymentMethod={order.paymentMethod}
              textAlign={{ xs: 'left', md: 'right' }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Footer */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: { xs: 'wrap', md: 'nowrap' },
            gap: 2
          }}
        >
          <OrderTrackingInfo
            trackingNumber={order.trackingNumber}
            estimatedDelivery={order.estimatedDelivery}
          />
          <OrderActions
            order={order}
            onViewDetails={onViewDetails}
            onTrackOrder={onTrackOrder}
            onReviewProduct={onReviewProduct}
            onCancelOrder={onCancelOrder}
            onReorder={onReorder}
            compact={true}
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export default OrderCard
