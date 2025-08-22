/* eslint-disable indent */
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Grid,
  Container,
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import FilterSidebar from '../components/Filter/FilterSidebar'
import ProductList from '../components/Product/ProductList'
import ProductSorting from '../components/Product/ProductSorting'

function CategoryPage() {
  const { categoryId } = useParams()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [filterVisible, setFilterVisible] = useState(!isMobile)
  const [activeFilters, setActiveFilters] = useState({})
  const [sortBy, setSortBy] = useState('popular')
  const [totalProducts, setTotalProducts] = useState(0)

  // Decode category type từ URL params
  const categoryType = decodeURIComponent(categoryId || '')
  const categoryName = categoryType || 'Sản phẩm'

  // Get current category - không cần categories object nữa vì dùng URL param
  const category = {
    name: categoryName,
    type: categoryType
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

  // Tạo sort parameter dựa trên sortBy value
  const getSortParam = (sortValue) => {
    switch (sortValue) {
      case 'price_asc':
        return 'price_asc'
      case 'price_desc':
        return 'price_desc'
      case 'rating_desc':
        return 'rating_desc'
      case 'name_asc':
        return 'name_asc'
      case 'name_desc':
        return 'name_desc'
      case 'newest':
        return 'selled_desc'
      case 'popular':
      default:
        return 'selled_desc'
    }
  }

  const handleProductCountChange = (count) => {
    setTotalProducts(count)
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
            <Grid
              size={{
                xs: 12,
                md: 3,
                lg: 2.5
              }}
            >
              <FilterSidebar
                onFilterChange={handleFilterChange}
                isFilterVisible={filterVisible}
                toggleFilter={toggleFilter}
              />
            </Grid>
          )}

          {/* Main content area */}
          <Grid
            size={{
              xs: 12,
              md: filterVisible ? 9 : 12,
              lg: filterVisible ? 9.5 : 12
            }}
          >
            {/* Sorting options */}
            <ProductSorting
              totalProducts={totalProducts}
              onSortChange={handleSortChange}
              currentSort={sortBy}
            />

            {/* Product grid */}
            <ProductList
              title=''
              type={categoryType}
              sort={getSortParam(sortBy)}
              itemsPerPage={20}
              onProductCountChange={handleProductCountChange}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default CategoryPage
