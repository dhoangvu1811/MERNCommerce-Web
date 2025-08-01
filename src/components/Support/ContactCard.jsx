import { Card, Avatar, Typography, Box, Button } from '@mui/material'

function ContactCard({
  icon,
  title,
  description,
  mainContent,
  subContent,
  bgColor,
  buttonProps,
  statusIcon,
  statusText,
  statusColor = 'success.main'
}) {
  return (
    <Card
      sx={{
        p: 3,
        textAlign: 'center',
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
        }
      }}
    >
      <Avatar
        sx={{
          bgcolor: bgColor,
          mx: 'auto',
          mb: 2,
          width: 60,
          height: 60
        }}
      >
        {icon}
      </Avatar>

      <Typography variant='h6' sx={{ mb: 1, fontWeight: 'bold' }}>
        {title}
      </Typography>

      <Typography color='text.secondary' sx={{ mb: 2 }}>
        {description}
      </Typography>

      {/* Main Content - có thể là phone number, button, hoặc email */}
      {typeof mainContent === 'string' ? (
        <Typography
          variant={buttonProps ? 'body1' : 'h6'}
          color='primary'
          sx={{ fontWeight: 'bold' }}
        >
          {mainContent}
        </Typography>
      ) : buttonProps ? (
        <Button {...buttonProps}>{mainContent}</Button>
      ) : (
        mainContent
      )}

      {/* Sub Content hoặc Status */}
      {(subContent || statusIcon) && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 1
          }}
        >
          {statusIcon && statusIcon}
          <Typography
            variant='body2'
            color={statusColor}
            sx={{ ml: statusIcon ? 0.5 : 0 }}
          >
            {subContent || statusText}
          </Typography>
        </Box>
      )}
    </Card>
  )
}

export default ContactCard
