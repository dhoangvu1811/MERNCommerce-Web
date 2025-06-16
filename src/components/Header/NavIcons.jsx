import { Badge, IconButton, Box } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link } from 'react-router-dom'

function NavIcons() {
  // Placeholder for cart items count
  const cartItemsCount = 2

  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton component={Link} to='/' color='inherit' size='large'>
        <HomeIcon />
      </IconButton>

      <IconButton component={Link} to='/account' color='inherit' size='large'>
        <AccountCircleIcon />
      </IconButton>

      <IconButton component={Link} to='/cart' color='inherit' size='large'>
        <Badge badgeContent={cartItemsCount} color='error'>
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Box>
  )
}

export default NavIcons
