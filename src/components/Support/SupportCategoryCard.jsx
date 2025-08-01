import { Card, CardContent, Avatar, Typography, Box, Chip } from '@mui/material'

function SupportCategoryCard({ icon, title, description, count, onClick }) {
  return (
    <Card
      onClick={onClick}
      sx={{
        p: 3,
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.12)'
        }
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>{icon}</Avatar>
          <Box>
            <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 0.5 }}>
              {title}
            </Typography>
            <Chip
              label={count}
              size='small'
              color='primary'
              variant='outlined'
            />
          </Box>
        </Box>
        <Typography color='text.secondary' variant='body2'>
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default SupportCategoryCard
