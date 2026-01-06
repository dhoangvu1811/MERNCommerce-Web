import { ORDER_STATUS } from './orderConstants'

/**
 * Get Vietnamese label for order status
 * @param {string} status - Order status code
 * @returns {string} Vietnamese label
 */
export const getOrderStatusLabel = (status) => {
  const statusMap = {
    [ORDER_STATUS.PENDING]: 'Đang chờ',
    [ORDER_STATUS.CONFIRMED]: 'Đã xác nhận',
    [ORDER_STATUS.PROCESSING]: 'Đang xử lý',
    [ORDER_STATUS.PACKED]: 'Đã đóng gói',
    [ORDER_STATUS.SHIPPED]: 'Đang giao hàng',
    [ORDER_STATUS.DELIVERED]: 'Đã giao',
    [ORDER_STATUS.COMPLETED]: 'Hoàn thành',
    [ORDER_STATUS.CANCELLED]: 'Đã hủy',
    [ORDER_STATUS.RETURNED]: 'Trả hàng',
    [ORDER_STATUS.REFUNDED]: 'Đã hoàn tiền'
  }
  return statusMap[status] || status
}

/**
 * Get Vietnamese label for payment status
 * @param {string} status - Payment status code
 * @returns {string} Vietnamese label
 */
export const getPaymentStatusLabel = (status) => {
  const statusMap = {
    PENDING: 'Chờ thanh toán',
    PROCESSING: 'Đang xử lý thanh toán',
    PAID: 'Đã thanh toán',
    FAILED: 'Thanh toán thất bại',
    EXPIRED: 'Hết hạn thanh toán',
    CANCELLED: 'Đã hủy thanh toán',
    REFUNDED: 'Đã hoàn tiền'
  }
  return statusMap[status] || status
}

/**
 * Get payment status display configuration (label + color)
 * @param {string} status - Payment status code
 * @returns {object} Object with label and color properties
 */
export const getPaymentStatusDisplay = (status) => {
  const statusMap = {
    PENDING: { label: 'Chờ thanh toán', color: 'warning' },
    PROCESSING: { label: 'Đang xử lý thanh toán', color: 'info' },
    PAID: { label: 'Đã thanh toán', color: 'success' },
    FAILED: { label: 'Thanh toán thất bại', color: 'error' },
    EXPIRED: { label: 'Hết hạn thanh toán', color: 'default' },
    CANCELLED: { label: 'Đã hủy thanh toán', color: 'default' },
    REFUNDED: { label: 'Đã hoàn tiền', color: 'secondary' }
  }
  return statusMap[status] || { label: status || 'N/A', color: 'default' }
}

/**
 * Get available order status options for admin with validation logic
 * @param {string} currentStatus - Current order status
 * @returns {Array} Array of status options with isCurrent and isDisabled flags
 */
export const getOrderStatusOptions = (currentStatus) => {
  const allStatuses = [
    { value: ORDER_STATUS.PENDING, label: 'Đang chờ' },
    { value: ORDER_STATUS.CONFIRMED, label: 'Đã xác nhận' },
    { value: ORDER_STATUS.PROCESSING, label: 'Đang xử lý' },
    { value: ORDER_STATUS.PACKED, label: 'Đã đóng gói' },
    { value: ORDER_STATUS.SHIPPED, label: 'Đang giao hàng' },
    { value: ORDER_STATUS.DELIVERED, label: 'Đã giao' },
    { value: ORDER_STATUS.COMPLETED, label: 'Hoàn thành' },
    { value: ORDER_STATUS.CANCELLED, label: 'Đã hủy' },
    { value: ORDER_STATUS.RETURNED, label: 'Trả hàng' },
    { value: ORDER_STATUS.REFUNDED, label: 'Đã hoàn tiền' }
  ]

  return allStatuses.map((status) => {
    const isCurrent = status.value === currentStatus
    let isDisabled = isCurrent

    // Don't allow changing from terminal states
    if (
      [ORDER_STATUS.COMPLETED, ORDER_STATUS.REFUNDED].includes(currentStatus)
    ) {
      isDisabled = true
    }

    // Don't allow backward progression for normal flow
    if (
      currentStatus === ORDER_STATUS.DELIVERED &&
      [
        ORDER_STATUS.PENDING,
        ORDER_STATUS.CONFIRMED,
        ORDER_STATUS.PROCESSING,
        ORDER_STATUS.PACKED,
        ORDER_STATUS.SHIPPED
      ].includes(status.value)
    ) {
      isDisabled = true
    }

    return {
      ...status,
      isCurrent,
      isDisabled
    }
  })
}

/**
 * Get available payment status options for admin with validation logic
 * @param {string} currentPaymentStatus - Current payment status
 * @param {string} orderStatus - Current order status
 * @returns {Array} Array of payment status options with validation flags
 */
export const getPaymentStatusOptions = (currentPaymentStatus, orderStatus) => {
  const paymentStatuses = [
    { value: 'PENDING', label: 'Chờ thanh toán', color: 'warning' },
    {
      value: 'PROCESSING',
      label: 'Đang xử lý thanh toán',
      color: 'info'
    },
    {
      value: 'PAID',
      label: 'Đã thanh toán',
      color: 'success',
      helperText: 'Sử dụng "Đánh dấu đã thanh toán"'
    },
    { value: 'FAILED', label: 'Thanh toán thất bại', color: 'error' },
    { value: 'EXPIRED', label: 'Hết hạn thanh toán', color: 'default' },
    { value: 'CANCELLED', label: 'Đã hủy thanh toán', color: 'default' },
    {
      value: 'REFUNDED',
      label: 'Đã hoàn tiền',
      color: 'secondary',
      helperText: 'Sử dụng chức năng hủy đơn'
    }
  ]

  // Final order statuses that cannot change payment status
  const finalOrderStatuses = ['CANCELLED', 'COMPLETED', 'REFUNDED']

  return paymentStatuses.map((status) => {
    const isCurrent = status.value === currentPaymentStatus
    let isDisabled = isCurrent
    let reason = ''

    // Disable all if order is in final status
    if (finalOrderStatuses.includes(orderStatus)) {
      isDisabled = true
      reason = 'Đơn hàng đã ở trạng thái cuối'
    }

    // CRITICAL: Cannot set PAID via this dialog - must use /admin/mark-paid
    if (status.value === 'PAID' && !isCurrent) {
      isDisabled = true
      reason =
        'Phải sử dụng nút "Đánh dấu đã thanh toán" để đảm bảo cập nhật số lượng đã bán'
    }

    // CRITICAL: Cannot set REFUNDED via this dialog - must use /admin/cancel
    if (status.value === 'REFUNDED' && !isCurrent) {
      isDisabled = true
      reason =
        'Phải sử dụng chức năng hủy đơn để đảm bảo hoàn trả kho và voucher'
    }

    // Don't allow changing from REFUNDED
    if (currentPaymentStatus === 'REFUNDED' && !isCurrent) {
      isDisabled = true
      reason = 'Không thể thay đổi từ trạng thái đã hoàn tiền'
    }

    // Don't allow changing from PAID to PENDING
    if (currentPaymentStatus === 'PAID' && status.value === 'PENDING') {
      isDisabled = true
      reason = 'Không thể chuyển từ đã thanh toán về chờ thanh toán'
    }

    return {
      ...status,
      isCurrent,
      isDisabled,
      reason
    }
  })
}
