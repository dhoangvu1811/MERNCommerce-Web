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

/**
 * Tính giá sau giảm giá từ giá gốc và phần trăm giảm giá
 * @param {number} originalPrice - Giá gốc của sản phẩm
 * @param {number} discountPercent - Phần trăm giảm giá (0-100)
 * @returns {number} Giá sau giảm giá
 */
export const calculateDiscountedPrice = (originalPrice, discountPercent) => {
  const price = Number(originalPrice)
  const discount = Number(discountPercent)

  if (
    !Number.isFinite(price) ||
    !Number.isFinite(discount) ||
    discount < 0 ||
    discount >= 100
  ) {
    return price
  }

  return Math.round(price * (1 - discount / 100))
}
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/vi'

// Configure dayjs
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('vi')

/**
 * Định dạng ngày nhất quán theo vi-VN sử dụng dayjs.
 * raw: ISO string | timestamp | Date
 * options:
 *  - withTime: kèm giờ/phút (default false)
 *  - utc: định dạng theo UTC để tránh lệch múi giờ (default false)
 *  - customFormat: format tùy chỉnh (default null)
 */
export const formatDate = (
  raw,
  { withTime = false, utc = false, customFormat = null } = {}
) => {
  if (!raw && raw !== 0) return '-'

  let date = dayjs(raw)
  if (!date.isValid()) return '-'

  if (utc) {
    date = date.utc()
  }

  // Nếu có format tùy chỉnh
  if (customFormat) {
    return date.format(customFormat)
  }

  // Format mặc định
  if (withTime) {
    return date.format('DD/MM/YYYY HH:mm')
  } else {
    return date.format('DD/MM/YYYY')
  }
}

/**
 * Chuẩn hóa về chuỗi datetime-local (YYYY-MM-DDTHH:mm) từ ISO string hoặc timestamp
 */
export const toDateTimeLocal = (raw) => {
  if (!raw && raw !== 0) return ''

  const date = dayjs(raw)
  if (!date.isValid()) return ''

  return date.format('YYYY-MM-DDTHH:mm')
}

/**
 * Chuẩn hóa mã voucher: Uppercase và loại bỏ ký tự không hợp lệ theo pattern
 */
export const sanitizeVoucherCode = (value) => {
  const v = (value || '').toString().toUpperCase()
  return v.replace(/[^A-Z0-9-_]/g, '')
}
