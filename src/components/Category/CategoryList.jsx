import { List, Typography, Paper, Box } from '@mui/material'
import CategoryItem from './CategoryItem'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import LaptopIcon from '@mui/icons-material/Laptop'
import HeadphonesIcon from '@mui/icons-material/Headphones'
import CheckroomIcon from '@mui/icons-material/Checkroom'
import KitchenIcon from '@mui/icons-material/Kitchen'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import ChildCareIcon from '@mui/icons-material/ChildCare'
import LocalMallIcon from '@mui/icons-material/LocalMall'

// Demo categories with icons
const categories = [
  { id: 1, name: 'Điện thoại', icon: <SmartphoneIcon /> },
  { id: 2, name: 'Laptop', icon: <LaptopIcon /> },
  { id: 3, name: 'Phụ kiện', icon: <HeadphonesIcon /> },
  { id: 4, name: 'Thời trang', icon: <CheckroomIcon /> },
  { id: 5, name: 'Gia dụng', icon: <KitchenIcon /> },
  { id: 6, name: 'Đồ chơi & Giải trí', icon: <SportsEsportsIcon /> },
  { id: 7, name: 'Mẹ & Bé', icon: <ChildCareIcon /> },
  { id: 8, name: 'Mỹ phẩm', icon: <LocalMallIcon /> }
]

function CategoryList() {
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
