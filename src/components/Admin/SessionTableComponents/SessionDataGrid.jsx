import React, { useState } from 'react'
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter
} from '@mui/x-data-grid'
import {
  Box,
  Chip,
  IconButton,
  Tooltip,
  Avatar,
  Typography,
  Stack,
  Paper
} from '@mui/material'
import {
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Person as PersonIcon
} from '@mui/icons-material'

const SessionDataGrid = ({ users, onViewSessions, loading }) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  })

  // Custom toolbar với search
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer
        sx={{
          p: 2,
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Typography variant='h6' component='div' sx={{ fontWeight: 600 }}>
          Quản lý Session Users
        </Typography>
        <GridToolbarQuickFilter
          placeholder='Tìm kiếm user...'
          sx={{ minWidth: 300 }}
        />
      </GridToolbarContainer>
    )
  }

  // Define columns for DataGrid
  const columns = [
    {
      field: 'avatar',
      headerName: '',
      width: 60,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Avatar sx={{ width: 35, height: 35, bgcolor: 'primary.main' }}>
          {params.row.avatar ? (
            <img
              src={params.row.avatar}
              alt={params.row.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <PersonIcon fontSize='small' />
          )}
        </Avatar>
      )
    },
    {
      field: 'name',
      headerName: 'Tên người dùng',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='body2' fontWeight={500}>
            {params.value}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            {params.row.email}
          </Typography>
        </Box>
      )
    },
    {
      field: 'phone',
      headerName: 'Số điện thoại',
      width: 140,
      renderCell: (params) => (
        <Typography variant='body2'>
          {params.value || 'Chưa cập nhật'}
        </Typography>
      )
    },
    {
      field: 'isActive',
      headerName: 'Trạng thái',
      width: 120,
      renderCell: (params) => (
        <Chip
          icon={params.value ? <CheckCircleIcon /> : <CancelIcon />}
          label={params.value ? 'Hoạt động' : 'Vô hiệu'}
          color={params.value ? 'success' : 'error'}
          size='small'
          variant='outlined'
        />
      )
    },
    {
      field: 'isEmailVerified',
      headerName: 'Email',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Đã xác thực' : 'Chưa xác thực'}
          color={params.value ? 'success' : 'warning'}
          size='small'
          variant='filled'
        />
      )
    },
    {
      field: 'sessionCount',
      headerName: 'Tổng Sessions',
      width: 120,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Chip
          label={params.value || 0}
          color='info'
          size='small'
          variant='outlined'
        />
      )
    },
    {
      field: 'activeSessionCount',
      headerName: 'Sessions Hoạt động',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Chip
          label={params.value || 0}
          color={params.value > 0 ? 'success' : 'default'}
          size='small'
          variant='filled'
        />
      )
    },
    {
      field: 'lastLoginAt',
      headerName: 'Đăng nhập cuối',
      width: 150,
      renderCell: (params) => {
        if (!params.value)
          return <Typography variant='caption'>Chưa có</Typography>

        const lastLogin = new Date(params.value)
        const now = new Date()
        const diffInMs = now - lastLogin
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

        let timeAgo = ''
        if (diffInMinutes < 1) timeAgo = 'vừa xong'
        else if (diffInMinutes < 60) timeAgo = `${diffInMinutes} phút trước`
        else if (diffInHours < 24) timeAgo = `${diffInHours} giờ trước`
        else if (diffInDays < 30) timeAgo = `${diffInDays} ngày trước`
        else timeAgo = `${Math.floor(diffInDays / 30)} tháng trước`

        return (
          <Typography
            variant='caption'
            sx={{
              color: 'text.secondary',
              display: 'block'
            }}
          >
            {timeAgo}
          </Typography>
        )
      }
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      width: 100,
      sortable: false,
      filterable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Stack direction='row' spacing={1}>
          <Tooltip title='Xem sessions của user'>
            <IconButton
              size='small'
              color='primary'
              onClick={() => onViewSessions(params.row._id, params.row.name)}
              sx={{
                '&:hover': {
                  backgroundColor: 'primary.light',
                  color: 'white'
                }
              }}
            >
              <VisibilityIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        </Stack>
      )
    }
  ]

  return (
    <Paper elevation={2} sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row._id}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 25, 50]}
        loading={loading}
        disableSelectionOnClick
        slots={{
          toolbar: CustomToolbar
        }}
        autoHeight
        sx={{
          border: 'none',
          '& .MuiDataGrid-cell': {
            borderColor: 'divider'
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'grey.50',
            borderColor: 'divider'
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'action.hover'
          },
          '& .MuiDataGrid-footerContainer': {
            borderColor: 'divider'
          }
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 }
          }
        }}
      />
    </Paper>
  )
}

export default SessionDataGrid
