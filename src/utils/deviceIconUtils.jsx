/* eslint-disable indent */
import React from 'react'
import {
  Computer as ComputerIcon,
  Smartphone as SmartphoneIcon,
  Tablet as TabletIcon
} from '@mui/icons-material'
import { getDeviceIconType } from './sessionUtils'

/**
 * Render icon component dựa trên device info
 * @param {string} deviceInfo - Thông tin thiết bị hoặc User Agent string
 * @param {object} props - Props để truyền cho icon (fontSize, sx, etc.)
 * @returns {React.Element} Icon component
 */
export const DeviceIcon = ({ deviceInfo, ...props }) => {
  const iconType = getDeviceIconType(deviceInfo)

  switch (iconType) {
    case 'smartphone':
      return <SmartphoneIcon {...props} />
    case 'tablet':
      return <TabletIcon {...props} />
    case 'computer':
    default:
      return <ComputerIcon {...props} />
  }
}
