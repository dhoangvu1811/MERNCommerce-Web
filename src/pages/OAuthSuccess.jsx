import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, CircularProgress, Typography, Container } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { toast } from 'react-toastify'
import { getCurrentUser } from '~/redux/slices/userSlice'

const OAuthSuccess = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const handleOAuthSuccess = async () => {
      try {
        // Delay để user thấy success message
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Fetch user info to update Redux state
        await dispatch(getCurrentUser()).unwrap()

        // Show success message
        toast.success('Đăng nhập Google thành công!')

        // Redirect to home page
        navigate('/', { replace: true })
      } catch {
        // If error occurred, redirect to failure page
        navigate('/auth/failure?error=token_fetch_failed', { replace: true })
      }
    }

    handleOAuthSuccess()
  }, [dispatch, navigate])

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
            backgroundColor: 'success.light',
            mb: 2
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main' }} />
        </Box>

        <Typography variant='h4' color='success.main' gutterBottom>
          Đăng nhập thành công!
        </Typography>

        <Typography variant='body1' color='text.secondary' sx={{ mb: 2 }}>
          Bạn đã đăng nhập Google thành công. Đang chuyển hướng...
        </Typography>

        <CircularProgress color='success' />
      </Box>
    </Container>
  )
}

export default OAuthSuccess
