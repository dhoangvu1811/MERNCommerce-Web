import {
  AppBar,
  Toolbar,
  Box,
  Container,
  useMediaQuery,
  SvgIcon
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ECommerceIcon from '~/assets/logo/logo.svg?react'
import SearchBox from './SearchBox'
import NavIcons from './NavIcons'
import ModeSelect from '../ModeSelect/ModeSelect'
import Logo from './Logo'

function Header() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <AppBar position='static' color='default' elevation={1}>
      <Container maxWidth='xl'>
        {/* Main Toolbar */}
        <Toolbar
          disableGutters
          sx={{
            justifyContent: 'space-between',
            minHeight: { xs: '56px', sm: '64px' },
            py: { xs: 1, md: 0 }
          }}
        >
          {/* Logo section */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            {/* <SvgIcon
              component={ECommerceIcon}
              inheritViewBox
              sx={{
                fontSize: { xs: '3rem', sm: '3.5rem', md: '5rem' },
                color: theme.palette.mode === 'dark' ? 'white' : 'black',
                transition: 'color 0.3s ease'
              }}
            /> */}
            <Logo />
          </Box>

          {/* SearchBox - centered on desktop only */}
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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              gap: { xs: 0.5, sm: 1 }
            }}
          >
            <NavIcons />
            <ModeSelect />
          </Box>
        </Toolbar>

        {/* SearchBox on mobile - separate container */}
        {isMobile && (
          <Box
            sx={{
              display: { xs: 'block', md: 'none' },
              px: 2,
              pb: 2,
              pt: 0
            }}
          >
            <SearchBox />
          </Box>
        )}
      </Container>
    </AppBar>
  )
}

export default Header
