import {
  Box,
  Paper,
  Button,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material'
import PriceFilter from './PriceFilter'
import RatingFilter from './RatingFilter'
import BrandFilter from './BrandFilter'
import CategoryTypeFilter from './CategoryTypeFilter'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'

// Sample brand data
const sampleBrands = [
  { id: 1, name: 'Apple', count: 24 },
  { id: 2, name: 'Samsung', count: 18 },
  { id: 3, name: 'Xiaomi', count: 15 },
  { id: 4, name: 'OPPO', count: 12 },
  { id: 5, name: 'Vivo', count: 10 },
  { id: 6, name: 'Realme', count: 9 },
  { id: 7, name: 'Nokia', count: 7 },
  { id: 8, name: 'Huawei', count: 6 },
  { id: 9, name: 'ASUS', count: 5 },
  { id: 10, name: 'Honor', count: 3 }
]

// Sample category types
const sampleCategoryTypes = [
  { id: 1, name: 'Điện thoại Android', count: 45 },
  { id: 2, name: 'iPhone', count: 24 },
  { id: 3, name: 'Điện thoại phổ thông', count: 12 },
  { id: 4, name: 'Điện thoại gập', count: 8 },
  { id: 5, name: 'Điện thoại gaming', count: 5 }
]

function FilterSidebar({ onFilterChange, isFilterVisible, toggleFilter }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // Handlers for different filter changes
  const handlePriceChange = (priceRange) => {
    if (onFilterChange) {
      onFilterChange({ type: 'price', value: priceRange })
    }
  }

  const handleRatingChange = (rating, checked) => {
    if (onFilterChange) {
      onFilterChange({ type: 'rating', value: { rating, checked } })
    }
  }

  const handleBrandChange = (brand, checked) => {
    if (onFilterChange) {
      onFilterChange({ type: 'brand', value: { brand, checked } })
    }
  }

  const handleTypeChange = (categoryType, checked) => {
    if (onFilterChange) {
      onFilterChange({ type: 'categoryType', value: { categoryType, checked } })
    }
  }

  const handleResetAllFilters = () => {
    if (onFilterChange) {
      onFilterChange({ type: 'reset' })
    }
  }

  // Mobile filter display
  if (isMobile && !isFilterVisible) {
    return (
      <Button
        fullWidth
        variant='outlined'
        startIcon={<FilterAltIcon />}
        onClick={toggleFilter}
        sx={{ mb: 2 }}
      >
        Hiển thị bộ lọc
      </Button>
    )
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        height: '100%',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        overflowY: 'auto',
        position: 'sticky',
        top: isMobile ? 'auto' : '90px',
        maxHeight: isMobile ? 'auto' : 'calc(100vh - 120px)'
      }}
    >
      {isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <Button
            variant='text'
            startIcon={<FilterAltOffIcon />}
            onClick={toggleFilter}
            size='small'
          >
            Ẩn
          </Button>
        </Box>
      )}

      <PriceFilter onChange={handlePriceChange} />
      <Divider sx={{ my: 2 }} />

      <CategoryTypeFilter
        categoryTypes={sampleCategoryTypes}
        onChange={handleTypeChange}
      />
      <Divider sx={{ my: 2 }} />

      <RatingFilter onChange={handleRatingChange} />
      <Divider sx={{ my: 2 }} />

      <BrandFilter brands={sampleBrands} onChange={handleBrandChange} />

      <Box sx={{ mt: 3 }}>
        <Button
          fullWidth
          variant='outlined'
          color='secondary'
          startIcon={<FilterAltOffIcon />}
          onClick={handleResetAllFilters}
        >
          Xóa tất cả lọc
        </Button>
      </Box>
    </Paper>
  )
}

export default FilterSidebar
