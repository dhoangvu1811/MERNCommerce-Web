import React from 'react'
import { Box, Typography } from '@mui/material'
import OrderSearchBar from './OrderSearchBar'

const OrderTableHeader = ({ searchTerm, onSearchChange }) => {
  return (
    <Box
      sx={{
        mb: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
        Danh sách đơn hàng
      </Typography>
      <OrderSearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
    </Box>
  )
}

export default OrderTableHeader
