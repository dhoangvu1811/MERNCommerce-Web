import { Paper, Typography, Grid } from '@mui/material'
import {
  Phone,
  Email,
  Chat,
  ArrowForward,
  AccessTime,
  CheckCircle
} from '@mui/icons-material'
import ContactCard from './ContactCard'

function QuickContact() {
  const contactOptions = [
    {
      icon: <Phone fontSize='large' />,
      title: 'Hotline',
      description: 'Gọi ngay để được hỗ trợ tức thì',
      mainContent: '1900-1234',
      bgColor: '#2196F3',
      statusIcon: <AccessTime fontSize='small' color='success' />,
      statusText: '24/7'
    },
    {
      icon: <Chat fontSize='large' />,
      title: 'Live Chat',
      description: 'Chat trực tiếp với tư vấn viên',
      mainContent: 'Bắt đầu chat',
      bgColor: '#4CAF50',
      buttonProps: {
        variant: 'contained',
        color: 'success',
        endIcon: <ArrowForward />
      },
      statusIcon: <CheckCircle fontSize='small' color='success' />,
      statusText: 'Trực tuyến'
    },
    {
      icon: <Email fontSize='large' />,
      title: 'Email',
      description: 'Gửi email để được hỗ trợ chi tiết',
      mainContent: 'support@example.com',
      bgColor: '#FF9800',
      subContent: 'Phản hồi trong 2-4 giờ',
      statusColor: 'text.secondary'
    }
  ]

  return (
    <Paper elevation={0} sx={{ p: 4, mb: 6, borderRadius: 3 }}>
      <Typography
        variant='h5'
        sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}
      >
        Liên hệ nhanh
      </Typography>
      <Grid container spacing={3}>
        {contactOptions.map((option, index) => (
          <Grid item xs={12} md={4} key={index}>
            <ContactCard {...option} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}

export default QuickContact
