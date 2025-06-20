import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Grid,
  Container,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Breadcrumbs,
  Link,
  Button
} from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import FilterSidebar from '../components/Filter/FilterSidebar'
import ProductList from '../components/Product/ProductList'
import ProductSorting from '../components/Product/ProductSorting'
import FilterAltIcon from '@mui/icons-material/FilterAlt'

// Sample products data
const sampleProducts = [
  // ... (we'll use the existing products from ProductList)
]

// Sample categories data
const categories = {
  1: { id: 1, name: 'Điện thoại', parentId: null },
  2: { id: 2, name: 'Laptop', parentId: null },
  3: { id: 3, name: 'Phụ kiện', parentId: null },
  4: { id: 4, name: 'Thời trang', parentId: null }
}

function CategoryPage() {
  const { categoryId } = useParams()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [filterVisible, setFilterVisible] = useState(!isMobile)
  const [activeFilters, setActiveFilters] = useState({})
  const [sortBy, setSortBy] = useState('popular')

  // Get current category
  const category = categories[categoryId] || {
    id: 1,
    name: 'Sản phẩm',
    parentId: null
  }

  const toggleFilter = () => {
    setFilterVisible(!filterVisible)
  }

  const handleFilterChange = (filterData) => {
    if (filterData.type === 'reset') {
      setActiveFilters({})
    } else {
      setActiveFilters((prevFilters) => ({
        ...prevFilters,
        [filterData.type]: filterData.value
      }))
    }
  }

  const handleSortChange = (value) => {
    setSortBy(value)
  }

  return (
    <Box sx={{ py: 4, flexGrow: 1 }}>
      <Container maxWidth='xl'>
        {/* Breadcrumbs navigation */}
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize='small' />}
          aria-label='breadcrumb'
          sx={{ mb: 3 }}
        >
          <Link underline='hover' color='inherit' href='/'>
            Trang chủ
          </Link>
          <Typography color='text.primary'>{category.name}</Typography>
        </Breadcrumbs>

        {/* Category title */}
        <Typography
          variant='h4'
          component='h1'
          sx={{ mb: 3, fontWeight: 'bold' }}
        >
          {category.name}
        </Typography>

        {/* Mobile filter toggle button */}
        {isMobile && (
          <Button
            variant='outlined'
            startIcon={<FilterAltIcon />}
            onClick={toggleFilter}
            fullWidth
            sx={{ mb: 2 }}
          >
            {filterVisible ? 'Ẩn bộ lọc' : 'Hiển thị bộ lọc'}
          </Button>
        )}

        {/* Main layout grid */}
        <Grid container spacing={3}>
          {/* Sidebar with filters */}
          {(filterVisible || !isMobile) && (
            <Grid item size={{ xs: 12, md: 3, lg: 2.5 }}>
              <FilterSidebar
                onFilterChange={handleFilterChange}
                isFilterVisible={filterVisible}
                toggleFilter={toggleFilter}
              />
            </Grid>
          )}

          {/* Main content area */}
          <Grid
            item
            size={{
              xs: 12,
              md: filterVisible ? 9 : 12,
              lg: filterVisible ? 9.5 : 12
            }}
          >
            {/* Sorting options */}
            <ProductSorting
              totalProducts='65'
              onSortChange={handleSortChange}
            />

            {/* Product grid */}
            <ProductList title='' />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default CategoryPage
