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
 * Định dạng ngày nhất quán theo vi-VN.
 * raw: ISO string | timestamp | Date
 * options:
 *  - withTime: kèm giờ/phút (default false)
 *  - utc: định dạng theo UTC để tránh lệch múi giờ (default false)
 *  - locale: ngôn ngữ (default 'vi-VN')
 *  - month/day/year/hour/minute: ghi đè tùy chọn Intl nếu cần
 */
export const formatDate = (
  raw,
  {
    withTime = false,
    utc = false,
    locale = 'vi-VN',
    month,
    day = 'numeric',
    year = 'numeric',
    hour = '2-digit',
    minute = '2-digit'
  } = {}
) => {
  if (!raw && raw !== 0) return '-'
  const d = new Date(raw)
  if (isNaN(d)) return '-'
  const base = { year, month: month || (withTime ? 'long' : '2-digit'), day }
  const opts = withTime ? { ...base, hour, minute } : base
  const tz = utc ? { timeZone: 'UTC' } : {}
  return withTime
    ? d.toLocaleString(locale, { ...opts, ...tz })
    : d.toLocaleDateString(locale, { ...opts, ...tz })
}

/**
 * Chuẩn hóa về chuỗi datetime-local (YYYY-MM-DDTHH:mm) từ ISO string hoặc timestamp
 */
export const toDateTimeLocal = (raw) => {
  if (!raw && raw !== 0) return ''
  const d = new Date(raw)
  if (isNaN(d)) return ''
  return d.toISOString().slice(0, 16)
}

// Đã loại bỏ các helper cũ: formatDateVi, formatDateUTCVi, formatPeriodVi (đã migrate sang formatDate)

/**
 * Tính originalPrice từ price sau giảm và phần trăm discount
 */
export const computeOriginalPrice = (price, discountPercent) => {
  const p = Number(price)
  const d = Number(discountPercent)
  if (!Number.isFinite(p) || !Number.isFinite(d) || d <= 0 || d >= 100) return p
  return Math.round(p / (1 - d / 100))
}

/**
 * Chuẩn hóa mã voucher: Uppercase và loại bỏ ký tự không hợp lệ theo pattern
 */
export const sanitizeVoucherCode = (value) => {
  const v = (value || '').toString().toUpperCase()
  return v.replace(/[^A-Z0-9-_]/g, '')
}
