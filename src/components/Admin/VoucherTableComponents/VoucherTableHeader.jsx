import React from 'react'
import { Box, Button, Typography, IconButton, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RefreshIcon from '@mui/icons-material/Refresh'

const VoucherTableHeader = ({ onAddNew, onRefresh, loading }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Typography variant='h6'>Quản lý voucher</Typography>
      <Button variant='contained' startIcon={<AddIcon />} onClick={onAddNew}>
        Thêm voucher
      </Button>
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
    </Box>
  )
}

export default VoucherTableHeader
