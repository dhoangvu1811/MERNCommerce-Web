import React, { useState } from 'react'
import { Box, CircularProgress } from '@mui/material'
import {
  OrderTableHeader,
  OrderDataGrid,
  OrderDetailsDialog
} from './OrderTableComponents'
import useOrder from '../../hooks/useOrder'

const OrderTable = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  // Use custom hook for order management
  const {
    orders,
    loading,
    pagination,
    getFilteredOrders,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
    handleMarkOrderPaid,
    handleUpdateOrderStatus,
    handleUpdatePaymentStatus,
    handleAdminCancelOrder,
    loadOrders
  } = useOrder()

  // Get filtered orders using the hook
  const filteredOrders = getFilteredOrders(searchTerm)

  // Handle refresh data
  const handleRefresh = () => {
    loadOrders(pagination.page, pagination.itemsPerPage, searchTerm)
  }

  // Action handlers
  const handleViewDetails = (id) => {
    const order = orders.find((order) => order._id === id)
    setSelectedOrder(order)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setSelectedOrder(null)
  }

  const handlePrint = (id) => {
    alert(`Print invoice for order id: ${id}`)
  }

  if (loading && orders.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '400px'
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <OrderTableHeader
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onSearch={handleSearch}
        onRefresh={handleRefresh}
        loading={loading}
      />

      <OrderDataGrid
        filteredOrders={filteredOrders}
        onViewDetails={handleViewDetails}
        onPrint={handlePrint}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

      <OrderDetailsDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        selectedOrder={selectedOrder}
        onPrint={handlePrint}
        onMarkOrderPaid={handleMarkOrderPaid}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onUpdatePaymentStatus={handleUpdatePaymentStatus}
        onAdminCancelOrder={handleAdminCancelOrder}
      />
    </Box>
  )
}

export default OrderTable
