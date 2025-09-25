import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Stack,
  Divider
} from '@mui/material'
import {
  Close as CloseIcon,
  Computer as ComputerIcon,
  Smartphone as SmartphoneIcon,
  Tablet as TabletIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  LocationOn as LocationOnIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material'
import { formatDate } from '../../../utils/formatUtils'

const UserSessionDialog = ({ open, onClose, userName, sessions }) => {
  // Helper function để lấy icon device
  const getDeviceIcon = (device) => {
    const deviceLower = device.toLowerCase()
    if (deviceLower.includes('iphone') || deviceLower.includes('android')) {
      return <SmartphoneIcon fontSize='small' />
    }
    if (deviceLower.includes('ipad') || deviceLower.includes('tablet')) {
      return <TabletIcon fontSize='small' />
    }
    return <ComputerIcon fontSize='small' />
  }

  // Helper function để format thời gian
  const formatDateTime = (dateString) => {
    return formatDate(dateString, { withTime: true })
  }

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now - date
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInMinutes < 1) return 'vừa xong'
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`
    if (diffInHours < 24) return `${diffInHours} giờ trước`
    if (diffInDays < 30) return `${diffInDays} ngày trước`
    return `${Math.floor(diffInDays / 30)} tháng trước`
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='lg'
      fullWidth
      PaperProps={{
        sx: {
          minHeight: '500px',
          maxHeight: '80vh'
        }
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1
        }}
      >
        <Box>
          <Typography variant='h6' component='div' sx={{ fontWeight: 600 }}>
            Sessions của {userName}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {sessions.length} session(s) được tìm thấy
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            color: 'grey.500',
            '&:hover': { color: 'grey.700' }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ p: 0 }}>
        {sessions.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 300,
              color: 'text.secondary'
            }}
          >
            <ComputerIcon sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
            <Typography variant='h6'>Không có session nào</Typography>
            <Typography variant='body2'>
              User này chưa có session nào được ghi nhận
            </Typography>
          </Box>
        ) : (
          <TableContainer component={Paper} elevation={0}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>
                    Device & Browser
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>
                    IP Address & Location
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>
                    Thời gian đăng nhập
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>
                    Hoạt động cuối
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>
                    Trạng thái
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>
                    Hết hạn
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sessions.map((session) => (
                  <TableRow
                    key={session._id}
                    sx={{
                      '&:hover': { bgcolor: 'action.hover' },
                      bgcolor: session.isActive ? 'success.light' : 'inherit',
                      opacity: session.isActive ? 1 : 0.7
                    }}
                  >
                    <TableCell>
                      <Stack direction='row' spacing={1} alignItems='center'>
                        {getDeviceIcon(session.device)}
                        <Box>
                          <Typography variant='body2' fontWeight={500}>
                            {session.device}
                          </Typography>
                          <Typography variant='caption' color='text.secondary'>
                            Session ID: {session.sessionId.slice(-8)}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Box>
                        <Typography variant='body2' fontWeight={500}>
                          {session.ipAddress}
                        </Typography>
                        <Stack
                          direction='row'
                          spacing={0.5}
                          alignItems='center'
                        >
                          <LocationOnIcon fontSize='small' color='action' />
                          <Typography variant='caption' color='text.secondary'>
                            {session.location}
                          </Typography>
                        </Stack>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box>
                        <Typography variant='body2'>
                          {formatDateTime(session.loginTime)}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {formatTimeAgo(session.loginTime)}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box>
                        <Typography variant='body2'>
                          {formatDateTime(session.lastActivity)}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {formatTimeAgo(session.lastActivity)}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Chip
                        icon={
                          session.isActive ? (
                            <CheckCircleIcon />
                          ) : (
                            <CancelIcon />
                          )
                        }
                        label={
                          session.isActive ? 'Hoạt động' : 'Không hoạt động'
                        }
                        color={session.isActive ? 'success' : 'default'}
                        size='small'
                        variant={session.isActive ? 'filled' : 'outlined'}
                      />
                    </TableCell>

                    <TableCell>
                      <Stack direction='row' spacing={0.5} alignItems='center'>
                        <ScheduleIcon fontSize='small' color='action' />
                        <Box>
                          <Typography variant='body2'>
                            {formatDateTime(session.expiresAt)}
                          </Typography>
                          <Typography variant='caption' color='text.secondary'>
                            {formatTimeAgo(session.expiresAt)}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant='contained' color='primary'>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserSessionDialog
