import React from 'react'
import { Paper, Chip, IconButton, Box, Tooltip } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import VisibilityIcon from '@mui/icons-material/Visibility'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop'
import { formatPrice, formatDate } from '../../../utils/formatUtils'
import { getOrderStatusConfig } from '../../../utils/orderConstants'

const OrderDataGrid = ({
  filteredOrders,
  onViewDetails,
  onPrint,
  loading,
  pagination,
  onPageChange,
  onPageSizeChange
}) => {
  // Transform API data to match DataGrid format
  const transformedOrders = filteredOrders.map((order) => ({
    id: order._id,
    orderNumber: order?.orderCode || order._id?.slice(-8) || 'N/A',
    createdAtFormatted: formatDate(order.createdAt, { withTime: true }),
    userName: order.shippingAddress?.name || 'N/A',
    userEmail: 'N/A', // Email không có trong response
    phone: order.shippingAddress?.phone || 'N/A',
    address: order.shippingAddress?.fullAddress || 'N/A',
    status: order.status,
    paymentStatus: order.paymentStatus,
    paymentMethod: order.paymentMethod || 'N/A',
    totalPrice: order.totals?.payable || 0,
    itemCount: order.items?.length || 0,
    ...order
  }))

  // Column definitions for DataGrid
  const columns = [
    {
      field: 'orderNumber',
      headerName: 'Mã đơn',
      width: 120
    },
    {
      field: 'createdAtFormatted',
      headerName: 'Ngày đặt',
      width: 160
    },
    {
      field: 'userName',
      headerName: 'Tên khách hàng',
      flex: 1,
      minWidth: 180
    },
    {
      field: 'itemCount',
      headerName: 'Số sản phẩm',
      width: 120,
      align: 'center'
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
      field: 'status',
      headerName: 'Trạng thái',
      width: 150,
      renderCell: (params) => {
        const statusConfig = getOrderStatusConfig(
          params.row.status,
          params.row.paymentStatus
        )
        return (
          <Chip
            label={statusConfig.label}
            color={statusConfig.color}
            size='small'
          />
        )
      }
    },
    {
      field: 'paymentMethod',
      headerName: 'Thanh toán',
      width: 120,
      renderCell: (params) => {
        const methodLabels = {
          COD: 'COD',
          EWALLET: 'Ví điện tử',
          BANK: 'Chuyển khoản',
          CARD: 'Thẻ tín dụng'
        }
        return methodLabels[params.value] || params.value
      }
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
          <Tooltip title='Xem chi tiết'>
            <IconButton
              size='small'
              color='primary'
              onClick={() => onViewDetails(params.row.id)}
            >
              <VisibilityIcon fontSize='small' />
            </IconButton>
          </Tooltip>

          <Tooltip title='In hóa đơn'>
            <IconButton
              size='small'
              color='secondary'
              onClick={() => onPrint(params.row.id)}
            >
              <LocalPrintshopIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  return (
    <>
      <Paper sx={{ height: 'calc(100vh - 230px)', width: '100%' }}>
        <DataGrid
          rows={transformedOrders}
          columns={columns}
          loading={loading}
          paginationModel={{
            pageSize: pagination?.itemsPerPage || 10,
            page: (pagination?.page || 1) - 1
          }}
          pageSizeOptions={[5, 10, 25]}
          paginationMode='server'
          rowCount={pagination?.totalOrders || 0}
          onPaginationModelChange={(model) => {
            if (onPageChange && model.page !== (pagination?.page || 1) - 1) {
              onPageChange(model.page + 1)
            }
            if (
              onPageSizeChange &&
              model.pageSize !== pagination?.itemsPerPage
            ) {
              onPageSizeChange(model.pageSize)
            }
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 }
            }
          }}
          disableRowSelectionOnClick
          checkboxSelection
          autoHeight
        />
      </Paper>
    </>
  )
}

export default OrderDataGrid
