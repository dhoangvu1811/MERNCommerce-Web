/* eslint-disable indent */
import { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Grid,
  Paper,
  CircularProgress
} from '@mui/material'
import {
  Receipt,
  LocalShipping,
  CheckCircle,
  Cancel,
  Refresh
} from '@mui/icons-material'
import { toast } from 'react-toastify'
import { OrderCard, OrderDetailsDialog } from '../components/Orders'
import { getMyOrders, getOrderDetails, cancelOrder } from '~/apis/orderApi'
import {
  ORDER_STATUS,
  getProcessingStatuses,
  filterOrdersByCategory
} from '~/utils/orderConstants'

function MyOrders() {
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const mapOrder = (o) => ({
    id: o._id || o.id,
    orderCode: o.orderCode,
    orderDate: o.createdAt || o.orderDate,
    status: o.status,
    paymentStatus: o.paymentStatus,
    // Use totals.payable as per API documentation
    total: o.totals?.payable ?? 0,
    items: (o.items || []).map((it) => ({
      id: it.productId || it._id || it.id,
      name: it.name,
      // Use lineTotal as per API documentation for OrderItem
      price: it.lineTotal ?? 0,
      quantity: it.quantity,
      image: it.image
    })),
    shippingAddress: o.shippingAddress,
    paymentMethod: o.paymentMethod,
    trackingNumber: o.trackingNumber,
    estimatedDelivery: o.estimatedDelivery,
    cancelReason: o.cancelReason
  })

  const load = useCallback(async () => {
    try {
      setLoading(true)
      const res = await getMyOrders(1, 20)
      const list = res?.data?.orders || []
      setOrders(list.map(mapOrder))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
  }

  const handleOrderClick = async (order) => {
    try {
      const res = await getOrderDetails(order.id)
      const detail = res?.data || order
      setSelectedOrder(mapOrder(detail))
    } catch {
      // Fallback to basic order data if details fetch fails
      setSelectedOrder(order)
    } finally {
      setDialogOpen(true)
    }
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setSelectedOrder(null)
  }

  // Handler functions cho các actions
  const handleTrackOrder = (order) => {
    // TODO: Implement tracking logic
    alert(`Theo dõi đơn hàng: ${order.id}`)
  }

  const handleReviewProduct = (order) => {
    // TODO: Implement review logic
    alert(`Đánh giá sản phẩm cho đơn hàng: ${order.id}`)
  }

  const handleCancelOrder = async (order) => {
    try {
      await cancelOrder(order.id)
      toast.success('Đơn hàng đã được hủy thành công')
      await load()
    } catch {
      // Error handling is done by axios interceptor
    }
  }

  const handleReorder = (order) => {
    // TODO: Implement reorder logic
    alert(`Đặt lại đơn hàng: ${order.id}`)
  }

  // Lọc đơn hàng theo tab
  const getFilteredOrders = () => {
    let filtered = orders

    // Lọc theo tab - sử dụng constants từ orderConstants
    switch (selectedTab) {
      case 1:
        filtered = filtered.filter((order) =>
          getProcessingStatuses().includes(order.status)
        )
        break
      case 2:
        filtered = filtered.filter(
          (order) => order.status === ORDER_STATUS.SHIPPED
        )
        break
      case 3:
        filtered = filtered.filter(
          (order) => order.status === ORDER_STATUS.COMPLETED
        )
        break
      case 4:
        filtered = filtered.filter(
          (order) => order.status === ORDER_STATUS.CANCELLED
        )
        break
      default:
        // Show all orders for default case
        break
    }

    return filtered
  }

  const getOrderStats = () => {
    return {
      total: orders.length,
      processing: filterOrdersByCategory(orders, 'processing').length,
      completed: filterOrdersByCategory(orders, 'completed').length,
      cancelled: filterOrdersByCategory(orders, 'cancelled').length,
      shipped: orders.filter((order) => order.status === ORDER_STATUS.SHIPPED)
        .length
    }
  }

  const stats = getOrderStats()
  const filteredOrders = getFilteredOrders()

  return (
    <Box sx={{ py: 4, flexGrow: 1 }}>
      <Container maxWidth='xl'>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant='h4' sx={{ fontWeight: 'bold', mb: 1 }}>
            Đơn hàng của tôi
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Theo dõi và quản lý tất cả đơn hàng của bạn
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={6} md={2.4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Receipt sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                {stats.total}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Tổng đơn hàng
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} md={2.4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Refresh sx={{ fontSize: 32, color: 'warning.main', mb: 1 }} />
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                {stats.processing}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Đang xử lý
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} md={2.4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <LocalShipping sx={{ fontSize: 32, color: 'info.main', mb: 1 }} />
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                {stats.shipped}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Đang giao
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} md={2.4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <CheckCircle
                sx={{ fontSize: 32, color: 'success.main', mb: 1 }}
              />
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                {stats.completed}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Đã giao
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} md={2.4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Cancel sx={{ fontSize: 32, color: 'error.main', mb: 1 }} />
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                {stats.cancelled}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Đã hủy
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant='scrollable'
            scrollButtons='auto'
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label={`Tất cả (${stats.total})`} />
            <Tab label={`Đang xử lý (${stats.processing})`} />
            <Tab label={`Đang giao (${stats.shipped})`} />
            <Tab label={`Đã giao (${stats.completed})`} />
            <Tab label={`Đã hủy (${stats.cancelled})`} />
          </Tabs>
        </Paper>

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Orders List */}
        {!loading && (
          <Box sx={{ mb: 4 }}>
            {filteredOrders.length === 0 ? (
              <Paper sx={{ p: 6, textAlign: 'center' }}>
                <Receipt
                  sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }}
                />
                <Typography variant='h6' color='text.secondary' sx={{ mb: 1 }}>
                  Không có đơn hàng nào
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Bạn chưa có đơn hàng nào trong mục này
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {filteredOrders.map((order) => {
                  return (
                    <Grid item xs={12} key={order.id}>
                      <OrderCard
                        order={order}
                        onViewDetails={() => handleOrderClick(order)}
                        onTrackOrder={() => handleTrackOrder(order)}
                        onReviewProduct={() => handleReviewProduct(order)}
                        onCancelOrder={() => handleCancelOrder(order)}
                        onReorder={() => handleReorder(order)}
                      />
                    </Grid>
                  )
                })}
              </Grid>
            )}
          </Box>
        )}

        {/* Order Details Dialog */}
        {selectedOrder && (
          <OrderDetailsDialog
            open={dialogOpen}
            order={selectedOrder}
            onClose={handleCloseDialog}
          />
        )}
      </Container>
    </Box>
  )
}

export default MyOrders
