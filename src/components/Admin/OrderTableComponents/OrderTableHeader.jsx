import React from 'react'
import { Box, Typography, IconButton, Tooltip } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import OrderSearchBar from './OrderSearchBar'

const OrderTableHeader = ({
  searchTerm,
  onSearchChange,
  onRefresh,
  loading
}) => {
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title='Làm mới dữ liệu'>
          <IconButton
            onClick={onRefresh}
            disabled={loading}
            color='primary'
            size='small'
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
        <OrderSearchBar
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
        />
      </Box>
    </Box>
  )
}

export default OrderTableHeader
