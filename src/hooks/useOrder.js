import { useState, useEffect, useMemo } from 'react'
import { getAllOrders } from '../apis/orderApi'

const useOrder = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    page: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0
  })
  const [filters, setFilters] = useState({
    status: '',
    paymentStatus: '',
    search: ''
  })

  // Load orders from API
  const loadOrders = async (page = 1, itemsPerPage = 10, searchQuery = '') => {
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
          totalItems: response.data.pagination?.totalOrders || 0,
          totalPages: response.data.pagination?.totalPages || 0
        })
      }
    } catch {
      // Error handling is centralized in axiosConfig.js
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  // Load orders on component mount and when filters change
  useEffect(() => {
    const fetchOrders = async () => {
      await loadOrders(1, 10, filters.search)
    }
    fetchOrders()
  }, [filters])

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
    refreshOrders
  }
}

export default useOrder
