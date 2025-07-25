import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge,
  Tooltip
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SettingsIcon from '@mui/icons-material/Settings'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const AdminHeader = () => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget)
  }

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null)
  }

  const handleLogout = () => {
    // Here you would handle logout logic
    navigate('/')
    handleMenuClose()
  }

  return (
    <AppBar position='static' sx={{ bgcolor: '#1976d2', boxShadow: 3 }}>
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' sx={{ mr: 2 }}>
          <DashboardIcon />
        </IconButton>
        <Typography
          variant='h6'
          component='div'
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          E-Commerce Admin
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Return to homepage'>
            <IconButton color='inherit' onClick={() => navigate('/')}>
              <HomeIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title='Notifications'>
            <IconButton color='inherit' onClick={handleNotificationMenuOpen}>
              <Badge badgeContent={3} color='error'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title='Settings'>
            <IconButton color='inherit'>
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title='Account'>
            <IconButton
              size='large'
              edge='end'
              aria-label='account of current user'
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: '#fff',
                  color: '#1976d2'
                }}
              >
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        id='profile-menu'
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Hồ sơ</MenuItem>
        <MenuItem onClick={handleMenuClose}>Cài đặt tài khoản</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <LogoutIcon fontSize='small' sx={{ mr: 1 }} />
          Đăng xuất
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        id='notifications-menu'
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(notificationAnchorEl)}
        onClose={handleNotificationMenuClose}
      >
        <MenuItem onClick={handleNotificationMenuClose}>
          Đơn hàng mới #12345
        </MenuItem>
        <MenuItem onClick={handleNotificationMenuClose}>
          Đánh giá mới từ khách hàng
        </MenuItem>
        <MenuItem onClick={handleNotificationMenuClose}>
          Sản phẩm sắp hết hàng: iPhone 14 Pro
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleNotificationMenuClose}
          sx={{ justifyContent: 'center' }}
        >
          <Typography color='primary'>Xem tất cả</Typography>
        </MenuItem>
      </Menu>
    </AppBar>
  )
}

export default AdminHeader
