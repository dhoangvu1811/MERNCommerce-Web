import React from 'react'
import { Box } from '@mui/material'

// Import SVG assets
import UserManagementSvg from '../../assets/icons/user-management.svg'
import ProductManagementSvg from '../../assets/icons/product-management.svg'
import OrderManagementSvg from '../../assets/icons/order-management.svg'
import VoucherManagementSvg from '../../assets/icons/voucher-management.svg'
import SessionManagementSvg from '../../assets/icons/session-management.svg'
import OnlineShoppingSvg from '../../assets/icons/logo-online-shopping.svg'

// User Management Icon
export const UserManagementIcon = (props) => (
  <Box
    component='img'
    src={UserManagementSvg}
    alt='User Management'
    sx={{
      width: 28,
      height: 28,
      filter: (theme) =>
        theme.palette.mode === 'dark' ? 'invert(1)' : 'invert(0.4)',
      transition: 'filter 0.3s ease',
      '&:hover': {
        filter: (theme) =>
          theme.palette.mode === 'dark' ? 'invert(0.8)' : 'invert(0.2)'
      },
      ...props.sx
    }}
    {...props}
  />
)

// Product Management Icon
export const ProductManagementIcon = (props) => (
  <Box
    component='img'
    src={ProductManagementSvg}
    alt='Product Management'
    sx={{
      width: 28,
      height: 28,
      filter: (theme) =>
        theme.palette.mode === 'dark' ? 'invert(1)' : 'invert(0.4)',
      transition: 'filter 0.3s ease',
      '&:hover': {
        filter: (theme) =>
          theme.palette.mode === 'dark' ? 'invert(0.8)' : 'invert(0.2)'
      },
      ...props.sx
    }}
    {...props}
  />
)

// Order Management Icon
export const OrderManagementIcon = (props) => (
  <Box
    component='img'
    src={OrderManagementSvg}
    alt='Order Management'
    sx={{
      width: 28,
      height: 28,
      filter: (theme) =>
        theme.palette.mode === 'dark' ? 'invert(1)' : 'invert(0.4)',
      transition: 'filter 0.3s ease',
      '&:hover': {
        filter: (theme) =>
          theme.palette.mode === 'dark' ? 'invert(0.8)' : 'invert(0.2)'
      },
      ...props.sx
    }}
    {...props}
  />
)

// Voucher Management Icon
export const VoucherManagementIcon = (props) => (
  <Box
    component='img'
    src={VoucherManagementSvg}
    alt='Voucher Management'
    sx={{
      width: 28,
      height: 28,
      filter: (theme) =>
        theme.palette.mode === 'dark' ? 'invert(1)' : 'invert(0.4)',
      transition: 'filter 0.3s ease',
      '&:hover': {
        filter: (theme) =>
          theme.palette.mode === 'dark' ? 'invert(0.8)' : 'invert(0.2)'
      },
      ...props.sx
    }}
    {...props}
  />
)

// Session Management Icon
export const SessionManagementIcon = (props) => (
  <Box
    component='img'
    src={SessionManagementSvg}
    alt='Session Management'
    sx={{
      width: 28,
      height: 28,
      filter: (theme) =>
        theme.palette.mode === 'dark' ? 'invert(1)' : 'invert(0.4)',
      transition: 'filter 0.3s ease',
      '&:hover': {
        filter: (theme) =>
          theme.palette.mode === 'dark' ? 'invert(0.8)' : 'invert(0.2)'
      },
      ...props.sx
    }}
    {...props}
  />
)

// Main Logo Icon
export const MainLogoIcon = (props) => (
  <Box
    component='img'
    src={OnlineShoppingSvg}
    alt='DHVtech Logo'
    sx={{
      width: 36,
      height: 36,
      ...props.sx
    }}
    {...props}
  />
)

// Online Shopping Logo Icon (alternative main logo)
export const OnlineShoppingLogoIcon = (props) => (
  <Box
    component='img'
    src={OnlineShoppingSvg}
    alt='Online Shopping Logo'
    sx={{
      width: 32,
      height: 32,
      filter: (theme) => (theme.palette.mode === 'dark' ? 'invert(1)' : 'none'),
      ...props.sx
    }}
    {...props}
  />
)
