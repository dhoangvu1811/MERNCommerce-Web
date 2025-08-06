import React from 'react'
import { Paper, Box, IconButton, Chip, Avatar } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const UserDataGrid = ({ users, onEdit, onDelete }) => {
  // Column definitions for DataGrid
  const columns = [
    {
      field: 'avatar',
      headerName: 'Avatar',
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Avatar
          src={params.value}
          alt={params.row.name}
          sx={{ width: 40, height: 40 }}
        />
      )
    },
    { field: 'name', headerName: 'Tên', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 180 },
    { field: 'phone', headerName: 'Số điện thoại', width: 150 },
    { field: 'address', headerName: 'Địa chỉ', flex: 1, minWidth: 200 },
    {
      field: 'dateOfBirth',
      headerName: 'Ngày sinh',
      width: 120,
      renderCell: (params) => {
        if (!params.value) return ''
        const date = new Date(params.value)
        return date.toLocaleDateString('vi-VN')
      }
    },
    {
      field: 'gender',
      headerName: 'Giới tính',
      width: 100,
      renderCell: (params) => {
        const genderMap = {
          male: 'Nam',
          female: 'Nữ',
          other: 'Khác'
        }
        return genderMap[params.value] || params.value
      }
    },
    {
      field: 'role',
      headerName: 'Vai trò',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value === 'admin' ? 'Quản trị' : 'Người dùng'}
          color={params.value === 'admin' ? 'primary' : 'default'}
          size='small'
        />
      )
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      width: 120,
      sortable: false,
      filterable: false,
      disableExport: true,
      renderCell: (params) => (
        <Box>
          <IconButton
            size='small'
            color='primary'
            onClick={() => onEdit(params.row.id)}
          >
            <EditIcon fontSize='small' />
          </IconButton>
          <IconButton
            size='small'
            color='error'
            onClick={() => onDelete(params.row.id)}
          >
            <DeleteIcon fontSize='small' />
          </IconButton>
        </Box>
      )
    }
  ]

  return (
    <Paper sx={{ height: 'calc(100vh - 230px)', width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 }
          },
          sorting: {
            sortModel: [{ field: 'name', sort: 'asc' }]
          }
        }}
        pageSizeOptions={[5, 10, 25]}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 }
          }
        }}
        getRowClassName={() => 'cursor-pointer hover:bg-gray-50'}
        disableRowSelectionOnClick={false}
        disableDensitySelector
        checkboxSelection
        autoHeight
        sx={{
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
          }
        }}
        loading={false}
      />
    </Paper>
  )
}

export default UserDataGrid
