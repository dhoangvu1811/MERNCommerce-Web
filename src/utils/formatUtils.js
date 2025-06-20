/**
 * Format a number as Vietnamese currency (VND)
 * @param {number} value - The number to format
 * @returns {string} The formatted currency string
 */
export const formatPrice = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(value)
}
