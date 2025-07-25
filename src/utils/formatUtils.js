/**
 * Format a number as Vietnamese currency (VND)
 * @param {number} value - The number to format
 * @returns {string} The formatted currency string
 */
export const formatPrice = (value) => {
  // Kiểm tra nếu value không phải là số hoặc là null/undefined
  if (value === null || value === undefined || isNaN(value)) {
    return '0 ₫'
  }

  // Chuyển đổi sang số nếu là string
  const numValue = typeof value === 'string' ? parseFloat(value) : value

  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(numValue)
}
