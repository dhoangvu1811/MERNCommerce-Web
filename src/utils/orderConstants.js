/* eslint-disable indent */
// Order status constants based on API documentation
export const ORDER_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
}

// Payment status constants
export const PAYMENT_STATUS = {
  UNPAID: 'unpaid',
  PAID: 'paid',
  REFUNDED: 'refunded'
}

// Status display configurations based on status + paymentStatus combinations
export const getOrderStatusConfig = (status, paymentStatus) => {
  const key = `${status}_${paymentStatus}`

  const configs = {
    // Pending cases
    pending_unpaid: { label: 'Chờ thanh toán', color: 'warning' },
    pending_paid: { label: 'Chờ xác nhận', color: 'info' },

    // Paid cases
    paid_paid: { label: 'Đã thanh toán', color: 'info' },

    // Processing cases
    processing_paid: { label: 'Đang xử lý', color: 'warning' },

    // Shipped cases
    shipped_paid: { label: 'Đang giao hàng', color: 'info' },

    // Completed cases
    completed_paid: { label: 'Đã hoàn thành', color: 'success' },
    completed_refunded: {
      label: 'Đã hoàn thành (hoàn tiền)',
      color: 'success'
    },

    // Cancelled cases
    cancelled_unpaid: { label: 'Đã hủy', color: 'error' },
    cancelled_paid: { label: 'Đã hủy (chờ hoàn tiền)', color: 'error' },
    cancelled_refunded: { label: 'Đã hủy (đã hoàn tiền)', color: 'error' }
  }

  return configs[key] || { label: status, color: 'default' }
}

// Legacy config for backward compatibility
export const ORDER_STATUS_CONFIG = {
  [ORDER_STATUS.PENDING]: {
    label: 'Chờ xử lý',
    color: 'warning'
  },
  [ORDER_STATUS.PAID]: {
    label: 'Đã thanh toán',
    color: 'info'
  },
  [ORDER_STATUS.PROCESSING]: {
    label: 'Đang xử lý',
    color: 'warning'
  },
  [ORDER_STATUS.SHIPPED]: {
    label: 'Đang giao hàng',
    color: 'info'
  },
  [ORDER_STATUS.COMPLETED]: {
    label: 'Đã hoàn thành',
    color: 'success'
  },
  [ORDER_STATUS.CANCELLED]: {
    label: 'Đã hủy',
    color: 'error'
  }
}

// Helper functions
export const isOrderCancellable = (status, paymentStatus) => {
  return (
    (status === ORDER_STATUS.PENDING &&
      paymentStatus === PAYMENT_STATUS.UNPAID) ||
    (status === ORDER_STATUS.PENDING &&
      paymentStatus === PAYMENT_STATUS.PAID) ||
    (status === ORDER_STATUS.PAID && paymentStatus === PAYMENT_STATUS.PAID)
  )
}

export const getProcessingStatuses = () => [
  ORDER_STATUS.PAID,
  ORDER_STATUS.PROCESSING
]

export const getCompletedStatuses = () => [
  ORDER_STATUS.SHIPPED,
  ORDER_STATUS.COMPLETED
]

// New helper functions for filtering
export const getPendingStatuses = () => [ORDER_STATUS.PENDING]

export const getCancelledStatuses = () => [ORDER_STATUS.CANCELLED]

// Filter orders by status categories
export const filterOrdersByCategory = (orders, category) => {
  switch (category) {
    case 'pending':
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
  const steps = [
    { label: 'Đơn hàng được tạo', completed: true },
    {
      label: 'Xác nhận thanh toán',
      completed: paymentStatus === PAYMENT_STATUS.PAID
    },
    {
      label: 'Đang xử lý',
      completed: [
        ORDER_STATUS.PROCESSING,
        ORDER_STATUS.SHIPPED,
        ORDER_STATUS.COMPLETED
      ].includes(status)
    },
    {
      label: 'Đang giao hàng',
      completed: [ORDER_STATUS.SHIPPED, ORDER_STATUS.COMPLETED].includes(status)
    },
    {
      label: 'Hoàn thành',
      completed: status === ORDER_STATUS.COMPLETED
    }
  ]

  // If cancelled, show different steps
  if (status === ORDER_STATUS.CANCELLED) {
    return [
      { label: 'Đơn hàng được tạo', completed: true },
      { label: 'Đơn hàng đã bị hủy', completed: true, error: true }
    ]
  }

  return steps
}
