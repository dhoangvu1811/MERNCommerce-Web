import axiosInstance from './axiosConfig'

// Prefix: /orders
const ORDER_PREFIX = '/orders'

// User endpoints
export const createOrder = async (orderData) => {
  const res = await axiosInstance.post(`${ORDER_PREFIX}/create`, orderData)
  return res.data
}

export const getMyOrders = async (page = 1, itemsPerPage = 10) => {
  const params = { page, itemsPerPage }
  const res = await axiosInstance.get(`${ORDER_PREFIX}/my-orders`, { params })
  return res.data
}

export const getOrderDetails = async (orderId) => {
  const res = await axiosInstance.get(`${ORDER_PREFIX}/details/${orderId}`)
  return res.data
}

export const cancelOrder = async (orderId) => {
  const res = await axiosInstance.post(`${ORDER_PREFIX}/cancel/${orderId}`)
  return res.data
}

// Admin endpoints
export const getAllOrders = async ({
  page = 1,
  itemsPerPage = 10,
  status,
  paymentStatus,
  search
} = {}) => {
  const params = { page, itemsPerPage }
  if (status) params.status = status
  if (paymentStatus) params.paymentStatus = paymentStatus
  if (search) params.search = search
  const res = await axiosInstance.get(`${ORDER_PREFIX}/all`, { params })
  return res.data
}

export const getAdminOrderDetails = async (orderId) => {
  const res = await axiosInstance.get(
    `${ORDER_PREFIX}/admin/details/${orderId}`
  )
  return res.data
}

export const updateOrderStatus = async (orderId, updateData) => {
  const res = await axiosInstance.put(
    `${ORDER_PREFIX}/admin/update/${orderId}`,
    updateData
  )
  return res.data
}

export const updateOrderPaymentStatus = async (orderId, updateData) => {
  const res = await axiosInstance.put(
    `${ORDER_PREFIX}/admin/update-payment/${orderId}`,
    updateData
  )
  return res.data
}

export const markOrderPaid = async (orderId) => {
  const res = await axiosInstance.post(
    `${ORDER_PREFIX}/admin/mark-paid/${orderId}`
  )
  return res.data
}

export const adminCancelOrder = async (orderId) => {
  const res = await axiosInstance.post(
    `${ORDER_PREFIX}/admin/cancel/${orderId}`
  )
  return res.data
}

export const getOrderLogs = async (orderId) => {
  const res = await axiosInstance.get(`${ORDER_PREFIX}/admin/logs/${orderId}`)
  return res.data
}

export const getOrderLogsByCode = async (orderCode) => {
  const res = await axiosInstance.get(
    `${ORDER_PREFIX}/admin/logs-by-code/${orderCode}`
  )
  return res.data
}
