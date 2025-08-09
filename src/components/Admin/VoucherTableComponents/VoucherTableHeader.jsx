import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const VoucherTableHeader = ({ onAddNew }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Typography variant='h6'>Quản lý voucher</Typography>
      <Button variant='contained' startIcon={<AddIcon />} onClick={onAddNew}>
        Thêm voucher
      </Button>
    </Box>
  )
}

export default VoucherTableHeader
