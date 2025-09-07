import { useState, useEffect, useMemo, useCallback } from 'react'
import { toast } from 'react-toastify'
import {
  getAllOrders,
  markOrderPaid,
  updateOrderStatus
} from '../apis/orderApi'

const useOrder = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    page: 1,
    itemsPerPage: 10,
    totalOrders: 0,
    totalPages: 0
  })
  const [filters, setFilters] = useState({
    status: '',
    paymentStatus: '',
    search: ''
  })

  // Load orders from API
  const loadOrders = useCallback(
    async (page = 1, itemsPerPage = 10, searchQuery = '') => {
      try {
        setLoading(true)

        const params = {
          page,
          itemsPerPage,
          ...filters
        }

        if (searchQuery) {
          params.search = searchQuery
        }

        const response = await getAllOrders(params)

        if (response.code === 200) {
          setOrders(response.data.orders || [])
          setPagination({
            page: response.data.pagination?.page || 1,
            itemsPerPage: response.data.pagination?.itemsPerPage || 10,
            totalOrders: response.data.pagination?.totalOrders || 0,
            totalPages: response.data.pagination?.totalPages || 0
          })
        }
      } catch {
        // Error handling is centralized in axiosConfig.js
        setOrders([])
      } finally {
        setLoading(false)
      }
    },
    [filters]
  )

  // Load orders on component mount and when filters change
  useEffect(() => {
    const fetchOrders = async () => {
      await loadOrders(1, 10, filters.search)
    }
    fetchOrders()
  }, [filters, loadOrders])

  // Filter orders based on search term (client-side for immediate feedback)
  const getFilteredOrders = useMemo(() => {
    return (searchTerm) => {
      if (!searchTerm) return orders

      return orders.filter(
        (order) =>
          order.shippingAddress?.name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order.shippingAddress?.phone
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order.shippingAddress?.fullAddress
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order.paymentMethod
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order._id?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
  }, [orders])

  // Action handlers
  const handleSearch = (searchQuery) => {
    setFilters((prev) => ({ ...prev, search: searchQuery }))
  }

  const handlePageChange = (newPage) => {
    loadOrders(newPage, pagination.itemsPerPage, filters.search)
  }

  const handlePageSizeChange = (newPageSize) => {
    loadOrders(1, newPageSize, filters.search)
  }

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const refreshOrders = () => {
    loadOrders(pagination.page, pagination.itemsPerPage, filters.search)
  }

  // Handle mark order as paid
  const handleMarkOrderPaid = async (orderId) => {
    try {
      setLoading(true)
      const response = await markOrderPaid(orderId)

      if (response.code === 200) {
        // Refresh orders list to get updated data
        refreshOrders()
        toast.success('Đã đánh dấu đơn hàng đã thanh toán thành công')
        return true // Indicate success
      } else {
        // Handle non-200 response
        throw new Error('Failed to mark order as paid')
      }
    } finally {
      setLoading(false)
    }
  }

  // Handle update order status
  const handleUpdateOrderStatus = async (orderId, updateData) => {
    try {
      setLoading(true)
      const response = await updateOrderStatus(orderId, updateData)

      if (response.code === 200) {
        // Refresh orders list to get updated data
        refreshOrders()
        toast.success('Đã cập nhật trạng thái đơn hàng thành công')
        return true // Indicate success
      } else {
        // Handle non-200 response
        throw new Error('Failed to update order status')
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    // State
    orders,
    loading,
    pagination,
    filters,

    // Functions
    loadOrders,
    getFilteredOrders,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
    handleFilterChange,
    refreshOrders,
    handleMarkOrderPaid,
    handleUpdateOrderStatus
  }
}

export default useOrder
