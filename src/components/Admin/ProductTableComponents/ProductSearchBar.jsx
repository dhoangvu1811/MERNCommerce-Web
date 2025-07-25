import React from 'react'
import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const ProductSearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <TextField
      size='small'
      variant='outlined'
      placeholder='Tìm kiếm sản phẩm...'
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
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

export default ProductSearchBar
