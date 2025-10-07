import { Box, Container, Grid, Typography, Divider, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ContactInfo from './ContactInfo'
import SocialLinks from './SocialLinks'
import dayjs from 'dayjs'

function Footer() {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        py: 6,
        mt: 6
      }}
    >
      <Container maxWidth='xl'>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant='h6' fontWeight='bold' gutterBottom>
                DHVtech
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Mua sắm trực tuyến an toàn và tiện lợi với hàng ngàn sản phẩm
                chất lượng từ các thương hiệu hàng đầu.
              </Typography>
            </Box>
            <SocialLinks />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <ContactInfo />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold' }}>
              Chính sách
            </Typography>
            {[
              'Chính sách bảo mật',
              'Điều khoản dịch vụ',
              'Chính sách đổi trả',
              'Hình thức thanh toán'
            ].map((text, index) => (
              <Typography key={index} variant='body2' sx={{ mb: 1 }}>
                {text}
              </Typography>
            ))}
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold' }}>
              Hỗ trợ
            </Typography>
            <Link
              component={RouterLink}
              to='/support'
              variant='body2'
              sx={{
                display: 'block',
                mb: 1,
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' }
              }}
            >
              Trung tâm trợ giúp
            </Link>
            {['Hướng dẫn mua hàng', 'Vận chuyển', 'Theo dõi đơn hàng'].map(
              (text, index) => (
                <Typography key={index} variant='body2' sx={{ mb: 1 }}>
                  {text}
                </Typography>
              )
            )}
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap'
          }}
        >
          <Typography variant='body2' color='text.secondary'>
            &copy; {dayjs().year()} DHVtech. Tất cả quyền được bảo lưu.
          </Typography>
          <Box>
            <Typography variant='body2' color='text.secondary'>
              Thiết kế bởi Commerce Web Team
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
