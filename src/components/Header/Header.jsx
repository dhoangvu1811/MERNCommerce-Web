import { AppBar, Toolbar, Box, Container, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Logo from './Logo'
import SearchBox from './SearchBox'
import NavIcons from './NavIcons'
import ModeSelect from '../ModeSelect/ModeSelect'

function Header() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <AppBar position='static' color='default' elevation={1}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo section */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Logo />
          </Box>

          {/* SearchBox - centered on desktop, below logo on mobile */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexGrow: 1,
              justifyContent: 'center',
              mx: 2
            }}
          >
            <SearchBox />
          </Box>

          {/* Navigation Icons and Mode Select */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NavIcons />
            <ModeSelect />
          </Box>

          {/* SearchBox on mobile - full width below toolbar */}
          {isMobile && (
            <Box
              sx={{
                display: { xs: 'flex', md: 'none' },
                width: '100%',
                mt: 1,
                mb: 1,
                justifyContent: 'center'
              }}
            >
              <SearchBox />
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
