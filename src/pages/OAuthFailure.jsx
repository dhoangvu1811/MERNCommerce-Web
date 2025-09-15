import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Box, Typography, Container, Button, Alert, Paper } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'
import HomeIcon from '@mui/icons-material/Home'
import RefreshIcon from '@mui/icons-material/Refresh'
import { API_CONFIG } from '~/utils/constants'

const getErrorMessage = (errorCode, fallbackMessage) => {
  const errorMessages = {
    oauth_failed: 'Đăng nhập Google thất bại',
    access_denied: 'Bạn đã từ chối quyền truy cập',
    token_fetch_failed: 'Không thể lấy thông tin người dùng',
    invalid_request: 'Yêu cầu không hợp lệ',
    server_error: 'Lỗi máy chủ'
  }
  return errorMessages[errorCode] || fallbackMessage
}

const OAuthFailure = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [countdown, setCountdown] = useState(10)

  const error = searchParams.get('error') || 'oauth_failed'
  const message = searchParams.get('message') || 'Đăng nhập thất bại'

  useEffect(() => {
    // Auto redirect countdown for regular page
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/', { replace: true })
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [navigate, error, message])

  const handleGoHome = () => {
    navigate('/', { replace: true })
  }

  const handleRetryGoogle = () => {
    // Direct redirect to Google OAuth
    window.location.href = `${API_CONFIG.BASE_URL}/users/auth/google`
  }

  const handleRetryFacebook = () => {
    // Direct redirect to Facebook OAuth
    window.location.href = `${API_CONFIG.BASE_URL}/users/auth/facebook`
  }

  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          gap: 3
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: 'error.light',
            mb: 2
          }}
        >
          <ErrorIcon sx={{ fontSize: 40, color: 'error.main' }} />
        </Box>

        <Typography variant='h4' color='error.main' gutterBottom>
          Đăng nhập thất bại
        </Typography>

        <Paper elevation={2} sx={{ p: 3, maxWidth: 400, width: '100%' }}>
          <Alert severity='error' sx={{ mb: 2 }}>
            <Typography variant='body1'>
              {getErrorMessage(error, message)}
            </Typography>
          </Alert>

          <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
            Mã lỗi: <code>{error}</code>
          </Typography>

          <Box sx={{ display: 'flex', gap: 1.5, flexDirection: 'column' }}>
            <Typography
              variant='body2'
              color='text.secondary'
              textAlign='center'
              sx={{ mb: 1 }}
            >
              Thử lại với:
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant='contained'
                color='primary'
                startIcon={<RefreshIcon />}
                onClick={handleRetryGoogle}
                fullWidth
                size='small'
              >
                Google
              </Button>

              <Button
                variant='contained'
                color='primary'
                startIcon={<RefreshIcon />}
                onClick={handleRetryFacebook}
                fullWidth
                size='small'
              >
                Facebook
              </Button>
            </Box>

            <Button
              variant='outlined'
              startIcon={<HomeIcon />}
              onClick={handleGoHome}
              fullWidth
            >
              Về trang chủ ({countdown}s)
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default OAuthFailure
