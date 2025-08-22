import React, { useState } from 'react'
import {
  Paper,
  Box,
  IconButton,
  Chip,
  Avatar,
  Typography,
  Button
} from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

const UserDataGrid = ({
  users,
  onEdit,
  onDelete,
  onBulkDelete,
  pagination,
  onPageChange,
  onPageSizeChange,
  loading = false
}) => {
  const [selectedRows, setSelectedRows] = useState([])

  // Xử lý bulk delete
  const handleBulkDelete = async () => {
    if (selectedRows.length === 0) return

    try {
      await onBulkDelete(selectedRows)
      setSelectedRows([]) // Reset selection sau khi xóa
    } catch {
      // Xử lý lỗi bulk delete
    }
  }
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
            onClick={() => onEdit(params.row._id || params.row.id)}
          >
            <EditIcon fontSize='small' />
          </IconButton>
          <IconButton
            size='small'
            color='error'
            onClick={() => onDelete(params.row._id || params.row.id)}
          >
            <DeleteIcon fontSize='small' />
          </IconButton>
        </Box>
      )
    }
  ]

  // Handle selection change
  const handleSelectionModelChange = (newSelectionModel) => {
    // newSelectionModel có cấu trúc {type: 'include', ids: Set} cho MUI X v8+
    if (
      newSelectionModel &&
      newSelectionModel.ids &&
      newSelectionModel.ids.size > 0
    ) {
      const selectedIds = Array.from(newSelectionModel.ids)
      setSelectedRows(selectedIds)
    } else {
      setSelectedRows([])
    }
  }

  // Handle page change
  const handlePaginationModelChange = (model) => {
    if (onPageChange) {
      onPageChange(model.page + 1) // DataGrid uses 0-based, we use 1-based
    }
    if (onPageSizeChange) {
      onPageSizeChange(model.pageSize)
    }
  }

  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        height: 'auto',
        minHeight: '400px'
      }}
    >
      {/* Bulk Actions Toolbar */}
      {selectedRows && selectedRows.length > 0 && (
        <Box
          sx={{
            p: 2,
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #ddd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant='body2'>
            Đã chọn {selectedRows.length} người dùng
          </Typography>
          <Button
            variant='contained'
            color='error'
            startIcon={<DeleteForeverIcon />}
            onClick={handleBulkDelete}
            disabled={loading}
          >
            Xóa tất cả
          </Button>
        </Box>
      )}

      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row._id || row.id}
        checkboxSelection
        onRowSelectionModelChange={handleSelectionModelChange}
        rowSelectionModel={{ type: 'include', ids: new Set(selectedRows) }}
        paginationModel={{
          page: pagination ? pagination.page - 1 : 0, // Convert to 0-based
          pageSize: pagination ? pagination.itemsPerPage : 10
        }}
        onPaginationModelChange={handlePaginationModelChange}
        rowCount={pagination ? pagination?.totalUsers : users.length}
        paginationMode='server'
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
        autoHeight
        loading={loading}
        sx={{
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
          }
        }}
      />
    </Paper>
  )
}

export default UserDataGrid
