import React, { useState } from 'react'
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
  Divider,
  Tooltip,
  CircularProgress
} from '@mui/material'
import {
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  LocationOn as LocationOnIcon,
  Schedule as ScheduleIcon,
  Delete as DeleteIcon,
  DeleteSweep as DeleteSweepIcon
} from '@mui/icons-material'
import { Computer as ComputerIcon } from '@mui/icons-material'
import { formatDate } from '../../../utils/formatUtils'
import { parseDeviceInfo } from '../../../utils/sessionUtils'
import { DeviceIcon } from '../../../utils/deviceIconUtils'
import { sessionApi } from '../../../apis'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi'

// Configure dayjs
dayjs.extend(relativeTime)
dayjs.locale('vi')

const UserSessionDialog = ({
  open,
  onClose,
  userName,
  sessions,
  userId,
  loading,
  onSessionRevoked
}) => {
  const [revokeLoading, setRevokeLoading] = useState(false)
  const [revokeAllLoading, setRevokeAllLoading] = useState(false)
  const [localSessions, setLocalSessions] = useState(sessions)
  const [localLoading, setLocalLoading] = useState(false)

  // Update local sessions khi sessions prop thay đổi
  React.useEffect(() => {
    setLocalSessions(sessions)
  }, [sessions])

  // Hàm refresh sessions giống như handleViewSessions trong SessionTable
  const refreshSessions = async () => {
    if (!userId) return

    setLocalLoading(true)

    const response = await sessionApi.getUserSessions(userId)

    // Transform session data để phù hợp với DB schema
    const transformedSessions =
      response.data?.sessions?.map((session) => ({
        _id: session._id,
        sessionId: session.sessionId,
        userId: session.userId,
        deviceInfo: session.deviceInfo || 'Không xác định',
        ipAddress: session.ipAddress || 'N/A',
        location: session.location || 'Không xác định',
        loginTime: dayjs(session.createdAt).toDate(),
        lastActivity: session.updatedAt
          ? dayjs(session.updatedAt).toDate()
          : dayjs(session.createdAt).toDate(),
        isActive: session.isActive !== undefined ? session.isActive : true,
        expiresAt: dayjs(session.expiresAt).toDate()
      })) || []

    setLocalSessions(transformedSessions)
    setLocalLoading(false)
  }

  // Handle revoke single session
  const handleRevokeSession = async (sessionId) => {
    if (!userId || !sessionId) return

    setRevokeLoading(true)

    await sessionApi.revokeSession(sessionId)

    // Refresh sessions trong dialog
    await refreshSessions()

    // Refresh data users list
    if (onSessionRevoked) {
      await onSessionRevoked()
    }

    setRevokeLoading(false)
  }

  // Handle revoke all sessions của user
  const handleRevokeAllSessions = async () => {
    if (!userId) return

    setRevokeAllLoading(true)

    await sessionApi.revokeAllUserSessions(userId)

    // Refresh sessions trong dialog
    await refreshSessions()

    // Refresh data users list
    if (onSessionRevoked) {
      await onSessionRevoked()
    }

    // Close dialog sau khi revoke all
    onClose()
    setRevokeAllLoading(false)
  }

  // Helper function để format thời gian
  const formatDateTime = (dateString) => {
    return formatDate(dateString, { withTime: true })
  }

  const formatTimeAgo = (dateString) => {
    return dayjs(dateString).fromNow()
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
            {localSessions.length} session(s) được tìm thấy
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
        {/* Loading State */}
        {loading || localLoading ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 300
            }}
          >
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant='body2' color='text.secondary'>
              Đang tải sessions...
            </Typography>
          </Box>
        ) : localSessions.length === 0 ? (
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
                  <TableCell sx={{ fontWeight: 600 }}>
                    Device & Browser
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    IP Address & Location
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    Thời gian đăng nhập
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Hoạt động cuối</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Trạng thái</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Hết hạn</TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      textAlign: 'center'
                    }}
                  >
                    Thao tác
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {localSessions.map((session) => (
                  <TableRow
                    key={session.sessionId || session._id}
                    sx={{
                      '&:hover': { bgcolor: 'action.hover' },
                      opacity: session.isActive ? 1 : 0.7
                    }}
                  >
                    <TableCell>
                      <Stack direction='row' spacing={1} alignItems='center'>
                        <DeviceIcon
                          deviceInfo={session.deviceInfo || 'Computer'}
                          fontSize='small'
                        />
                        <Box>
                          <Typography variant='body2' fontWeight={500}>
                            {parseDeviceInfo(session.deviceInfo).device}
                          </Typography>
                          <Typography variant='caption' color='text.secondary'>
                            Session ID:{' '}
                            {session.sessionId?.slice(-8) ||
                              session._id?.slice(-8)}
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
                          {session.lastActivity
                            ? formatDateTime(session.lastActivity)
                            : formatDateTime(session.loginTime)}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {session.lastActivity
                            ? formatTimeAgo(session.lastActivity)
                            : 'Không có hoạt động'}
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

                    <TableCell sx={{ textAlign: 'center' }}>
                      {session.isActive && (
                        <Tooltip title='Revoke session này'>
                          <IconButton
                            size='small'
                            color='error'
                            onClick={() =>
                              handleRevokeSession(
                                session.sessionId || session._id
                              )
                            }
                            disabled={revokeLoading}
                            sx={{
                              '&:hover': {
                                backgroundColor: 'error.light',
                                color: 'white'
                              }
                            }}
                          >
                            {revokeLoading ? (
                              <CircularProgress size={16} />
                            ) : (
                              <DeleteIcon fontSize='small' />
                            )}
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
        <Box>
          {localSessions.some((session) => session.isActive) && (
            <Button
              onClick={handleRevokeAllSessions}
              variant='outlined'
              color='error'
              startIcon={
                revokeAllLoading ? (
                  <CircularProgress size={16} />
                ) : (
                  <DeleteSweepIcon />
                )
              }
              disabled={revokeAllLoading || revokeLoading}
              sx={{
                '&:hover': {
                  backgroundColor: 'error.light',
                  color: 'white'
                }
              }}
            >
              {revokeAllLoading ? 'Đang revoke...' : 'Revoke tất cả Sessions'}
            </Button>
          )}
        </Box>
        <Button onClick={onClose} variant='contained' color='primary'>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserSessionDialog
