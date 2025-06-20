import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'

function ProductSorting({ totalProducts, onSortChange }) {
  const handleSortChange = (event) => {
    if (onSortChange) {
      onSortChange(event.target.value)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        flexWrap: 'wrap',
        gap: 2
      }}
    >
      <Typography variant="body1">
        Hiển thị <strong>{totalProducts}</strong> sản phẩm
      </Typography>

      <FormControl size="small" sx={{ minWidth: 220 }}>
        <InputLabel id="sort-select-label">Sắp xếp theo</InputLabel>
        <Select
          labelId="sort-select-label"
          id="sort-select"
          label="Sắp xếp theo"
          defaultValue="popular"
          onChange={handleSortChange}
        >
          <MenuItem value="popular">Phổ biến nhất</MenuItem>
          <MenuItem value="newest">Mới nhất</MenuItem>
          <MenuItem value="price-asc">Giá: Thấp đến cao</MenuItem>
          <MenuItem value="price-desc">Giá: Cao đến thấp</MenuItem>
          <MenuItem value="rating-desc">Đánh giá cao nhất</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default ProductSorting
