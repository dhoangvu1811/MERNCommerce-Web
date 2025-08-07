import React from 'react'
import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const UserSearchBar = ({ searchTerm, onSearchChange, disabled = false }) => {
  return (
    <TextField
      size='small'
      variant='outlined'
      placeholder='Tìm kiếm người dùng...'
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
      sx={{ width: '300px' }}
    />
  )
}

export default UserSearchBar
