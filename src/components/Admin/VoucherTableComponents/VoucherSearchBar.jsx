import React from 'react'
import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const VoucherSearchBar = ({ searchTerm, onSearchChange, disabled = false }) => {
  return (
    <TextField
      size='small'
      placeholder='Tìm kiếm mã, mô tả, loại...'
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      disabled={disabled}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        )
      }}
    />
  )
}

export default VoucherSearchBar
