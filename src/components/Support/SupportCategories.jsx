import { Box, Typography, Grid } from '@mui/material'
import {
  Assignment,
  LocalShipping,
  Payment,
  Security
} from '@mui/icons-material'
import SupportCategoryCard from './SupportCategoryCard'

function SupportCategories() {
  const supportCategories = [
    {
      icon: <Assignment />,
      title: 'Đặt hàng & Thanh toán',
      description: 'Hướng dẫn đặt hàng, thanh toán và quản lý đơn hàng',
      count: '15 bài viết',
      category: 'order-payment'
    },
    {
      icon: <LocalShipping />,
      title: 'Vận chuyển & Giao hàng',
      description: 'Thông tin về thời gian và phương thức giao hàng',
      count: '12 bài viết',
      category: 'shipping'
    },
    {
      icon: <Payment />,
      title: 'Hoàn tiền & Đổi trả',
      description: 'Chính sách hoàn tiền, đổi trả sản phẩm',
      count: '8 bài viết',
      category: 'refund-return'
    },
    {
      icon: <Security />,
      title: 'Bảo mật & Tài khoản',
      description: 'Bảo vệ tài khoản và quyền riêng tư',
      count: '10 bài viết',
      category: 'security-account'
    }
  ]

  const handleCategoryClick = () => {
    // TODO: Navigate to category specific page or filter FAQ
    // console.log('Category clicked:', category)
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography
        variant='h5'
        sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}
      >
        Danh mục hỗ trợ
      </Typography>
      <Grid container spacing={3}>
        {supportCategories.map((category, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <SupportCategoryCard {...category} onClick={handleCategoryClick} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default SupportCategories
