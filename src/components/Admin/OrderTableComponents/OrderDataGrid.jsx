import React from 'react'
import { Paper, Chip, IconButton, Box } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import VisibilityIcon from '@mui/icons-material/Visibility'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop'
import { formatPrice } from '../../../utils/formatUtils'

const OrderDataGrid = ({ filteredOrders, onViewDetails, onPrint }) => {
  // Column definitions for DataGrid
  const columns = [
    {
      field: 'id',
      headerName: 'Mã đơn',
      width: 100
    },
    {
      field: 'orderDate',
      headerName: 'Ngày đặt',
      width: 120
    },
    {
      field: 'userName',
      headerName: 'Tên khách hàng',
      flex: 1,
      minWidth: 180
    },
    {
      field: 'phone',
      headerName: 'Số điện thoại',
      width: 150
    },
    {
      field: 'address',
      headerName: 'Địa chỉ',
      flex: 1,
      minWidth: 200
    },
    {
      field: 'isPaid',
      headerName: 'Thanh toán',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Đã thanh toán' : 'Chưa thanh toán'}
          color={params.value ? 'success' : 'warning'}
          size='small'
        />
      )
    },
    {
      field: 'isShipped',
      headerName: 'Vận chuyển',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Đã giao hàng' : 'Đang vận chuyển'}
          color={params.value ? 'success' : 'info'}
          size='small'
        />
      )
    },
    {
      field: 'paymentMethod',
      headerName: 'Phương thức thanh toán',
      width: 200
    },
    {
      field: 'totalPrice',
      headerName: 'Tổng tiền',
      width: 150,
      renderCell: (params) => formatPrice(params.value)
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
            onClick={() => onViewDetails(params.row.id)}
          >
            <VisibilityIcon fontSize='small' />
          </IconButton>
          <IconButton
            size='small'
            color='secondary'
            onClick={() => onPrint(params.row.id)}
          >
            <LocalPrintshopIcon fontSize='small' />
          </IconButton>
        </Box>
      )
    }
  ]

  return (
    <Paper sx={{ height: 'calc(100vh - 230px)', width: '100%' }}>
      <DataGrid
        rows={filteredOrders}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 }
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
        disableRowSelectionOnClick
        checkboxSelection
      />
    </Paper>
  )
}

export default OrderDataGrid
