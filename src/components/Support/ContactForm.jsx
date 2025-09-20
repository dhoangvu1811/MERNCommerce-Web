import { useState } from 'react'
import { Paper, Typography, Grid, TextField, Button, Box } from '@mui/material'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // TODO: Handle form submission
    // console.log('Form submitted:', formData)
  }

  return (
    <Paper elevation={0} sx={{ p: 4, mt: 6, borderRadius: 3 }}>
      <Typography
        variant='h5'
        sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}
      >
        Vẫn cần hỗ trợ?
      </Typography>
      <Typography
        variant='body1'
        color='text.secondary'
        sx={{ mb: 4, textAlign: 'center' }}
      >
        Điền form dưới đây và chúng tôi sẽ liên hệ với bạn trong thời gian sớm
        nhất
      </Typography>

      <Box component='form' onSubmit={handleSubmit}>
        <Grid container spacing={3} sx={{ maxWidth: 800, mx: 'auto' }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label='Họ và tên'
              variant='outlined'
              required
              value={formData.name}
              onChange={handleChange('name')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label='Email'
              type='email'
              variant='outlined'
              required
              value={formData.email}
              onChange={handleChange('email')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label='Số điện thoại'
              variant='outlined'
              value={formData.phone}
              onChange={handleChange('phone')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label='Chủ đề'
              variant='outlined'
              required
              value={formData.subject}
              onChange={handleChange('subject')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Nội dung chi tiết'
              multiline
              rows={4}
              variant='outlined'
              required
              value={formData.message}
              onChange={handleChange('message')}
            />
          </Grid>
          <Grid item xs={12}>
            <Box textAlign='center'>
              <Button
                type='submit'
                variant='contained'
                size='large'
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  background:
                    'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  '&:hover': {
                    background:
                      'linear-gradient(45deg, #1976D2 30%, #0288D1 90%)'
                  }
                }}
              >
                Gửi yêu cầu hỗ trợ
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default ContactForm
