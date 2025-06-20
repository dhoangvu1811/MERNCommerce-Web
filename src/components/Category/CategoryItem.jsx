import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'

function CategoryItem({ category }) {
  return (
    <ListItem
      button
      component={Link}
      to={`/category/${category.id}`}
      sx={{
        borderRadius: '8px',
        mb: 1,
        color: 'text.primary', // Chỉ định màu chữ theo màu text thông thường
        textDecoration: 'none', // Loại bỏ gạch chân của link
        '&:hover': {
          backgroundColor: 'action.hover',
          color: 'text.primary' // Giữ màu chữ không thay đổi khi hover
        }
      }}
    >
      {category.icon && <ListItemIcon>{category.icon}</ListItemIcon>}
      <ListItemText
        primary={category.name}
        primaryTypographyProps={{ color: 'inherit' }} // Đảm bảo text luôn theo màu được chỉ định ở trên
      />
    </ListItem>
  )
}

export default CategoryItem
