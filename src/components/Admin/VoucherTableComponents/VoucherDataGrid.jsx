import React, { useState } from 'react'
import {
  Paper,
  Box,
  IconButton,
  Chip,
  Typography,
  Button,
  Tooltip,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { formatPrice, formatDate } from '../../../utils/formatUtils'

const VoucherDataGrid = ({
  vouchers = [],
  onEdit,
  onDelete,
  onBulkDelete,
  onToggleActive,
  loading = false,
  pagination,
  onPageChange,
  onPageSizeChange
}) => {
  const [selectedRows, setSelectedRows] = useState([])
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const handleBulkDelete = async () => {
    if (selectedRows.length === 0) return
    try {
      await onBulkDelete(selectedRows)
      setSelectedRows([])
      setOpenDeleteDialog(false) // Đóng dialog
    } catch {
      // Errors are handled upstream in parent or intentionally ignored for mock mode
      setOpenDeleteDialog(false) // Đóng dialog ngay cả khi có lỗi
    }
  }

  // Mở dialog xác nhận xóa
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true)
  }

  // Đóng dialog xác nhận xóa
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false)
  }

  // Dùng util chung để tránh lệch timezone

  const columns = [
    { field: 'code', headerName: 'Mã', minWidth: 120 },
    {
      field: 'type',
      headerName: 'Loại',
      width: 120,
      renderCell: (params) => (
        <Chip
          size='small'
          label={params?.value === 'percent' ? 'Phần trăm' : 'Cố định'}
          color={params?.value === 'percent' ? 'primary' : 'secondary'}
        />
      )
    },
    {
      field: 'amount',
      headerName: 'Mức giảm',
      width: 140,
      renderCell: (params) =>
        params?.row?.type === 'percent'
          ? `${params?.value ?? 0}%`
          : formatPrice(params?.value ?? 0)
    },
    {
      field: 'maxDiscount',
      headerName: 'Giảm tối đa',
      width: 140,
      renderCell: (params) =>
        Number(params?.value ?? 0) > 0 ? formatPrice(params.value) : '0'
    },
    {
      field: 'minOrderValue',
      headerName: 'ĐH tối thiểu',
      width: 140,
      renderCell: (params) =>
        Number(params?.value ?? 0) > 0 ? formatPrice(params.value) : '0'
    },
    {
      field: 'period',
      headerName: 'Hiệu lực',
      flex: 1,
      minWidth: 220,
      renderCell: (params) => {
        const row = params?.row || {}
        const startRaw = row.startDate
        const endRaw = row.endDate
        const sd = formatDate(startRaw, {
          utc: true,
          month: '2-digit',
          day: '2-digit',
          year: 'numeric'
        })
        const ed = formatDate(endRaw, {
          utc: true,
          month: '2-digit',
          day: '2-digit',
          year: 'numeric'
        })
        return <Typography variant='body2'>{`${sd} → ${ed}`}</Typography>
      }
    },
    {
      field: 'usage',
      headerName: 'Số lần dùng',
      width: 130,
      renderCell: (params) => {
        const row = params?.row || {}
        const rawUsed = row.usedCount
        const usedNum = Number(rawUsed)
        const used = Number.isFinite(usedNum) && usedNum >= 0 ? usedNum : 0

        const rawLimit = row.usageLimit
        let displayLimit
        if (rawLimit === 0 || rawLimit === '0') {
          displayLimit = '∞'
        } else {
          const limNum = Number(rawLimit)
          if (Number.isFinite(limNum) && limNum > 0) {
            displayLimit = limNum
          } else if (rawLimit == null || rawLimit === '') {
            displayLimit = '-'
          } else {
            displayLimit = '-'
          }
        }
        return (
          <Typography variant='body2'>{`${used}/${displayLimit}`}</Typography>
        )
      }
    },
    {
      field: 'isActive',
      headerName: 'Kích hoạt',
      width: 120,
      renderCell: (params) => (
        <Tooltip title={params?.value ? 'Đang kích hoạt' : 'Đang tắt'}>
          <Switch
            checked={!!params?.value}
            onChange={() => onToggleActive(params?.row?._id)}
            size='small'
          />
        </Tooltip>
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
          <Tooltip title='Chỉnh sửa voucher'>
            <IconButton
              size='small'
              color='primary'
              onClick={() => onEdit(params?.row?._id)}
            >
              <EditIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Xóa voucher'>
            <IconButton
              size='small'
              color='error'
              onClick={() => onDelete(params?.row?._id)}
            >
              <DeleteIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

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
            Đã chọn {selectedRows.length} voucher
          </Typography>
          <Button
            variant='contained'
            color='error'
            startIcon={<DeleteForeverIcon />}
            onClick={handleOpenDeleteDialog}
            disabled={loading}
          >
            Xóa tất cả
          </Button>
        </Box>
      )}

      {/* Dialog xác nhận xóa */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby='delete-dialog-title'
        aria-describedby='delete-dialog-description'
      >
        <DialogTitle id='delete-dialog-title'>Xác nhận xóa voucher</DialogTitle>
        <DialogContent>
          <DialogContentText id='delete-dialog-description'>
            Bạn có chắc chắn muốn xóa {selectedRows.length} voucher đã chọn?
            Hành động này không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color='primary'>
            Hủy
          </Button>
          <Button
            onClick={handleBulkDelete}
            color='error'
            variant='contained'
            disabled={loading}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      <DataGrid
        rows={vouchers}
        columns={columns}
        getRowId={(row) => row._id}
        checkboxSelection
        onRowSelectionModelChange={(newSelection) => {
          // newSelection có cấu trúc {type: 'include', ids: Set} cho MUI X v8+
          if (newSelection && newSelection.ids && newSelection.ids.size > 0) {
            const selectedIds = Array.from(newSelection.ids)
            setSelectedRows(selectedIds)
          } else {
            setSelectedRows([])
          }
        }}
        rowSelectionModel={{ type: 'include', ids: new Set(selectedRows) }}
        paginationModel={{
          page: pagination ? pagination.page - 1 : 0,
          pageSize: pagination ? pagination.itemsPerPage : 10
        }}
        onPaginationModelChange={(model) => {
          if (onPageChange && model.page !== (pagination?.page || 1) - 1) {
            onPageChange(model.page + 1)
          }
          if (onPageSizeChange && model.pageSize !== pagination?.itemsPerPage) {
            onPageSizeChange(model.pageSize)
          }
        }}
        rowCount={pagination ? pagination.totalVouchers : vouchers.length}
        paginationMode={pagination ? 'server' : 'client'}
        initialState={{
          sorting: { sortModel: [{ field: 'code', sort: 'asc' }] }
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
        rowHeight={70}
        autoHeight
        sx={{
          '& .MuiDataGrid-row': {
            minHeight: '70px !important',
            '&:last-child': {
              minHeight: '70px !important',
              '& .MuiDataGrid-cell': {
                minHeight: '70px !important'
              }
            }
          },
          '& .MuiDataGrid-cell': {
            display: 'flex',
            alignItems: 'center',
            minHeight: '70px !important'
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
          },
          '& .MuiDataGrid-virtualScroller': {
            overflowX: 'auto',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              height: '8px',
              width: '8px'
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderRadius: '4px'
            }
          },
          '& .MuiDataGrid-main': {
            '& .MuiDataGrid-row:last-child': {
              borderBottom: 'none'
            }
          },
          '& .MuiDataGrid-footerContainer': {
            minHeight: '52px'
          }
        }}
        loading={loading}
      />
    </Paper>
  )
}

export default VoucherDataGrid
