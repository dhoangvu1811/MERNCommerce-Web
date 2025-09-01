/* eslint-disable indent */
// Order status constants (expanded)
export const ORDER_STATUS = {
  PENDING: 'PENDING', // Đơn hàng vừa tạo
  CONFIRMED: 'CONFIRMED', // Đã xác nhận đơn hàng
  PROCESSING: 'PROCESSING', // Đang chuẩn bị hàng
  PACKED: 'PACKED', // Đã đóng gói xong
  SHIPPED: 'SHIPPED', // Đã giao cho đơn vị vận chuyển
  DELIVERED: 'DELIVERED', // Đã giao thành công
  COMPLETED: 'COMPLETED', // Khách xác nhận hoàn thành
  CANCELLED: 'CANCELLED', // Đã hủy
  RETURNED: 'RETURNED', // Trả hàng
  REFUNDED: 'REFUNDED' // Đã hoàn tiền (trạng thái đơn)
}

// Payment status constants (expanded)
export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED',
  EXPIRED: 'EXPIRED'
}

// Normalize legacy values for backward-compatibility
const normalizeStatus = (s) => {
  if (!s) return s
  const upper = String(s).toUpperCase()
  // Legacy: 'paid' used as order status previously => treat as confirmed
  if (upper === 'PAID') return ORDER_STATUS.CONFIRMED
  return upper
}

const normalizePayment = (p) => {
  if (!p) return p
  const upper = String(p).toUpperCase()
  // Legacy map
  if (upper === 'UNPAID') return PAYMENT_STATUS.PENDING
  return upper
}

// Helper: map internal detailed statuses to customer-facing label/color
const mapToCustomerView = (rawStatus, rawPaymentStatus) => {
  const status = normalizeStatus(rawStatus)
  const paymentStatus = normalizePayment(rawPaymentStatus)
  // Cancel/return/refund first (terminal states)
  if (status === ORDER_STATUS.CANCELLED) {
    if ([PAYMENT_STATUS.REFUNDED].includes(paymentStatus))
      return { label: 'Đã hủy (đã hoàn tiền)', color: 'error' }
    if (
      [PAYMENT_STATUS.PAID, PAYMENT_STATUS.PROCESSING].includes(paymentStatus)
    )
      return { label: 'Đã hủy (chờ hoàn tiền)', color: 'error' }
    return { label: 'Đã hủy', color: 'error' }
  }
  if (status === ORDER_STATUS.RETURNED) {
    if ([PAYMENT_STATUS.REFUNDED].includes(paymentStatus))
      return { label: 'Đã trả hàng (đã hoàn tiền)', color: 'warning' }
    return { label: 'Đã trả hàng (chờ hoàn tiền)', color: 'warning' }
  }
  if (
    status === ORDER_STATUS.REFUNDED ||
    paymentStatus === PAYMENT_STATUS.REFUNDED
  ) {
    return { label: 'Đã hoàn tiền', color: 'success' }
  }

  // Pending flows
  if (status === ORDER_STATUS.PENDING) {
    if (paymentStatus === PAYMENT_STATUS.EXPIRED)
      return { label: 'Hết hạn thanh toán', color: 'error' }
    if ([PAYMENT_STATUS.PENDING, undefined, null].includes(paymentStatus))
      return { label: 'Chờ thanh toán', color: 'warning' }
    if (
      [PAYMENT_STATUS.PAID, PAYMENT_STATUS.PROCESSING].includes(paymentStatus)
    )
      return { label: 'Chờ xác nhận', color: 'info' }
    if (paymentStatus === PAYMENT_STATUS.FAILED)
      return { label: 'Thanh toán thất bại', color: 'error' }
  }

  // Core fulfillment pipeline (collapse PROCESSING + PACKED)
  if (status === ORDER_STATUS.CONFIRMED)
    return { label: 'Đã xác nhận', color: 'info' }
  if (status === ORDER_STATUS.PROCESSING || status === ORDER_STATUS.PACKED)
    return { label: 'Đang chuẩn bị hàng', color: 'warning' }
  if (status === ORDER_STATUS.SHIPPED)
    return { label: 'Đang giao hàng', color: 'info' }
  if (status === ORDER_STATUS.DELIVERED)
    return { label: 'Đã giao', color: 'success' }
  if (status === ORDER_STATUS.COMPLETED)
    return { label: 'Hoàn thành', color: 'success' }

  return { label: status, color: 'default' }
}

// Status display configurations based on status + paymentStatus combinations
export const getOrderStatusConfig = (status, paymentStatus) => {
  return mapToCustomerView(status, paymentStatus)
}

// Config cơ bản (đảm bảo tương thích ngược khi chỉ có status)
export const ORDER_STATUS_CONFIG = {
  [ORDER_STATUS.PENDING]: { label: 'Chờ xử lý', color: 'warning' },
  [ORDER_STATUS.CONFIRMED]: { label: 'Đã xác nhận', color: 'info' },
  [ORDER_STATUS.PROCESSING]: { label: 'Đang chuẩn bị hàng', color: 'warning' },
  [ORDER_STATUS.PACKED]: { label: 'Đang chuẩn bị hàng', color: 'warning' },
  [ORDER_STATUS.SHIPPED]: { label: 'Đang giao hàng', color: 'info' },
  [ORDER_STATUS.DELIVERED]: { label: 'Đã giao', color: 'success' },
  [ORDER_STATUS.COMPLETED]: { label: 'Hoàn thành', color: 'success' },
  [ORDER_STATUS.CANCELLED]: { label: 'Đã hủy', color: 'error' },
  [ORDER_STATUS.RETURNED]: { label: 'Đã trả hàng', color: 'warning' },
  [ORDER_STATUS.REFUNDED]: { label: 'Đã hoàn tiền', color: 'success' },
  // Legacy single status
  PAID: { label: 'Đã xác nhận', color: 'info' }
}

// Helper functions
export const isOrderCancellable = (status) => {
  // Có thể hủy khi đơn chưa giao cho hãng vận chuyển
  return [
    ORDER_STATUS.PENDING,
    ORDER_STATUS.CONFIRMED,
    ORDER_STATUS.PROCESSING,
    ORDER_STATUS.PACKED
  ].includes(status)
}

export const getProcessingStatuses = () => [
  ORDER_STATUS.CONFIRMED,
  ORDER_STATUS.PROCESSING,
  ORDER_STATUS.PACKED,
  // Legacy
  'PAID'
]

export const getCompletedStatuses = () => [
  ORDER_STATUS.DELIVERED,
  ORDER_STATUS.COMPLETED
]

// New helper functions for filtering
export const getPendingStatuses = () => [ORDER_STATUS.PENDING]

export const getCancelledStatuses = () => [ORDER_STATUS.CANCELLED]

// Filter orders by status categories
export const filterOrdersByCategory = (orders, category) => {
  switch (category) {
    case 'PENDING':
      return orders.filter((order) => order.status === ORDER_STATUS.PENDING)
    case 'processing':
      return orders.filter((order) =>
        getProcessingStatuses().includes(order.status)
      )
    case 'completed':
      return orders.filter((order) =>
        getCompletedStatuses().includes(order.status)
      )
    case 'cancelled':
      return orders.filter((order) => order.status === ORDER_STATUS.CANCELLED)
    default:
      return orders
  }
}

// Get display status for order progress stepper
export const getOrderProgressSteps = (status, paymentStatus) => {
  // Customer-visible steps
  const steps = [
    { label: 'Đơn hàng được tạo', completed: true },
    {
      label: 'Xác nhận thanh toán',
      completed: [PAYMENT_STATUS.PAID, PAYMENT_STATUS.REFUNDED].includes(
        paymentStatus
      )
    },
    {
      label: 'Đã xác nhận',
      completed: [
        ORDER_STATUS.CONFIRMED,
        ORDER_STATUS.PROCESSING,
        ORDER_STATUS.PACKED,
        ORDER_STATUS.SHIPPED,
        ORDER_STATUS.DELIVERED,
        ORDER_STATUS.COMPLETED
      ].includes(status)
    },
    {
      label: 'Đang chuẩn bị hàng',
      completed: [
        ORDER_STATUS.PROCESSING,
        ORDER_STATUS.PACKED,
        ORDER_STATUS.SHIPPED,
        ORDER_STATUS.DELIVERED,
        ORDER_STATUS.COMPLETED
      ].includes(status)
    },
    {
      label: 'Đang giao hàng',
      completed: [
        ORDER_STATUS.SHIPPED,
        ORDER_STATUS.DELIVERED,
        ORDER_STATUS.COMPLETED
      ].includes(status)
    },
    {
      label: 'Đã giao',
      completed: [ORDER_STATUS.DELIVERED, ORDER_STATUS.COMPLETED].includes(
        status
      )
    },
    { label: 'Hoàn thành', completed: status === ORDER_STATUS.COMPLETED }
  ]

  // Cancelled / Returned / Refunded branches
  if (status === ORDER_STATUS.CANCELLED) {
    return [
      { label: 'Đơn hàng được tạo', completed: true },
      { label: 'Đơn hàng đã bị hủy', completed: true, error: true }
    ]
  }
  if (status === ORDER_STATUS.RETURNED) {
    return [
      { label: 'Đơn hàng được tạo', completed: true },
      { label: 'Đã trả hàng', completed: true, error: true }
    ]
  }
  if (status === ORDER_STATUS.REFUNDED) {
    return [
      { label: 'Đơn hàng được tạo', completed: true },
      { label: 'Đã hoàn tiền', completed: true }
    ]
  }

  return steps
}
