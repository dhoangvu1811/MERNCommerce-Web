import React from 'react'
import { Box, Typography, Button, IconButton, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RefreshIcon from '@mui/icons-material/Refresh'

const UserTableHeader = ({ onAddNew, onRefresh, loading }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant='h6' component='div' sx={{ mr: 2 }}>
        Danh sách người dùng
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

export default UserTableHeader
