import { Box, Typography, Button, Container } from '@mui/material'
import { Lock } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Container maxWidth='sm'>
        <Box
          sx={{
            textAlign: 'center',
            padding: 4,
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: 3
          }}
        >
          {/* Lock Icon */}
          <Lock
            sx={{
              fontSize: 80,
              color: 'error.main',
              mb: 3
            }}
          />

          {/* Title */}
          <Typography
            variant='h4'
            component='h1'
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: 'error.main'
            }}
          >
            Truy cập bị từ chối
          </Typography>

          {/* Message */}
          <Typography
            variant='body1'
            sx={{
              mb: 4,
              color: 'text.secondary',
              lineHeight: 1.6
            }}
          >
            Bạn không có quyền truy cập trang này. Vui lòng quay lại trang chủ
            hoặc liên hệ quản trị viên.
          </Typography>

          {/* Action Buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <Button
              variant='contained'
              color='primary'
              onClick={handleGoHome}
              sx={{ minWidth: 120 }}
            >
              Về trang chủ
            </Button>

            <Button
              variant='outlined'
              color='primary'
              onClick={handleGoBack}
              sx={{ minWidth: 120 }}
            >
              Quay lại
            </Button>
          </Box>

          {/* Footer Note */}
          <Typography
            variant='caption'
            sx={{
              mt: 3,
              display: 'block',
              color: 'text.disabled'
            }}
          >
            Nếu bạn cho rằng đây là lỗi, vui lòng liên hệ với quản trị viên
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Unauthorized
