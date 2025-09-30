// Không import React components trong file .js

/**
 * Parse User Agent string để lấy thông tin thiết bị và browser
 * @param {string} userAgent - User Agent string
 * @returns {object} Object chứa thông tin device, browser, os
 */
export const parseDeviceInfo = (userAgent) => {
  if (!userAgent)
    return { device: 'Không xác định', browser: 'Unknown', os: 'Unknown' }

  // Extract browser info
  let browser = 'Unknown Browser'
  if (userAgent.includes('Chrome')) browser = 'Chrome'
  else if (userAgent.includes('Firefox')) browser = 'Firefox'
  else if (userAgent.includes('Safari')) browser = 'Safari'
  else if (userAgent.includes('Edge')) browser = 'Edge'

  // Extract OS info
  let os = 'Unknown OS'
  if (userAgent.includes('Windows NT 10.0')) os = 'Windows 10/11'
  else if (userAgent.includes('Windows NT')) os = 'Windows'
  else if (userAgent.includes('Mac OS X')) os = 'macOS'
  else if (userAgent.includes('Linux')) os = 'Linux'
  else if (userAgent.includes('Android')) os = 'Android'
  else if (userAgent.includes('iOS')) os = 'iOS'

  return {
    device: `${browser} trên ${os}`,
    browser,
    os
  }
}

/**
 * Lấy tên icon phù hợp cho thiết bị dựa trên deviceInfo
 * @param {string} deviceInfo - Thông tin thiết bị hoặc User Agent string
 * @returns {string} Tên icon để component render
 */
export const getDeviceIconType = (deviceInfo) => {
  const deviceLower = deviceInfo?.toLowerCase() || ''

  // Check for mobile devices
  if (
    deviceLower.includes('iphone') ||
    deviceLower.includes('android') ||
    deviceLower.includes('mobile')
  ) {
    return 'smartphone'
  }

  // Check for tablets
  if (deviceLower.includes('ipad') || deviceLower.includes('tablet')) {
    return 'tablet'
  }

  // Default to computer/desktop
  return 'computer'
}

/**
 * Lấy tên thiết bị đơn giản từ User Agent
 * @param {string} userAgent - User Agent string
 * @returns {string} Tên thiết bị đơn giản
 */
export const getSimpleDeviceName = (userAgent) => {
  if (!userAgent) return 'Không xác định'

  const deviceLower = userAgent.toLowerCase()

  if (deviceLower.includes('iphone')) return 'iPhone'
  if (deviceLower.includes('ipad')) return 'iPad'
  if (deviceLower.includes('android')) return 'Android'
  if (deviceLower.includes('windows')) return 'Windows PC'
  if (deviceLower.includes('mac')) return 'Mac'
  if (deviceLower.includes('linux')) return 'Linux PC'

  return 'Desktop'
}

/**
 * Kiểm tra xem thiết bị có phải là mobile không
 * @param {string} userAgent - User Agent string
 * @returns {boolean} True nếu là mobile device
 */
export const isMobileDevice = (userAgent) => {
  if (!userAgent) return false

  const deviceLower = userAgent.toLowerCase()
  return (
    deviceLower.includes('mobile') ||
    deviceLower.includes('iphone') ||
    deviceLower.includes('android')
  )
}

/**
 * Kiểm tra xem thiết bị có phải là tablet không
 * @param {string} userAgent - User Agent string
 * @returns {boolean} True nếu là tablet device
 */
export const isTabletDevice = (userAgent) => {
  if (!userAgent) return false

  const deviceLower = userAgent.toLowerCase()
  return deviceLower.includes('tablet') || deviceLower.includes('ipad')
}
