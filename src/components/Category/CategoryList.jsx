import {
  List,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Alert
} from '@mui/material'
import { useState, useEffect } from 'react'
import CategoryItem from './CategoryItem'
import { getAllProductTypes } from '../../apis/productApi'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import LaptopIcon from '@mui/icons-material/Laptop'
import HeadphonesIcon from '@mui/icons-material/Headphones'
import CheckroomIcon from '@mui/icons-material/Checkroom'
import KitchenIcon from '@mui/icons-material/Kitchen'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import ChildCareIcon from '@mui/icons-material/ChildCare'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import CategoryIcon from '@mui/icons-material/Category'

// Function để map icon cho từng loại sản phẩm
const getIconForCategory = (categoryName) => {
  const lowerName = categoryName.toLowerCase()

  if (lowerName.includes('điện thoại') || lowerName.includes('phone')) {
    return <SmartphoneIcon />
  }
  if (lowerName.includes('laptop') || lowerName.includes('máy tính')) {
    return <LaptopIcon />
  }
  if (
    lowerName.includes('phụ kiện') ||
    lowerName.includes('tai nghe') ||
    lowerName.includes('headphone')
  ) {
    return <HeadphonesIcon />
  }
  if (
    lowerName.includes('thời trang') ||
    lowerName.includes('quần áo') ||
    lowerName.includes('áo')
  ) {
    return <CheckroomIcon />
  }
  if (
    lowerName.includes('gia dụng') ||
    lowerName.includes('bếp') ||
    lowerName.includes('kitchen')
  ) {
    return <KitchenIcon />
  }
  if (
    lowerName.includes('đồ chơi') ||
    lowerName.includes('game') ||
    lowerName.includes('giải trí')
  ) {
    return <SportsEsportsIcon />
  }
  if (
    lowerName.includes('mẹ') ||
    lowerName.includes('bé') ||
    lowerName.includes('baby')
  ) {
    return <ChildCareIcon />
  }
  if (
    lowerName.includes('mỹ phẩm') ||
    lowerName.includes('beauty') ||
    lowerName.includes('cosmetic')
  ) {
    return <LocalMallIcon />
  }

  // Default icon
  return <CategoryIcon />
}

function CategoryList() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await getAllProductTypes()

        if (response.code === 200 && response.data) {
          // Transform API data thành format mà component cần
          const transformedCategories = response.data.map((type, index) => ({
            id: index + 1,
            name: type,
            icon: getIconForCategory(type),
            type: type // Thêm field type để dùng cho filtering
          }))

          setCategories(transformedCategories)
        } else {
          setError('Không thể tải danh sách danh mục')
        }
      } catch {
        setError('Có lỗi xảy ra khi tải dữ liệu')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 2,
          height: 'auto',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography variant='h6' fontWeight='bold'>
            Danh mục sản phẩm
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
          <CircularProgress size={24} />
        </Box>
      </Paper>
    )
  }

  if (error) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 2,
          height: 'auto',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography variant='h6' fontWeight='bold'>
            Danh mục sản phẩm
          </Typography>
        </Box>
        <Alert severity='error' size='small'>
          {error}
        </Alert>
      </Paper>
    )
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        height: 'auto',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant='h6' fontWeight='bold'>
          Danh mục sản phẩm
        </Typography>
      </Box>

      <List disablePadding>
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </List>
    </Paper>
  )
}

export default CategoryList
