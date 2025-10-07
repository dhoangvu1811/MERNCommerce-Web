import { Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { MainLogoIcon } from '../icons/CustomIcons'

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
        <MainLogoIcon sx={{
          display: { xs: 'flex', md: 'flex' },
          mr: 1.5,
          width: { xs: 28, sm: 32, md: 36 },
          height: { xs: 28, sm: 32, md: 36 }
        }} />
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
          DHVtech
        </Typography>
      </Link>
    </Box>
  )
}

export default Logo
