import React, { useState, useEffect, useMemo } from 'react'
import { Box, Typography, Paper, Alert } from '@mui/material'
import { SessionDataGrid, UserSessionDialog } from './SessionTableComponents'
import {
  getAllUsersWithSessionCount,
  getSessionsByUserId,
  getUserById
} from '../../mocks/userSessions'

const SessionTable = () => {
  // Local state management
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [sessionDialogOpen, setSessionDialogOpen] = useState(false)
  const [, setSelectedUserId] = useState(null)
  const [selectedUserName, setSelectedUserName] = useState('')
  const [userSessions, setUserSessions] = useState([])

  // Load mock data khi component mount
  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true)
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const usersData = getAllUsersWithSessionCount()
        setUsers(usersData)
      } catch (error) {
        // Handle error silently or show toast notification
        // eslint-disable-next-line no-console
        console.warn('Error loading users:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUsers()
  }, [])

  // Handle xem sessions của user
  const handleViewSessions = async (userId, userName) => {
    setIsLoading(true)
    try {
      // Simulate API call để lấy sessions
      await new Promise((resolve) => setTimeout(resolve, 500))

      const sessions = getSessionsByUserId(userId)
      const user = getUserById(userId)

      setSelectedUserId(userId)
      setSelectedUserName(user?.name || userName)
      setUserSessions(sessions)
      setSessionDialogOpen(true)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error loading user sessions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle đóng session dialog
  const handleCloseSessionDialog = () => {
    setSessionDialogOpen(false)
    setSelectedUserId(null)
    setSelectedUserName('')
    setUserSessions([])
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
      />
    </Box>
  )
}

export default SessionTable
