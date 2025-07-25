import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const ProductTableHeader = ({ onAddNew }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant='h6' component='div' sx={{ mr: 2 }}>
        Danh sách sản phẩm
      </Typography>
      <Button
        variant='contained'
        color='primary'
        startIcon={<AddIcon />}
        size='small'
        onClick={onAddNew}
      >
        Thêm mới
      </Button>
    </Box>
  )
}

export default ProductTableHeader
