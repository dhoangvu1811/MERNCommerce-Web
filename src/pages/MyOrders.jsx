/* eslint-disable indent */
import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Grid,
  Paper
} from '@mui/material'
import {
  Receipt,
  LocalShipping,
  CheckCircle,
  Cancel,
  Refresh
} from '@mui/icons-material'
import { OrderCard, OrderDetailsDialog } from '../components/Orders'

function MyOrders() {
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  // Mock data đơn hàng
  const mockOrders = [
    {
      id: 'ORD-2024-001',
      orderDate: '2024-01-15',
      status: 'delivered',
      total: 2850000,
      items: [
        {
          id: 1,
          name: 'iPhone 15 Pro Max 256GB',
          price: 2500000,
          quantity: 1,
          image: '/src/assets/products/productimg.png'
        },
        {
          id: 2,
          name: 'Ốp lưng iPhone 15 Pro Max',
          price: 350000,
          quantity: 1,
          image: '/src/assets/products/productimg.png'
        }
      ],
      shippingAddress: {
        name: 'Nguyễn Văn A',
        phone: '0901234567',
        address: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM'
      },
      paymentMethod: 'Thẻ tín dụng',
      trackingNumber: 'VN123456789',
      estimatedDelivery: '2024-01-20'
    },
    {
      id: 'ORD-2024-002',
      orderDate: '2024-01-20',
      status: 'shipping',
      total: 1890000,
      items: [
        {
          id: 3,
          name: 'Samsung Galaxy S24 Ultra',
          price: 1890000,
          quantity: 1,
          image: '/src/assets/products/productimg.png'
        }
      ],
      shippingAddress: {
        name: 'Nguyễn Văn A',
        phone: '0901234567',
        address: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM'
      },
      paymentMethod: 'COD',
      trackingNumber: 'VN987654321',
      estimatedDelivery: '2024-01-25'
    },
    {
      id: 'ORD-2024-003',
      orderDate: '2024-01-22',
      status: 'processing',
      total: 450000,
      items: [
        {
          id: 4,
          name: 'Tai nghe AirPods Pro 2',
          price: 450000,
          quantity: 1,
          image: '/src/assets/products/productimg.png'
        }
      ],
      shippingAddress: {
        name: 'Nguyễn Văn A',
        phone: '0901234567',
        address: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM'
      },
      paymentMethod: 'Chuyển khoản',
      trackingNumber: null,
      estimatedDelivery: '2024-01-28'
    },
    {
      id: 'ORD-2024-004',
      orderDate: '2024-01-10',
      status: 'cancelled',
      total: 690000,
      items: [
        {
          id: 5,
          name: 'MacBook Air M2',
          price: 690000,
          quantity: 1,
          image: '/src/assets/products/productimg.png'
        }
      ],
      shippingAddress: {
        name: 'Nguyễn Văn A',
        phone: '0901234567',
        address: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM'
      },
      paymentMethod: 'Thẻ tín dụng',
      trackingNumber: null,
      estimatedDelivery: null,
      cancelReason: 'Khách hàng hủy đơn'
    }
  ]

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
  }

  const handleOrderClick = (order) => {
    setSelectedOrder(order)
    setDialogOpen(true)
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

  const handleCancelOrder = (order) => {
    // TODO: Implement cancel logic
    alert(`Hủy đơn hàng: ${order.id}`)
  }

  const handleReorder = (order) => {
    // TODO: Implement reorder logic
    alert(`Đặt lại đơn hàng: ${order.id}`)
  }

  // Lọc đơn hàng theo tab
  const getFilteredOrders = () => {
    let filtered = mockOrders

    // Lọc theo tab
    switch (selectedTab) {
      case 1:
        filtered = filtered.filter((order) => order.status === 'processing')
        break
      case 2:
        filtered = filtered.filter((order) => order.status === 'shipping')
        break
      case 3:
        filtered = filtered.filter((order) => order.status === 'delivered')
        break
      case 4:
        filtered = filtered.filter((order) => order.status === 'cancelled')
        break
      default:
        break
    }

    return filtered
  }

  const getOrderStats = () => {
    return {
      total: mockOrders.length,
      processing: mockOrders.filter((o) => o.status === 'processing').length,
      shipping: mockOrders.filter((o) => o.status === 'shipping').length,
      delivered: mockOrders.filter((o) => o.status === 'delivered').length,
      cancelled: mockOrders.filter((o) => o.status === 'cancelled').length
    }
  }

  const stats = getOrderStats()
  const filteredOrders = getFilteredOrders()

  return (
      <Box sx={{ py: 4, flexGrow: 1, bgcolor: '#f8f9fa' }}>
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
                <LocalShipping
                  sx={{ fontSize: 32, color: 'info.main', mb: 1 }}
                />
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                  {stats.shipping}
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
                  {stats.delivered}
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
              <Tab label={`Đang giao (${stats.shipping})`} />
              <Tab label={`Đã giao (${stats.delivered})`} />
              <Tab label={`Đã hủy (${stats.cancelled})`} />
            </Tabs>
          </Paper>

          {/* Orders List */}
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
                {filteredOrders.map((order) => (
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
                ))}
              </Grid>
            )}
          </Box>

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
