import React, { useState, useEffect, useMemo } from 'react'
import { Box, Typography, Paper, Alert } from '@mui/material'
import { SessionDataGrid, UserSessionDialog } from './SessionTableComponents'
import { sessionApi } from '../../apis'
import dayjs from 'dayjs'

const SessionTable = () => {
  // Local state management
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [sessionDialogOpen, setSessionDialogOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [selectedUserName, setSelectedUserName] = useState('')
  const [userSessions, setUserSessions] = useState([])
  const [isLoadingSessions, setIsLoadingSessions] = useState(false)

  // Load users từ API
  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true)

      const response = await sessionApi.getUsersWithSessionSummary()

      // Transform data nếu cần thiết để phù hợp với DataGrid
      const transformedUsers =
        response.data?.users?.map((user) => ({
          _id: user._id || user.id,
          name: user.name || `${user.firstName} ${user.lastName}`,
          email: user.email,
          phone: user.phone || '',
          avatar: user.avatar || '',
          isActive: user.isActive !== undefined ? user.isActive : true,
          emailVerified: user.emailVerified || false,
          totalSessions: user.totalSessions || 0,
          activeSessions: user.activeSessions || 0,
          lastLogin: user.lastLogin
        })) || []

      setUsers(transformedUsers)
      setIsLoading(false)
    }

    loadUsers()
  }, [])

  // Handle xem sessions của user
  const handleViewSessions = async (userId, userName) => {
    setIsLoadingSessions(true)

    const response = await sessionApi.getUserSessions(userId)

    // Transform session data để phù hợp với DB schema
    const transformedSessions =
      response.data?.sessions?.map((session) => ({
        _id: session._id,
        sessionId: session.sessionId,
        userId: session.userId,
        deviceInfo: session.deviceInfo || 'Không xác định',
        ipAddress: session.ipAddress || 'N/A',
        location: session.location || 'Không xác định', // Có thể cần parse từ ipAddress
        loginTime: dayjs(session.createdAt).toDate(), // Convert timestamp to Date using dayjs
        lastActivity: session.updatedAt
          ? dayjs(session.updatedAt).toDate()
          : dayjs(session.createdAt).toDate(),
        isActive: session.isActive !== undefined ? session.isActive : true,
        expiresAt: dayjs(session.expiresAt).toDate()
      })) || []

    setSelectedUserId(userId)
    setSelectedUserName(userName)
    setUserSessions(transformedSessions)
    setSessionDialogOpen(true)
    setIsLoadingSessions(false)
  }

  // Handle đóng session dialog
  const handleCloseSessionDialog = () => {
    setSessionDialogOpen(false)
    setSelectedUserId(null)
    setSelectedUserName('')
    setUserSessions([])
  }

  // Handle refresh users data sau khi revoke sessions
  const handleRefreshUsers = async () => {
    setIsLoading(true)

    const response = await sessionApi.getUsersWithSessionSummary()
    const transformedUsers =
      response.data?.users?.map((user) => ({
        _id: user._id || user.id,
        name: user.name || `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone || '',
        avatar: user.avatar || '',
        isActive: user.isActive !== undefined ? user.isActive : true,
        emailVerified: user.emailVerified || false,
        totalSessions: user.totalSessions || 0,
        activeSessions: user.activeSessions || 0,
        lastLogin: user.lastLogin
      })) || []

    setUsers(transformedUsers)
    setIsLoading(false)
  }

  // Filtered users (có thể mở rộng để add search functionality)
  const filteredUsers = useMemo(() => {
    return users
  }, [users])

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {/* Header Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant='h4' component='h1' sx={{ fontWeight: 600, mb: 1 }}>
          Quản lý Session Users
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Theo dõi và quản lý các phiên đăng nhập của người dùng trong hệ thống
        </Typography>

        {/* Info Alert */}
        <Alert severity='info' sx={{ mt: 2 }}>
          <Typography variant='body2'>
            <strong>Hướng dẫn:</strong> Click vào nút &quot;Xem sessions&quot;
            để xem chi tiết các phiên đăng nhập của từng người dùng. Dữ liệu
            được cập nhật real-time.
          </Typography>
        </Alert>
      </Box>

      {/* Main Content */}
      <Paper elevation={1} sx={{ p: 0, borderRadius: 2 }}>
        <SessionDataGrid
          users={filteredUsers}
          onViewSessions={handleViewSessions}
          loading={isLoading}
        />
      </Paper>

      {/* User Sessions Dialog */}
      <UserSessionDialog
        open={sessionDialogOpen}
        onClose={handleCloseSessionDialog}
        userName={selectedUserName}
        sessions={userSessions}
        userId={selectedUserId}
        loading={isLoadingSessions}
        onSessionRevoked={handleRefreshUsers}
      />
    </Box>
  )
}

export default SessionTable
