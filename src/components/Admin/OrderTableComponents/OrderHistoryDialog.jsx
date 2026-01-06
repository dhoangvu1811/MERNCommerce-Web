/* eslint-disable indent */
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
  CircularProgress,
  Paper
} from '@mui/material'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import {
  History as HistoryIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Edit as EditIcon,
  Payment as PaymentIcon,
  ShoppingCart as ShoppingCartIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material'
import { formatDate } from '../../../utils/formatUtils'
import {
  getOrderStatusLabel,
  getPaymentStatusLabel
} from '../../../utils/orderStatusHelpers'

const OrderHistoryDialog = ({
  open,
  onClose,
  order,
  orderLogs,
  logsLoading,
  onRefresh
}) => {
  // Get icon and color for timeline action
  const getTimelineConfig = (action) => {
    const configs = {
      create: { icon: ShoppingCartIcon, color: 'primary' },
      updateStatus: { icon: EditIcon, color: 'info' },
      updatePaymentStatus: { icon: PaymentIcon, color: 'secondary' },
      markPaid: { icon: CheckCircleIcon, color: 'success' },
      cancel: { icon: CancelIcon, color: 'error' },
      default: { icon: HistoryIcon, color: 'default' }
    }
    return configs[action] || configs.default
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <HistoryIcon color='primary' />
            <Typography variant='h6' fontWeight={700}>
              Lịch sử thay đổi đơn hàng #
              {order?.orderCode || order?._id?.slice(-8)}
            </Typography>
          </Box>
          <Button
            onClick={onRefresh}
            size='small'
            startIcon={<RefreshIcon />}
            disabled={logsLoading}
          >
            Làm mới
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent>
        {logsLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              py: 4
            }}
          >
            <CircularProgress size={32} />
          </Box>
        ) : orderLogs && orderLogs.logs && orderLogs.logs.length > 0 ? (
          <Timeline position='right'>
            {orderLogs.logs.map((log, index) => {
              const config = getTimelineConfig(log.action)
              const IconComponent = config.icon

              return (
                <TimelineItem key={index}>
                  <TimelineOppositeContent
                    color='text.secondary'
                    sx={{ flex: 0.3 }}
                  >
                    <Typography variant='caption'>
                      {log.at
                        ? formatDate(log.at, {
                            withTime: true
                          })
                        : 'N/A'}
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color={config.color}>
                      <IconComponent sx={{ fontSize: 16 }} />
                    </TimelineDot>
                    {index < orderLogs.logs.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                      <Typography variant='body2' fontWeight={600} gutterBottom>
                        {log.note || 'Không có ghi chú'}
                      </Typography>

                      {/* Status change info */}
                      {(log.fromStatus || log.toStatus) && (
                        <Box
                          sx={{
                            mt: 1,
                            display: 'flex',
                            gap: 1,
                            alignItems: 'center'
                          }}
                        >
                          {log.fromStatus && (
                            <Chip
                              label={getOrderStatusLabel(log.fromStatus)}
                              size='small'
                              variant='outlined'
                            />
                          )}
                          {log.fromStatus && log.toStatus && (
                            <Typography variant='caption'>→</Typography>
                          )}
                          {log.toStatus && (
                            <Chip
                              label={getOrderStatusLabel(log.toStatus)}
                              size='small'
                              color={
                                log.toStatus === 'CANCELLED'
                                  ? 'error'
                                  : 'primary'
                              }
                            />
                          )}
                        </Box>
                      )}

                      {/* Payment status change */}
                      {(log.fromPaymentStatus || log.toPaymentStatus) && (
                        <Box
                          sx={{
                            mt: 1,
                            display: 'flex',
                            gap: 1,
                            alignItems: 'center'
                          }}
                        >
                          <Typography variant='caption' color='text.secondary'>
                            Thanh toán:
                          </Typography>
                          {log.fromPaymentStatus && (
                            <Chip
                              label={getPaymentStatusLabel(
                                log.fromPaymentStatus
                              )}
                              size='small'
                              variant='outlined'
                            />
                          )}
                          {log.fromPaymentStatus && log.toPaymentStatus && (
                            <Typography variant='caption'>→</Typography>
                          )}
                          {log.toPaymentStatus && (
                            <Chip
                              label={getPaymentStatusLabel(log.toPaymentStatus)}
                              size='small'
                              color='secondary'
                            />
                          )}
                        </Box>
                      )}

                      {/* Actor info */}
                      <Box sx={{ mt: 1 }}>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                          <Typography variant='caption' color='text.secondary'>
                            Thực hiện bởi:{' '}
                            <strong>
                              {log.byRole === 'admin' ? 'Admin' : 'Người dùng'}
                            </strong>
                          </Typography>
                          <Typography variant='caption' color='text.secondary'>
                            Hành động: <strong>{log.action}</strong>
                          </Typography>
                        </Box>
                        {log.performedBy && (
                          <Box
                            sx={{
                              mt: 0.5,
                              display: 'flex',
                              gap: 2,
                              flexWrap: 'wrap'
                            }}
                          >
                            {log.performedBy.displayName && (
                              <Typography
                                variant='caption'
                                color='text.secondary'
                              >
                                Tên:{' '}
                                <strong>{log.performedBy.displayName}</strong>
                              </Typography>
                            )}
                            {log.performedBy.email && (
                              <Typography
                                variant='caption'
                                color='text.secondary'
                              >
                                Email: <strong>{log.performedBy.email}</strong>
                              </Typography>
                            )}
                          </Box>
                        )}
                      </Box>

                      {/* Meta information */}
                      {/* {log.meta && Object.keys(log.meta).length > 0 && (
                        <Box
                          sx={{
                            mt: 1,
                            p: 1,
                            bgcolor: 'grey.50',
                            borderRadius: 1
                          }}
                        >
                          <Typography variant='caption' color='text.secondary'>
                            Chi tiết: {JSON.stringify(log.meta)}
                          </Typography>
                        </Box>
                      )} */}
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
              )
            })}
          </Timeline>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant='body2' color='text.secondary'>
              Chưa có lịch sử thay đổi
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default OrderHistoryDialog
