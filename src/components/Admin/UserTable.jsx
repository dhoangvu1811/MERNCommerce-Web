import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Box, CircularProgress } from '@mui/material'
import {
  UserSearchBar,
  UserTableHeader,
  DeleteUserDialog,
  UserDataGrid,
  UserFormDrawer,
  UserActivationDialog
} from './UserTableComponents'
import {
  getAllUsers,
  getUserDetails,
  updateUserByAdmin,
  createUser,
  deleteUser,
  deleteMultipleUsers,
  clearSelectedUser,
  clearUsers
} from '../../redux/slices/userSlice'
import { useUsers } from '../../hooks/useAuth'
import { userApi } from '../../apis/userApi'

const UserTable = () => {
  const dispatch = useDispatch()

  // Redux state using custom hook
  const { users, pagination } = useUsers()

  // Local state management
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [editDrawerOpen, setEditDrawerOpen] = useState(false)
  const [addDrawerOpen, setAddDrawerOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // Activation/Deactivation dialog states
  const [activationDialogOpen, setActivationDialogOpen] = useState(false)
  const [userToToggle, setUserToToggle] = useState(null)
  const [activationAction, setActivationAction] = useState('activate') // 'activate' hoặc 'deactivate'

  // Fetch users on component mount và khi thay đổi page hoặc search
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true)
      try {
        await dispatch(
          getAllUsers({
            page: currentPage,
            itemsPerPage: pagination.itemsPerPage,
            search: searchTerm.trim() || undefined
          })
        ).unwrap()
      } finally {
        setIsLoading(false)
      }
    }

    // Debounce search với timeout
    const timeoutId = setTimeout(
      () => {
        fetchUsers()
      },
      searchTerm ? 500 : 0
    ) // Delay 500ms cho search, immediate cho initial load

    return () => clearTimeout(timeoutId)
  }, [dispatch, currentPage, pagination.itemsPerPage, searchTerm])

  // Cleanup khi component unmount
  useEffect(() => {
    return () => {
      dispatch(clearUsers())
      dispatch(clearSelectedUser())
    }
  }, [dispatch])

  // Filter users dựa trên search term (local filtering cho real-time feedback)
  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users

    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.includes(searchTerm)
    )
  }, [users, searchTerm])

  // Action handlers với API calls
  const handleEdit = async (userId) => {
    try {
      setIsLoading(true)
      // Fetch user details cho edit form
      const userDetails = await dispatch(getUserDetails(userId)).unwrap()
      setEditingUser(userDetails.data.user)
      setEditDrawerOpen(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      setIsLoading(true)
      await dispatch(deleteUser(userToDelete)).unwrap()
      setDeleteDialogOpen(false)
      setUserToDelete(null)
      // Refresh users list
      await dispatch(
        getAllUsers({
          page: currentPage,
          itemsPerPage: pagination.itemsPerPage,
          search: searchTerm.trim() || undefined
        })
      ).unwrap()
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setUserToDelete(null)
  }

  const handleEditSubmit = async (userData) => {
    try {
      setIsLoading(true)
      await dispatch(
        updateUserByAdmin({
          userId: editingUser._id,
          userData
        })
      ).unwrap()

      setEditDrawerOpen(false)
      setEditingUser(null)
      dispatch(clearSelectedUser())

      // Refresh users list
      await dispatch(
        getAllUsers({
          page: currentPage,
          itemsPerPage: pagination.itemsPerPage,
          search: searchTerm.trim() || undefined
        })
      ).unwrap()
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditCancel = () => {
    setEditDrawerOpen(false)
    setEditingUser(null)
    dispatch(clearSelectedUser())
  }

  const handleAddNew = () => {
    setAddDrawerOpen(true)
  }

  const handleAddSubmit = async (userData) => {
    try {
      setIsLoading(true)
      await dispatch(createUser(userData)).unwrap()

      setAddDrawerOpen(false)

      // Refresh users list
      await dispatch(
        getAllUsers({
          page: currentPage,
          itemsPerPage: pagination.itemsPerPage,
          search: searchTerm.trim() || undefined
        })
      ).unwrap()
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddCancel = () => {
    setAddDrawerOpen(false)
  }

  // Handle user activation/deactivation
  const handleActivateUser = async (userId, userName) => {
    setUserToToggle({ id: userId, name: userName })
    setActivationAction('activate')
    setActivationDialogOpen(true)
  }

  const handleDeactivateUser = async (userId, userName) => {
    setUserToToggle({ id: userId, name: userName })
    setActivationAction('deactivate')
    setActivationDialogOpen(true)
  }

  const handleActivationConfirm = async () => {
    try {
      setIsLoading(true)

      if (activationAction === 'activate') {
        await userApi.activateUser(userToToggle.id)
      } else {
        await userApi.deactivateUser(userToToggle.id)
      }

      setActivationDialogOpen(false)
      setUserToToggle(null)

      // Refresh users list
      await dispatch(
        getAllUsers({
          page: currentPage,
          itemsPerPage: pagination.itemsPerPage,
          search: searchTerm.trim() || undefined
        })
      ).unwrap()
    } finally {
      setIsLoading(false)
    }
  }

  const handleActivationCancel = () => {
    setActivationDialogOpen(false)
    setUserToToggle(null)
  }

  // Handle refresh data
  const handleRefresh = async () => {
    setIsLoading(true)
    try {
      await dispatch(
        getAllUsers({
          page: currentPage,
          itemsPerPage: pagination.itemsPerPage,
          search: searchTerm.trim() || undefined
        })
      ).unwrap()
    } finally {
      setIsLoading(false)
    }
  }

  // Handle bulk delete
  const handleBulkDelete = async (selectedUserIds) => {
    if (selectedUserIds.length === 0) return

    try {
      setIsLoading(true)
      await dispatch(deleteMultipleUsers(selectedUserIds)).unwrap()

      // Refresh users list
      await dispatch(
        getAllUsers({
          page: currentPage,
          itemsPerPage: pagination.itemsPerPage,
          search: searchTerm.trim() || undefined
        })
      ).unwrap()
    } finally {
      setIsLoading(false)
    }
  }

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const handlePageSizeChange = async (newPageSize) => {
    setCurrentPage(1) // Reset to first page when changing page size
    setIsLoading(true)
    try {
      await dispatch(
        getAllUsers({
          page: 1,
          itemsPerPage: newPageSize,
          search: searchTerm.trim() || undefined
        })
      ).unwrap()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {/* Header Section */}
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <UserTableHeader
          onAddNew={handleAddNew}
          onRefresh={handleRefresh}
          loading={isLoading}
        />
        <UserSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          disabled={isLoading}
        />
      </Box>

      {/* Loading Indicator */}
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Data Grid */}
      <UserDataGrid
        users={filteredUsers}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onBulkDelete={handleBulkDelete}
        onActivateUser={handleActivateUser}
        onDeactivateUser={handleDeactivateUser}
        pagination={pagination}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        loading={isLoading}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteUserDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        loading={isLoading}
      />

      {/* Edit User Drawer */}
      <UserFormDrawer
        open={editDrawerOpen}
        onClose={handleEditCancel}
        onSubmit={handleEditSubmit}
        user={editingUser}
        title='Chỉnh sửa thông tin người dùng'
        loading={isLoading}
      />

      {/* Add User Drawer */}
      <UserFormDrawer
        open={addDrawerOpen}
        onClose={handleAddCancel}
        onSubmit={handleAddSubmit}
        user={null}
        title='Thêm người dùng mới'
        loading={isLoading}
      />

      {/* User Activation/Deactivation Dialog */}
      <UserActivationDialog
        open={activationDialogOpen}
        onClose={handleActivationCancel}
        onConfirm={handleActivationConfirm}
        loading={isLoading}
        action={activationAction}
        userName={userToToggle?.name || ''}
      />
    </Box>
  )
}

export default UserTable
