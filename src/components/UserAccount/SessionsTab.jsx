/* eslint-disable indent */
import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack,
  Alert,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
  Tooltip
} from '@mui/material'
import {
  LocationOn as LocationOnIcon,
  AccessTime as AccessTimeIcon,
  Security as SecurityIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon
} from '@mui/icons-material'
import { toast } from 'react-toastify'
import sessionApi from '../../apis/sessionApi'
import { formatDate } from '../../utils/formatUtils'
import { parseDeviceInfo } from '../../utils/sessionUtils'
import { DeviceIcon } from '../../utils/deviceIconUtils'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi'

// Configure dayjs
dayjs.extend(relativeTime)
dayjs.locale('vi')

const SessionsTab = () => {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(false)
  const [revokeDialogOpen, setRevokeDialogOpen] = useState(false)
  const [sessionToRevoke, setSessionToRevoke] = useState(null)
  const [revokeLoading, setRevokeLoading] = useState(false)

  // Load user sessions
  const loadSessions = async () => {
    setLoading(true)
    try {
      const response = await sessionApi.getCurrentUserSessions()

      // Transform session data
      const transformedSessions =
        response.data?.sessions?.map((session) => ({
          _id: session._id,
          sessionId: session.sessionId,
          deviceInfo: session.deviceInfo || 'Không xác định',
          ipAddress: session.ipAddress || 'N/A',
          location: session.location || 'Không xác định',
          loginTime: dayjs(session.createdAt).toDate(),
          lastActivity: session.updatedAt
            ? dayjs(session.updatedAt).toDate()
            : dayjs(session.createdAt).toDate(),
          isActive: session.isActive !== undefined ? session.isActive : true,
          expiresAt: dayjs(session.expiresAt).toDate(),
          isCurrent: session.isCurrent || false // Backend sẽ mark session hiện tại
        })) || []

      setSessions(transformedSessions)
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    loadSessions()
  }, [])

  // Handle revoke session
  const handleRevokeClick = (session) => {
    setSessionToRevoke(session)
    setRevokeDialogOpen(true)
  }

  const handleConfirmRevoke = async () => {
    if (!sessionToRevoke) return

    setRevokeLoading(true)
    try {
      await sessionApi.revokeMySession(sessionToRevoke.sessionId)
      toast.success('Đã hủy phiên đăng nhập thành công')

      // Refresh sessions list
      await loadSessions()

      setRevokeDialogOpen(false)
      setSessionToRevoke(null)
    } finally {
      setRevokeLoading(false)
    }
  }

  const handleCancelRevoke = () => {
    setRevokeDialogOpen(false)
    setSessionToRevoke(null)
  }

  // Format time ago
  const formatTimeAgo = (date) => {
    return dayjs(date).fromNow()
  }

  if (loading) {
    return (
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
          Đang tải danh sách phiên đăng nhập...
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box>
          <Typography
            variant='h5'
            component='h2'
            sx={{ fontWeight: 600, mb: 1 }}
          >
            Quản lý phiên đăng nhập
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Xem và quản lý các thiết bị đã đăng nhập vào tài khoản của bạn
          </Typography>
        </Box>
        <Button
          variant='outlined'
          startIcon={<RefreshIcon />}
          onClick={loadSessions}
          disabled={loading}
        >
          Làm mới
        </Button>
      </Box>

      {/* Info Alert */}
      <Alert severity='info' sx={{ mb: 3 }}>
        <Typography variant='body2'>
          <strong>Lưu ý:</strong> Bạn có thể hủy phiên đăng nhập trên các thiết
          bị khác để đảm bảo an toàn tài khoản. Phiên hiện tại được đánh dấu đặc
          biệt và không thể hủy.
        </Typography>
      </Alert>

      {/* Sessions Grid */}
      {sessions.length === 0 ? (
        <Card sx={{ textAlign: 'center', py: 6 }}>
          <CardContent>
            <SecurityIcon
              sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }}
            />
            <Typography variant='h6' color='text.secondary'>
              Không có phiên đăng nhập nào
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Hiện tại không có phiên đăng nhập nào được ghi nhận
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {sessions.map((session) => {
            const deviceData = parseDeviceInfo(session.deviceInfo)
            const isCurrentSession = session.isCurrent

            return (
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                key={session.sessionId || session._id}
              >
                <Card
                  elevation={isCurrentSession ? 4 : 1}
                  sx={{
                    height: '100%',
                    border: isCurrentSession ? 2 : 0,
                    borderColor: isCurrentSession
                      ? 'primary.main'
                      : 'transparent',
                    position: 'relative'
                  }}
                >
                  {/* Current Session Badge */}
                  {isCurrentSession && (
                    <Chip
                      label='Phiên hiện tại'
                      color='primary'
                      size='small'
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        zIndex: 1
                      }}
                    />
                  )}

                  <CardContent>
                    {/* Device Info */}
                    <Stack
                      direction='row'
                      spacing={2}
                      alignItems='flex-start'
                      sx={{ mb: 2 }}
                    >
                      <Box sx={{ color: 'primary.main', mt: 0.5 }}>
                        <DeviceIcon deviceInfo={session.deviceInfo} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant='subtitle1' fontWeight={600}>
                          {deviceData.device}
                        </Typography>
                        <Stack
                          direction='row'
                          spacing={1}
                          alignItems='center'
                          sx={{ mt: 1 }}
                        >
                          <Chip
                            icon={
                              session.isActive ? (
                                <ActiveIcon />
                              ) : (
                                <InactiveIcon />
                              )
                            }
                            label={
                              session.isActive ? 'Hoạt động' : 'Không hoạt động'
                            }
                            color={session.isActive ? 'success' : 'default'}
                            size='small'
                            variant='outlined'
                          />
                        </Stack>
                      </Box>
                    </Stack>

                    <Divider sx={{ my: 2 }} />

                    {/* Session Details */}
                    <Stack spacing={1.5}>
                      {/* IP Address & Location */}
                      <Stack direction='row' spacing={1} alignItems='center'>
                        <LocationOnIcon fontSize='small' color='action' />
                        <Box>
                          <Typography variant='body2' fontWeight={500}>
                            {session.ipAddress}
                          </Typography>
                          <Typography variant='caption' color='text.secondary'>
                            {session.location}
                          </Typography>
                        </Box>
                      </Stack>

                      {/* Login Time */}
                      <Stack direction='row' spacing={1} alignItems='center'>
                        <AccessTimeIcon fontSize='small' color='action' />
                        <Box>
                          <Typography variant='body2'>
                            Đăng nhập:{' '}
                            {formatDate(session.loginTime, { withTime: true })}
                          </Typography>
                          <Typography variant='caption' color='text.secondary'>
                            {formatTimeAgo(session.loginTime)}
                          </Typography>
                        </Box>
                      </Stack>

                      {/* Last Activity */}
                      <Stack direction='row' spacing={1} alignItems='center'>
                        <AccessTimeIcon fontSize='small' color='action' />
                        <Box>
                          <Typography variant='body2'>
                            Hoạt động cuối:{' '}
                            {session.lastActivity
                              ? formatDate(session.lastActivity, {
                                  withTime: true
                                })
                              : 'Không có'}
                          </Typography>
                          <Typography variant='caption' color='text.secondary'>
                            {session.lastActivity
                              ? formatTimeAgo(session.lastActivity)
                              : 'N/A'}
                          </Typography>
                        </Box>
                      </Stack>

                      {/* Expires At */}
                      <Stack direction='row' spacing={1} alignItems='center'>
                        <SecurityIcon fontSize='small' color='action' />
                        <Box>
                          <Typography variant='body2'>
                            Hết hạn:{' '}
                            {formatDate(session.expiresAt, { withTime: true })}
                          </Typography>
                          <Typography variant='caption' color='text.secondary'>
                            {formatTimeAgo(session.expiresAt)}
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>

                    {/* Actions */}
                    {session.isActive && !isCurrentSession && (
                      <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Tooltip title='Hủy phiên đăng nhập này'>
                          <Button
                            variant='outlined'
                            color='error'
                            size='small'
                            startIcon={<DeleteIcon />}
                            onClick={() => handleRevokeClick(session)}
                            sx={{
                              '&:hover': {
                                backgroundColor: 'error.light',
                                color: 'white'
                              }
                            }}
                          >
                            Hủy phiên
                          </Button>
                        </Tooltip>
                      </Box>
                    )}

                    {/* Current Session Info */}
                    {isCurrentSession && (
                      <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Typography variant='caption' color='primary.main'>
                          Đây là phiên đăng nhập hiện tại của bạn
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      )}

      {/* Revoke Confirmation Dialog */}
      <Dialog
        open={revokeDialogOpen}
        onClose={handleCancelRevoke}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle>Xác nhận hủy phiên đăng nhập</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn hủy phiên đăng nhập này?
            {sessionToRevoke && (
              <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant='body2' fontWeight={500}>
                  Thiết bị: {parseDeviceInfo(sessionToRevoke.deviceInfo).device}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  IP: {sessionToRevoke.ipAddress}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Đăng nhập:{' '}
                  {formatDate(sessionToRevoke.loginTime, { withTime: true })}
                </Typography>
              </Box>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelRevoke} disabled={revokeLoading}>
            Hủy
          </Button>
          <Button
            onClick={handleConfirmRevoke}
            color='error'
            variant='contained'
            disabled={revokeLoading}
            startIcon={
              revokeLoading ? <CircularProgress size={16} /> : <DeleteIcon />
            }
          >
            {revokeLoading ? 'Đang hủy...' : 'Xác nhận hủy'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default SessionsTab
