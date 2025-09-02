/* eslint-disable indent */
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '~/hooks/useAuth'
import { useSelector } from 'react-redux'
import { selectCartCount } from '~/redux/slices/orderSlice'
import {
  Badge,
  IconButton,
  Box,
  Paper,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Typography,
  ListItemIcon,
  Divider
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import ReceiptIcon from '@mui/icons-material/Receipt'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import LogoutIcon from '@mui/icons-material/Logout'
import DiscountTwoToneIcon from '@mui/icons-material/DiscountTwoTone'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import LoginDialog from '../auth/LoginDialog'
import RegisterDialog from '../auth/RegisterDialog'

function NavIcons() {
  const navigate = useNavigate()
  const { isAuthenticated, isAdmin, logout } = useAuth()

  // Cart items count from Redux
  const cartItemsCount = useSelector(selectCartCount)

  // Account dropdown state
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  // Dialog states
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false)

  // Timer for delay on hover events
  const timerRef = useRef(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    // Check if event exists before trying to access its properties
    if (
      event &&
      anchorRef.current &&
      anchorRef.current.contains(event.target)
    ) {
      return
    }

    setOpen(false)
  }

  // Close if Tab or Escape pressed
  const handleListKeyDown = (event) => {
    if (event.key === 'Tab' || event.key === 'Escape') {
      event.preventDefault()
      setOpen(false)
    }
  }

  // Add delay on hover to prevent accidental triggering
  const handleMouseEnter = () => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setOpen(true)
    }, 100)
  }

  const handleMouseLeave = () => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setOpen(false)
    }, 300)
  }

  // Dialog handlers
  const handleOpenLoginDialog = () => {
    setOpen(false)
    setLoginDialogOpen(true)
  }

  const handleCloseLoginDialog = () => {
    setLoginDialogOpen(false)
  }

  const handleOpenRegisterDialog = () => {
    setOpen(false)
    setRegisterDialogOpen(true)
  }

  const handleCloseRegisterDialog = () => {
    setRegisterDialogOpen(false)
  }

  const handleLoginSuccess = () => {
    // Auth state sẽ được tự động cập nhật thông qua Redux
    // Không cần reload trang vì useAuth hook sẽ tự động update
    setLoginDialogOpen(false)
  }

  const handleLogout = async () => {
    await logout()
    handleClose(null)
    navigate('/')
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton component={Link} to='/' color='inherit' size='large'>
        <HomeIcon />
      </IconButton>

      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <IconButton
          ref={anchorRef}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleToggle}
          color='inherit'
          size='large'
          sx={{
            position: 'relative',
            '&::after': open
              ? {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  bgcolor: 'primary.main'
                }
              : {}
          }}
        >
          <AccountCircleIcon />
        </IconButton>

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement='bottom-end'
          transition
          disablePortal
          sx={{ zIndex: 1200 }}
          onMouseEnter={() => clearTimeout(timerRef.current)}
          onMouseLeave={handleMouseLeave}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} style={{ transformOrigin: 'top right' }}>
              <Paper
                elevation={3}
                sx={{
                  width: 240,
                  mt: 1.5,
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id='account-menu'
                    aria-labelledby='account-button'
                    onKeyDown={handleListKeyDown}
                    sx={{
                      py: 0,
                      '& .MuiMenuItem-root': {
                        '&:hover': {
                          bgcolor: 'rgba(0, 0, 0, 0.04)'
                        },
                        transition: 'background-color 0.2s ease'
                      }
                    }}
                  >
                    <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
                      <Typography
                        variant='subtitle1'
                        sx={{ fontWeight: 'bold' }}
                      >
                        Tài khoản
                      </Typography>
                    </Box>

                    {isAuthenticated ? (
                      // Logged in user menu items
                      <Box component='div'>
                        <MenuItem
                          component={Link}
                          to='/account'
                          onClick={handleClose}
                          sx={{ py: 1.5 }}
                        >
                          <ListItemIcon>
                            <PersonOutlineIcon fontSize='small' />
                          </ListItemIcon>
                          <Typography variant='body2'>
                            Thông tin tài khoản
                          </Typography>
                        </MenuItem>

                        <MenuItem
                          component={Link}
                          to='/orders'
                          onClick={handleClose}
                          sx={{ py: 1.5 }}
                        >
                          <ListItemIcon>
                            <ReceiptIcon fontSize='small' />
                          </ListItemIcon>
                          <Typography variant='body2'>
                            Đơn hàng của tôi
                          </Typography>
                        </MenuItem>

                        {/* Admin option - chỉ hiển thị nếu user là admin */}
                        {isAdmin && (
                          <MenuItem
                            component={Link}
                            to='/admin'
                            onClick={handleClose}
                            sx={{ py: 1.5 }}
                          >
                            <ListItemIcon>
                              <AdminPanelSettingsIcon
                                fontSize='small'
                                color='primary'
                              />
                            </ListItemIcon>
                            <Typography variant='body2' color='primary.main'>
                              Quản lý hệ thống
                            </Typography>
                          </MenuItem>
                        )}

                        <MenuItem
                          component={Link}
                          to='/vouchers'
                          onClick={handleClose}
                          sx={{ py: 1.5 }}
                        >
                          <ListItemIcon>
                            <DiscountTwoToneIcon fontSize='small' />
                          </ListItemIcon>
                          <Typography variant='body2'>
                            Voucher giảm giá
                          </Typography>
                        </MenuItem>

                        <MenuItem
                          component={Link}
                          to='/support'
                          onClick={handleClose}
                          sx={{ py: 1.5 }}
                        >
                          <ListItemIcon>
                            <HelpOutlineIcon fontSize='small' />
                          </ListItemIcon>
                          <Typography variant='body2'>
                            Trung tâm hỗ trợ
                          </Typography>
                        </MenuItem>

                        <Divider />

                        <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
                          <ListItemIcon>
                            <LogoutIcon fontSize='small' color='error' />
                          </ListItemIcon>
                          <Typography variant='body2' color='error.main'>
                            Đăng xuất
                          </Typography>
                        </MenuItem>
                      </Box>
                    ) : (
                      // Guest user menu items
                      <Box component='div'>
                        <MenuItem
                          onClick={() => {
                            handleClose(null) // Pass null to avoid the target error
                            handleOpenLoginDialog()
                          }}
                          sx={{ py: 1.5 }}
                        >
                          <ListItemIcon>
                            <PersonOutlineIcon
                              fontSize='small'
                              color='primary'
                            />
                          </ListItemIcon>
                          <Typography
                            variant='body2'
                            color='primary.main'
                            sx={{ fontWeight: 'medium' }}
                          >
                            Đăng nhập
                          </Typography>
                        </MenuItem>

                        <MenuItem
                          onClick={() => {
                            handleClose(null) // Pass null to avoid the target error
                            handleOpenRegisterDialog()
                          }}
                          sx={{ py: 1.5 }}
                        >
                          <ListItemIcon>
                            <PersonOutlineIcon fontSize='small' />
                          </ListItemIcon>
                          <Typography variant='body2'>Đăng ký</Typography>
                        </MenuItem>

                        <Divider />

                        <MenuItem
                          component={Link}
                          to='/support'
                          onClick={handleClose}
                          sx={{ py: 1.5 }}
                        >
                          <ListItemIcon>
                            <HelpOutlineIcon fontSize='small' />
                          </ListItemIcon>
                          <Typography variant='body2'>
                            Trung tâm hỗ trợ
                          </Typography>
                        </MenuItem>
                      </Box>
                    )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>

      <IconButton component={Link} to='/cart' color='inherit' size='large'>
        <Badge badgeContent={cartItemsCount} color='error'>
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      {/* Auth Dialogs */}
      <LoginDialog
        open={loginDialogOpen}
        onClose={handleCloseLoginDialog}
        onSuccess={handleLoginSuccess}
        onSwitchToRegister={handleOpenRegisterDialog}
      />

      <RegisterDialog
        open={registerDialogOpen}
        onClose={handleCloseRegisterDialog}
        onSuccess={() => handleOpenLoginDialog()} // On successful registration, open login
        onSwitchToLogin={handleOpenLoginDialog}
      />
    </Box>
  )
}

export default NavIcons
