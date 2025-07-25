import React, { useState, useMemo } from 'react'
import { Box } from '@mui/material'
import {
  UserSearchBar,
  UserTableHeader,
  DeleteUserDialog,
  UserDataGrid,
  UserFormDrawer
} from './UserTableComponents'

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: 'Nguyen Van A',
    email: 'nguyenvana@example.com',
    phone: '0901234567',
    address: '123 Nguyen Hue',
    city: 'Ho Chi Minh',
    isAdmin: true
  },
  {
    id: 2,
    name: 'Tran Thi B',
    email: 'tranthib@example.com',
    phone: '0908765432',
    address: '456 Le Loi',
    city: 'Ha Noi',
    isAdmin: false
  },
  {
    id: 3,
    name: 'Le Van C',
    email: 'levanc@example.com',
    phone: '0905555555',
    address: '789 Pham Ngu Lao',
    city: 'Da Nang',
    isAdmin: false
  },
  {
    id: 4,
    name: 'Hoang Thi D',
    email: 'hoangthid@example.com',
    phone: '0903333333',
    address: '101 Nguyen Trai',
    city: 'Can Tho',
    isAdmin: false
  },
  {
    id: 5,
    name: 'Pham Van E',
    email: 'phamvane@example.com',
    phone: '0907777777',
    address: '202 Tran Hung Dao',
    city: 'Ho Chi Minh',
    isAdmin: true
  }
]

const UserTable = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [editDrawerOpen, setEditDrawerOpen] = useState(false)
  const [addDrawerOpen, setAddDrawerOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    return mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.city.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  // Action handlers
  const handleEdit = (id) => {
    const user = mockUsers.find((u) => u.id === id)
    if (user) {
      setEditingUser(user)
      setEditDrawerOpen(true)
    }
  }

  const handleDeleteClick = (id) => {
    setUserToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    // Here you would typically call an API to delete the user
    alert(`Deleted user with id: ${userToDelete}`)
    setDeleteDialogOpen(false)
    setUserToDelete(null)
    // In a real app, you would update the user list after successful deletion
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setUserToDelete(null)
  }

  const handleEditSubmit = (data) => {
    // Here you would typically call an API to update the user
    alert(
      `Saved user: ${editingUser.name} with new data: ${JSON.stringify(data)}`
    )
    setEditDrawerOpen(false)
    setEditingUser(null)
    // In a real app, you would update the user list after successful save
  }

  const handleEditCancel = () => {
    setEditDrawerOpen(false)
    setEditingUser(null)
  }

  const handleAddNew = () => {
    setAddDrawerOpen(true)
  }

  const handleAddSubmit = (data) => {
    // Here you would typically call an API to create the user
    alert(`Added new user: ${JSON.stringify(data)}`)
    setAddDrawerOpen(false)
    // In a real app, you would update the user list after successful creation
  }

  const handleAddCancel = () => {
    setAddDrawerOpen(false)
  }

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <UserTableHeader onAddNew={handleAddNew} />
        <UserSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </Box>

      <UserDataGrid
        users={filteredUsers}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteUserDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />

      {/* Edit User Drawer */}
      <UserFormDrawer
        open={editDrawerOpen}
        onClose={handleEditCancel}
        onSubmit={handleEditSubmit}
        user={editingUser}
        title='Chỉnh sửa thông tin người dùng'
      />

      {/* Add User Drawer */}
      <UserFormDrawer
        open={addDrawerOpen}
        onClose={handleAddCancel}
        onSubmit={handleAddSubmit}
        user={null}
        title='Thêm người dùng mới'
      />
    </Box>
  )
}

export default UserTable
