import { Box, Typography, TextField, InputAdornment } from '@mui/material'
import { Search } from '@mui/icons-material'

function SupportHeader({ searchQuery, onSearchChange }) {
  return (
    <Box textAlign='center' sx={{ mb: 6 }}>
      <Typography
        variant='h3'
        component='h1'
        sx={{
          mb: 2,
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Trung tâm hỗ trợ
      </Typography>
      <Typography
        variant='h6'
        color='text.secondary'
        sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
      >
        Chúng tôi luôn sẵn sàng hỗ trợ bạn. Tìm câu trả lời cho các câu hỏi
        thường gặp hoặc liên hệ trực tiếp với đội ngũ hỗ trợ.
      </Typography>

      {/* Search Box */}
      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
        <TextField
          fullWidth
          placeholder='Tìm kiếm câu hỏi, chủ đề...'
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search color='action' />
              </InputAdornment>
            ),
            sx: {
              border: '1px solid',
              borderRadius: 3,
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none'
              },
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }
          }}
          size='large'
        />
      </Box>
    </Box>
  )
}

export default SupportHeader
