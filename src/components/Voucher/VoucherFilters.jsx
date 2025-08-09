import React from 'react'
import {
  Box,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  FormControlLabel,
  Switch
} from '@mui/material'

const VoucherFilters = ({
  search,
  setSearch,
  type,
  setType,
  onlyActive,
  setOnlyActive
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <TextField
        size='small'
        label='Tìm mã'
        placeholder='Nhập mã voucher'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ToggleButtonGroup
        size='small'
        exclusive
        value={type}
        onChange={(_, v) => setType(v)}
      >
        <ToggleButton value='all'>Tất cả</ToggleButton>
        <ToggleButton value='percent'>Phần trăm</ToggleButton>
        <ToggleButton value='fixed'>Cố định</ToggleButton>
      </ToggleButtonGroup>

      <FormControlLabel
        control={
          <Switch
            checked={onlyActive}
            onChange={(e) => setOnlyActive(e.target.checked)}
          />
        }
        label='Chỉ hiển thị đang hoạt động'
      />
    </Box>
  )
}

export default VoucherFilters
