import React from 'react'
import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const OrderSearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <TextField
      size='small'
      variant='outlined'
      placeholder='Tìm kiếm đơn hàng...'
      value={searchTerm}
      onChange={onSearchChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        )
      }}
      sx={{ width: '300px' }}
    />
  )
}

export default OrderSearchBar
