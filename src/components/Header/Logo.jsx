import { Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import StorefrontIcon from '@mui/icons-material/Storefront'

function Logo() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Link
        to='/'
        style={{
          textDecoration: 'none',
          color: 'inherit',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <StorefrontIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} />
        <Typography
          variant='h6'
          noWrap
          sx={{
            fontWeight: 700,
            letterSpacing: '.1rem',
            color: 'inherit',
            textDecoration: 'none',
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          MyShop
        </Typography>
      </Link>
    </Box>
  )
}

export default Logo
