import { useEffect, useState, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { userApi } from '../apis/userApi'
import { toast } from 'react-toastify'
import {
  Box,
  CircularProgress,
  Typography,
  Paper,
  Container,
  Alert,
  Button
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'

const EmailVerification = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [verificationStatus, setVerificationStatus] = useState('loading') // 'loading', 'success', 'error'
  const [message, setMessage] = useState('')
  const hasVerifiedRef = useRef(false) // Để đảm bảo chỉ verify một lần

  const email = searchParams.get('email')
  const token = searchParams.get('token')

  useEffect(() => {
    const verifyAccount = async () => {
      // Nếu đã verify rồi thì không verify nữa
      if (hasVerifiedRef.current) {
        return
      }

      // Kiểm tra nếu không có email hoặc token
      if (!email || !token) {
        setVerificationStatus('error')
        setMessage(
          'URL xác minh không hợp lệ. Vui lòng kiểm tra lại liên kết từ email.'
        )
        hasVerifiedRef.current = true // Đánh dấu đã thử verify
        return
      }

      try {
        // Đánh dấu đang trong quá trình verify
        hasVerifiedRef.current = true

        // Gọi API xác minh tài khoản
        const response = await userApi.verifyUserAccount(email, token)

        setVerificationStatus('success')
        setMessage(
          response.message || 'Tài khoản của bạn đã được xác minh thành công!'
        )

        // Hiển thị thông báo thành công
        toast.success(
          'Xác minh email thành công! Bạn có thể đăng nhập bây giờ.'
        )

        // Tự động chuyển hướng sau 3 giây
        setTimeout(() => {
          navigate('/')
        }, 5000)
      } catch (error) {
        setVerificationStatus('error')

        // Xử lý các loại lỗi khác nhau
        if (error.response?.status === 400) {
          setMessage('Liên kết xác minh không hợp lệ hoặc đã hết hạn.')
        } else if (error.response?.status === 404) {
          setMessage('Không tìm thấy tài khoản. Vui lòng kiểm tra lại email.')
        } else {
          setMessage('Xác minh email thất bại. Vui lòng thử lại sau.')
        }

        // Hiển thị thông báo lỗi
        toast.error('Xác minh email thất bại!')
      }
    }

    verifyAccount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Chỉ chạy một lần khi component mount, không muốn re-run khi email/token thay đổi

  const handleBackToLogin = () => {
    navigate('/')
  }

  const handleBackToHome = () => {
    navigate('/')
  }

  return (
    <Container maxWidth='sm'>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        minHeight='100vh'
        py={4}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: 'center',
            width: '100%',
            maxWidth: 500
          }}
        >
          {verificationStatus === 'loading' && (
            <>
              <CircularProgress size={60} sx={{ mb: 3 }} />
              <Typography variant='h5' gutterBottom>
                Đang xác minh email...
              </Typography>
              <Typography variant='body1' color='text.secondary'>
                Vui lòng đợi trong khi chúng tôi xác minh tài khoản của bạn.
              </Typography>
              {email && (
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ mt: 2 }}
                >
                  Email: <strong>{email}</strong>
                </Typography>
              )}
            </>
          )}

          {verificationStatus === 'success' && (
            <>
              <CheckCircleIcon
                sx={{ fontSize: 60, color: 'success.main', mb: 2 }}
              />
              <Typography variant='h5' gutterBottom color='success.main'>
                Xác minh thành công!
              </Typography>
              <Alert severity='success' sx={{ mb: 3, textAlign: 'left' }}>
                {message}
              </Alert>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
                Bạn sẽ được chuyển hướng đến trang đăng nhập trong giây lát...
              </Typography>
              <Box display='flex' gap={2} justifyContent='center'>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleBackToLogin}
                >
                  Đăng nhập ngay
                </Button>
                <Button variant='outlined' onClick={handleBackToHome}>
                  Về trang chủ
                </Button>
              </Box>
            </>
          )}

          {verificationStatus === 'error' && (
            <>
              <ErrorIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
              <Typography variant='h5' gutterBottom color='error.main'>
                Xác minh thất bại!
              </Typography>
              <Alert severity='error' sx={{ mb: 3, textAlign: 'left' }}>
                {message}
              </Alert>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
                Hãy thử gửi lại email xác minh hoặc liên hệ với bộ phận hỗ trợ.
              </Typography>
              <Box display='flex' gap={2} justifyContent='center'>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleBackToLogin}
                >
                  Đến trang đăng nhập
                </Button>
                <Button variant='outlined' onClick={handleBackToHome}>
                  Về trang chủ
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  )
}

export default EmailVerification
