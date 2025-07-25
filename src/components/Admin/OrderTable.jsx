import React, { useState, useMemo } from 'react'
import { Box } from '@mui/material'
import {
  OrderTableHeader,
  OrderDataGrid,
  OrderDetailsDialog
} from './OrderTableComponents'

// Mock data for orders
const mockOrders = [
  {
    id: 1,
    userName: 'Nguyen Van A',
    phone: '0901234567',
    address: '123 Nguyen Hue, District 1, Ho Chi Minh City',
    isPaid: true,
    isShipped: true,
    paymentMethod: 'COD',
    totalPrice: 28990000,
    orderDate: '2023-05-15'
  },
  {
    id: 2,
    userName: 'Tran Thi B',
    phone: '0908765432',
    address: '456 Le Loi, Ba Dinh, Ha Noi',
    isPaid: true,
    isShipped: false,
    paymentMethod: 'Banking',
    totalPrice: 23990000,
    orderDate: '2023-05-18'
  },
  {
    id: 3,
    userName: 'Le Van C',
    phone: '0905555555',
    address: '789 Pham Ngu Lao, Hai Chau, Da Nang',
    isPaid: false,
    isShipped: false,
    paymentMethod: 'COD',
    totalPrice: 45990000,
    orderDate: '2023-05-20'
  },
  {
    id: 4,
    userName: 'Hoang Thi D',
    phone: '0903333333',
    address: '101 Nguyen Trai, Ninh Kieu, Can Tho',
    isPaid: true,
    isShipped: true,
    paymentMethod: 'Paypal',
    totalPrice: 16990000,
    orderDate: '2023-05-22'
  },
  {
    id: 5,
    userName: 'Pham Van E',
    phone: '0907777777',
    address: '202 Tran Hung Dao, District 5, Ho Chi Minh City',
    isPaid: false,
    isShipped: false,
    paymentMethod: 'Banking',
    totalPrice: 10990000,
    orderDate: '2023-05-25'
  }
]

const OrderTable = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  // Filter orders based on search term
  const filteredOrders = useMemo(() => {
    return mockOrders.filter(
      (order) =>
        order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  // Action handlers
  const handleViewDetails = (id) => {
    const order = mockOrders.find((order) => order.id === id)
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

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <OrderTableHeader
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
      />

      <OrderDataGrid
        filteredOrders={filteredOrders}
        onViewDetails={handleViewDetails}
        onPrint={handlePrint}
      />

      <OrderDetailsDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        selectedOrder={selectedOrder}
        onPrint={handlePrint}
      />
    </Box>
  )
}

export default OrderTable
