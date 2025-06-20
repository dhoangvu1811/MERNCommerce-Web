/* eslint-disable indent */
import {
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
  TextField,
  InputAdornment
} from '@mui/material'
import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'

function BrandFilter({ brands, onChange }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (event, brand) => {
    if (onChange) {
      onChange(brand, event.target.checked)
    }
  }

  const filteredBrands = searchTerm
    ? brands.filter((brand) =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : brands

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant='subtitle1' fontWeight='bold' gutterBottom>
        Thương hiệu
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <TextField
        size='small'
        placeholder='Tìm thương hiệu...'
        fullWidth
        sx={{ mb: 2 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon fontSize='small' />
            </InputAdornment>
          )
        }}
      />

      <Box sx={{ maxHeight: 200, overflowY: 'auto', pr: 1 }}>
        <FormGroup>
          {filteredBrands.map((brand) => (
            <FormControlLabel
              key={brand.id}
              control={<Checkbox />}
              onChange={(e) => handleChange(e, brand)}
              label={
                <Typography variant='body2'>
                  {brand.name} ({brand.count})
                </Typography>
              }
            />
          ))}
        </FormGroup>
      </Box>
    </Box>
  )
}

export default BrandFilter
